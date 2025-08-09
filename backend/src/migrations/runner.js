const db = require('../config/database');
const logger = require('../utils/logger');

const migrations = [
  {
    id: '001_create_entities_table',
    up: `
      CREATE TABLE IF NOT EXISTS entities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_entities_status ON entities(status);
      CREATE INDEX IF NOT EXISTS idx_entities_created_at ON entities(created_at);
    `,
    down: `
      DROP TABLE IF EXISTS entities;
    `
  }
];

const runMigrations = async () => {
  try {
    // Create migrations table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Get executed migrations
    const result = await db.query('SELECT id FROM migrations');
    const executedMigrations = result.rows.map(row => row.id);

    // Run pending migrations
    for (const migration of migrations) {
      if (!executedMigrations.includes(migration.id)) {
        logger.info(`Running migration: ${migration.id}`);
        await db.query(migration.up);
        await db.query('INSERT INTO migrations (id) VALUES ($1)', [migration.id]);
        logger.info(`Migration completed: ${migration.id}`);
      }
    }

    logger.info('All migrations completed successfully');
  } catch (error) {
    logger.error('Migration failed', { error: error.message });
    throw error;
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { runMigrations, migrations };

