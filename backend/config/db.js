/**
 * Database Configuration
 * Supports Turso (production) and in-memory (local development)
 */

// Use web client for edge/serverless environments
const { createClient } = require('@libsql/client/web');

// Check if Turso is configured
let TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

// Ensure URL uses https:// for HTTP transport
if (TURSO_URL) {
    TURSO_URL = TURSO_URL.replace('libsql://', 'https://');
}

let db = null;

/**
 * Initialize database connection
 */
async function initDatabase() {
    if (db) return db;

    console.log('🔍 Database config check:', {
        hasUrl: !!TURSO_URL,
        hasToken: !!TURSO_TOKEN,
        urlPrefix: TURSO_URL ? TURSO_URL.substring(0, 30) + '...' : 'none'
    });

    if (TURSO_URL && TURSO_TOKEN) {
        // Use Turso for production
        console.log('🔗 Connecting to Turso database...');
        try {
            db = createClient({
                url: TURSO_URL,
                authToken: TURSO_TOKEN
            });

            // Run migrations
            await runMigrations(db);
            console.log('✅ Turso database connected');
        } catch (err) {
            console.error('❌ Turso connection failed:', err);
            throw err;
        }
    } else {
        // Fallback to in-memory for local dev
        console.log('⚠️ No Turso config found, using in-memory database');
        db = createClient({
            url: 'file::memory:'
        });
        await runMigrations(db);
    }

    return db;
}

/**
 * Run database migrations
 */
async function runMigrations(client) {
    console.log('📦 Running migrations...');

    const migrations = `
        -- Users table
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

        -- Favorites table
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            product_id TEXT NOT NULL,
            created_at INTEGER DEFAULT (strftime('%s','now')),
            UNIQUE(user_id, product_id)
        );

        -- Quote requests table
        CREATE TABLE IF NOT EXISTS quote_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            project_id INTEGER REFERENCES projects(id),
            request_text TEXT,
            status TEXT DEFAULT 'new',
            admin_notes TEXT,
            created_at INTEGER DEFAULT (strftime('%s','now')),
            updated_at INTEGER DEFAULT (strftime('%s','now'))
        );

        -- Projects table
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

        -- Indexes
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
        CREATE INDEX IF NOT EXISTS idx_quotes_user ON quote_requests(user_id);
    `;

    // Execute each statement separately
    const statements = migrations.split(';').filter(s => s.trim());
    for (const stmt of statements) {
        if (stmt.trim()) {
            try {
                await client.execute(stmt);
            } catch (err) {
                // Ignore "already exists" errors
                if (!err.message.includes('already exists')) {
                    console.error('Migration error:', err.message);
                }
            }
        }
    }

    console.log('✅ Migrations complete');
}

/**
 * Execute a query and return all rows
 */
function all(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    return db.execute({ sql, args: params }).then(r => r.rows);
}

/**
 * Execute a query and return first row
 */
function get(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    return db.execute({ sql, args: params }).then(r => r.rows[0] || null);
}

/**
 * Execute a query (INSERT, UPDATE, DELETE)
 */
function run(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    return db.execute({ sql, args: params });
}

/**
 * Close database connection
 */
function close() {
    if (db && typeof db.close === 'function') {
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
