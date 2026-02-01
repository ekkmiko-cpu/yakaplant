/**
 * Simple Database Configuration
 * Uses a simple in-memory store with JSON persistence to /tmp
 * This is a fallback solution for Vercel serverless environment
 */

const fs = require('fs');
const path = require('path');

// Database file location
const DB_PATH = '/tmp/yakaplant-data.json';

// In-memory database structure
let data = {
    users: [],
    favorites: [],
    quote_requests: [],
    projects: []
};

let initialized = false;

/**
 * Initialize database
 */
async function initDatabase() {
    if (initialized) return;

    try {
        if (fs.existsSync(DB_PATH)) {
            const content = fs.readFileSync(DB_PATH, 'utf-8');
            data = JSON.parse(content);
            console.log('✅ Loaded existing data from', DB_PATH);
        } else {
            console.log('📦 Created new database');
            saveDatabase();
        }
    } catch (err) {
        console.error('DB load error:', err);
        data = { users: [], favorites: [], quote_requests: [], projects: [] };
    }

    initialized = true;
    return data;
}

/**
 * Save database to disk
 */
function saveDatabase() {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Save error:', err);
    }
}

/**
 * Auto-increment ID helper
 */
function getNextId(table) {
    if (!data[table] || data[table].length === 0) return 1;
    return Math.max(...data[table].map(r => r.id || 0)) + 1;
}

/**
 * Query: Get all matching rows
 */
function all(sql, params = []) {
    // Parse simple SELECT queries
    const selectMatch = sql.match(/SELECT\s+.+\s+FROM\s+(\w+)/i);
    if (!selectMatch) return [];

    const table = selectMatch[1];
    let results = data[table] || [];

    // Handle WHERE user_id = ?
    const whereUserMatch = sql.match(/WHERE\s+.*(user_id\s*=\s*\?)/i);
    if (whereUserMatch && params.length > 0) {
        const userId = params[0];
        results = results.filter(r => r.user_id === userId);
    }

    // Handle WHERE email = ?
    const whereEmailMatch = sql.match(/WHERE\s+.*email\s*=\s*\?/i);
    if (whereEmailMatch && params.length > 0) {
        const email = params[0];
        results = results.filter(r => r.email === email);
    }

    // Handle WHERE id = ? (and user_id = ?)
    const whereIdMatch = sql.match(/WHERE\s+.*id\s*=\s*\?/i);
    if (whereIdMatch && params.length > 0) {
        const id = params[0];
        results = results.filter(r => r.id == id || r.id === id);
        if (params.length > 1) {
            const userId = params[1];
            results = results.filter(r => r.user_id === userId);
        }
    }

    // Handle ORDER BY ... DESC
    if (sql.match(/ORDER\s+BY\s+.+\s+DESC/i)) {
        results = [...results].reverse();
    }

    // Handle JOIN for quotes
    if (sql.match(/LEFT\s+JOIN\s+users/i) && table === 'quote_requests') {
        results = results.map(q => {
            const user = data.users.find(u => u.id === q.user_id) || {};
            return {
                ...q,
                user_name: user.name,
                user_surname: user.surname,
                user_email: user.email
            };
        });
    }

    return results;
}

/**
 * Query: Get first matching row
 */
function get(sql, params = []) {
    // Handle COUNT(*)
    if (sql.match(/COUNT\s*\(\s*\*\s*\)/i)) {
        const tableMatch = sql.match(/FROM\s+(\w+)/i);
        if (tableMatch) {
            const table = tableMatch[1];
            return { count: (data[table] || []).length };
        }
        return { count: 0 };
    }

    const results = all(sql, params);
    return results[0] || null;
}

/**
 * Query: Execute INSERT, UPDATE, DELETE
 */
function run(sql, params = []) {
    const upperSql = sql.trim().toUpperCase();

    // INSERT
    if (upperSql.startsWith('INSERT')) {
        const tableMatch = sql.match(/INSERT\s+INTO\s+(\w+)/i);
        if (!tableMatch) return { lastInsertRowid: null };

        const table = tableMatch[1];
        if (!data[table]) data[table] = [];

        // Parse columns from SQL
        const colMatch = sql.match(/\(([^)]+)\)\s*VALUES/i);
        if (!colMatch) return { lastInsertRowid: null };

        const columns = colMatch[1].split(',').map(c => c.trim());
        const row = {};

        // Use auto-increment ID for non-UUID tables
        if (table !== 'users') {
            row.id = getNextId(table);
        }

        columns.forEach((col, i) => {
            if (params[i] !== undefined) {
                row[col] = params[i];
            }
        });

        // Add timestamp if not present
        if (!row.created_at) {
            row.created_at = Math.floor(Date.now() / 1000);
        }

        data[table].push(row);
        saveDatabase();

        return { lastInsertRowid: row.id };
    }

    // UPDATE
    if (upperSql.startsWith('UPDATE')) {
        const tableMatch = sql.match(/UPDATE\s+(\w+)/i);
        if (!tableMatch) return { changes: 0 };

        const table = tableMatch[1];
        let changes = 0;

        // Find WHERE id = ?
        const whereIdIdx = params.length - 1;
        const id = params[whereIdIdx];

        data[table] = data[table].map(row => {
            if (row.id == id || row.id === id) {
                changes++;
                // Parse SET clauses
                const setMatch = sql.match(/SET\s+(.+)\s+WHERE/i);
                if (setMatch) {
                    const setParts = setMatch[1].split(',');
                    let paramIdx = 0;
                    setParts.forEach(part => {
                        const colMatch = part.match(/(\w+)\s*=/);
                        if (colMatch && !part.includes('strftime')) {
                            const col = colMatch[1].trim();
                            if (params[paramIdx] !== undefined) {
                                row[col] = params[paramIdx];
                            }
                            paramIdx++;
                        }
                    });
                }
                row.updated_at = Math.floor(Date.now() / 1000);
                return row;
            }
            return row;
        });

        saveDatabase();
        return { changes };
    }

    // DELETE
    if (upperSql.startsWith('DELETE')) {
        const tableMatch = sql.match(/DELETE\s+FROM\s+(\w+)/i);
        if (!tableMatch) return { changes: 0 };

        const table = tableMatch[1];
        const before = data[table].length;

        // Simple WHERE handling
        if (params.length >= 2) {
            const [primary, secondary] = params;
            data[table] = data[table].filter(row => {
                return !(row.id == primary || row.user_id === primary) ||
                    !(row.product_id === secondary || row.user_id === secondary);
            });
        } else if (params.length === 1) {
            const id = params[0];
            data[table] = data[table].filter(row => row.id != id && row.id !== id);
        }

        saveDatabase();
        return { changes: before - data[table].length };
    }

    return { changes: 0 };
}

/**
 * Close database (no-op for JSON)
 */
function close() {
    saveDatabase();
}

module.exports = {
    initDatabase,
    all,
    get,
    run,
    close
};
