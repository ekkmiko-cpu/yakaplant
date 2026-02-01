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

    // Inline migration SQL to avoid file system issues on Vercel
    const migrationSQL = `
-- YakaPlant Membership System - Initial Schema
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    city TEXT,
    role TEXT CHECK(role IN ('customer','landscape_architect','company')) NOT NULL DEFAULT 'customer',
    company_name TEXT,
    password_hash TEXT NOT NULL,
    reset_token TEXT,
    reset_token_expires INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    project_id INTEGER,
    request_text TEXT,
    status TEXT CHECK(status IN ('new','contacted','quoted','closed')) DEFAULT 'new',
    created_at INTEGER DEFAULT (strftime('%s','now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_quotes_user ON quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quote_requests(status);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    notes TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);

CREATE TABLE IF NOT EXISTS project_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    qty INTEGER DEFAULT 1,
    notes TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_project_items_project ON project_items(project_id);

CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    user_email TEXT,
    ip_address TEXT,
    details TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_type ON audit_log(event_type);

CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expired INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_expired ON sessions(expired);

-- Migration 002: Add admin role
-- We need to recreate the table to update the CHECK constraint
PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS users_new (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    city TEXT,
    role TEXT CHECK(role IN ('customer','landscape_architect','company', 'admin')) NOT NULL DEFAULT 'customer',
    company_name TEXT,
    password_hash TEXT NOT NULL,
    reset_token TEXT,
    reset_token_expires INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
);

INSERT INTO users_new SELECT * FROM users;
DROP TABLE users;
ALTER TABLE users_new RENAME TO users;
PRAGMA foreign_keys = ON;
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;

    try {
        // Execute each statement separately
        const statements = migrationSQL.split(';').filter(s => s.trim());
        for (const stmt of statements) {
            if (stmt.trim()) {
                db.run(stmt + ';');
            }
        }
        saveDatabase();
        console.log('Migrations completed successfully');
    } catch (err) {
        console.error('Migration error:', err);
        // Don't throw - we want the app to work even if migrations fail
    }
}

/**
 * Save database to file
 */
function saveDatabase() {
    if (!db) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
}

/**
 * Wrapper to execute SQL and save automatically
 */
function exec(sql) {
    if (!db) throw new Error('Database not initialized');
    db.run(sql);
    saveDatabase();
}

/**
 * Run a prepared statement
 * Returns { changes: number, lastInsertRowid: number }
 */
function run(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    db.run(sql, params);
    saveDatabase();

    // Get changes and lastInsertRowid
    const changes = db.getRowsModified();
    const lastRowResult = db.exec('SELECT last_insert_rowid()');
    const lastInsertRowid = lastRowResult.length > 0 ? lastRowResult[0].values[0][0] : 0;

    return { changes, lastInsertRowid };
}

/**
 * Get a single row
 */
function get(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    const stmt = db.prepare(sql);
    stmt.bind(params);

    if (stmt.step()) {
        const result = stmt.getAsObject();
        stmt.free();
        return result;
    }
    stmt.free();
    return undefined;
}

/**
 * Get all rows
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
 * Create a prepared statement wrapper
 */
function prepare(sql) {
    return {
        run: (...params) => run(sql, params),
        get: (...params) => get(sql, params),
        all: (...params) => all(sql, params)
    };
}

module.exports = {
    initDatabase,
    saveDatabase,
    exec,
    run,
    get,
    all,
    prepare,
    getDb: () => db
};
