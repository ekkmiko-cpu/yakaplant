/**
 * Database Migration Script
 * Runs all SQL migrations in order
 * Usage: npm run migrate
 */

const fs = require('fs');
const path = require('path');
const { initDatabase, exec, saveDatabase } = require('../config/db');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

async function runMigrations() {
    console.log('🌱 YakaPlant Migration Tool');
    console.log('===========================\n');

    // Initialize database
    await initDatabase();

    // Get all .sql files sorted by name
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
        .filter(f => f.endsWith('.sql'))
        .sort();

    if (migrationFiles.length === 0) {
        console.log('❌ No migration files found.');
        process.exit(1);
    }

    console.log(`📁 Found ${migrationFiles.length} migration file(s):\n`);

    // Run each migration
    for (const file of migrationFiles) {
        const filePath = path.join(MIGRATIONS_DIR, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        console.log(`🔄 Running: ${file}`);

        try {
            // Execute migration
            exec(sql);
            console.log(`   ✅ Success\n`);
        } catch (err) {
            console.error(`   ❌ Error: ${err.message}\n`);
            process.exit(1);
        }
    }

    // Save final state
    saveDatabase();

    console.log('===========================');
    console.log('✅ All migrations completed!');
}

runMigrations().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
