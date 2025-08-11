const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

class MigrationRunner {
  constructor() {
    this.migrationsDir = path.join(__dirname);
  }

  async createMigrationsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    await pool.query(query);
  }

  async getExecutedMigrations() {
    const query = 'SELECT filename FROM migrations ORDER BY executed_at';
    const result = await pool.query(query);
    return result.rows.map(row => row.filename);
  }

  async executeMigration(filename) {
    const filePath = path.join(this.migrationsDir, filename);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO migrations (filename) VALUES ($1)', [filename]);
      await client.query('COMMIT');
      console.log(`Migration ${filename} executed successfully`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async run() {
    try {
      await this.createMigrationsTable();
      
      const migrationFiles = fs.readdirSync(this.migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();
      
      const executedMigrations = await this.getExecutedMigrations();
      
      for (const file of migrationFiles) {
        if (!executedMigrations.includes(file)) {
          await this.executeMigration(file);
        } else {
          console.log(`Migration ${file} already executed, skipping`);
        }
      }
      
      console.log('All migrations completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    } finally {
      await pool.end();
    }
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  const runner = new MigrationRunner();
  runner.run();
}

module.exports = MigrationRunner;
