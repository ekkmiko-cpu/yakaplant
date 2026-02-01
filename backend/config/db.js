/**
 * SQLite Database Configuration
 * Uses sql.js for pure JavaScript SQLite (no native compilation needed)
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

// Database file location
const isVercel = process.env.VERCEL === '1';
const DB_PATH = isVercel
    ? path.join('/tmp', 'yakaplant.db')
    : path.join(__dirname, '..', 'data', 'yakaplant.db');

// Ensure data directory exists (only if not using /tmp which always exists)
if (!isVercel) {
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

let db = null;
let SQL = null;

/**
 * Initialize database connection
 * Must be called before using db
 */
async function initDatabase() {
    if (db) return db;

    try {
        // Let sql.js use its default WASM loading mechanism
        SQL = await initSqlJs();
        console.log('sql.js loaded successfully');
    } catch (err) {
        console.error('Failed to load sql.js:', err);
        throw err;
    }

    // Try to load existing database
    let needsMigrations = false;
    try {
        if (fs.existsSync(DB_PATH)) {
            const buffer = fs.readFileSync(DB_PATH);
            db = new SQL.Database(buffer);
            console.log('Loaded existing database from', DB_PATH);
        } else {
            db = new SQL.Database();
            needsMigrations = true;
            console.log('Created new database');
        }
    } catch (err) {
        console.error('Error loading database:', err);
        db = new SQL.Database();
        needsMigrations = true;
    }

    // Run migrations if needed
    if (needsMigrations) {
        runMigrationsSync();
    }

    return db;
}

/**
 * Run database migrations synchronously
 */
function runMigrationsSync() {
    console.log('Running database migrations...');

    const migrationSQL = `
-- YakaPlant Membership System - Initial Schema
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    city TEXT,
    role TEXT CHECK(role IN ('customer','landscape_architect','company','admin')) NOT NULL DEFAULT 'customer',
    company_name TEXT,
    password_hash TEXT NOT NULL,
    reset_token TEXT,
    reset_token_expires INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id INTEGER,
    request_text TEXT,
    status TEXT DEFAULT 'new',
    admin_notes TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    design_json TEXT,
    thumbnail_url TEXT,
    is_public INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_user ON quote_requests(user_id);
`;

    try {
        db.run(migrationSQL);
        console.log('Migrations complete');
        saveDatabase();
    } catch (err) {
        console.error('Migration error:', err);
    }
}

/**
 * Save database to disk (persistence between requests in non-Vercel)
 */
function saveDatabase() {
    if (!db) return;
    try {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(DB_PATH, buffer);
    } catch (err) {
        console.error('Save database error:', err);
    }
}

/**
 * Execute a query and return all rows
 */
function all(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
        results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
}

/**
 * Execute a query and return first row
 */
function get(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    const stmt = db.prepare(sql);
    stmt.bind(params);
    let result = null;
    if (stmt.step()) {
        result = stmt.getAsObject();
    }
    stmt.free();
    return result;
}

/**
 * Execute a query (INSERT, UPDATE, DELETE)
 */
function run(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    db.run(sql, params);
    saveDatabase();
    return { lastInsertRowid: db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0] };
}

/**
 * Close database connection
 */
function close() {
    if (db) {
        saveDatabase();
        db.close();
    }
    db = null;
}

module.exports = {
    initDatabase,
    all,
    get,
    run,
    close
};
