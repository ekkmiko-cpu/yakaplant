-- Migration: Add 'admin' role to users table
-- Date: 2026-02-01

-- 1. Disable Foreign Keys
PRAGMA foreign_keys = OFF;

-- 2. Create new table with updated CHECK constraint
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

-- 3. Copy data from old table
INSERT INTO users_new SELECT * FROM users;

-- 4. Drop old table
DROP TABLE users;

-- 5. Rename new table
ALTER TABLE users_new RENAME TO users;

-- 6. Re-enable Foreign Keys
PRAGMA foreign_keys = ON;

-- 7. Re-create Index
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
