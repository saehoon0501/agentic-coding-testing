const sequelize = require("../src/config/database");
const Entity = require("../src/models/Entity");

async function runMigrations() {
  try {
    console.log("Running database migrations...");
    
    // Test connection
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    // Sync models
    await sequelize.sync({ force: false });
    console.log("Database models synchronized successfully.");
    
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

async function rollbackMigrations() {
  try {
    console.log("Rolling back database migrations...");
    
    await sequelize.drop();
    console.log("Database rolled back successfully!");
  } catch (error) {
    console.error("Rollback failed:", error);
    process.exit(1);
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes("--rollback")) {
  rollbackMigrations();
} else {
  runMigrations();
}
