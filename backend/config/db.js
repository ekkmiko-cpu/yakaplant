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

    SQL = await initSqlJs();

    // Try to load existing database
    try {
        if (fs.existsSync(DB_PATH)) {
            const buffer = fs.readFileSync(DB_PATH);
            db = new SQL.Database(buffer);
        } else {
            db = new SQL.Database();
        }
    } catch (err) {
        console.error('Error loading database:', err);
        db = new SQL.Database();
    }

    return db;
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
