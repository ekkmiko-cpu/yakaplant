/**
 * Vercel Serverless Function Entry Point
 * Wraps Express app for Vercel's serverless environment
 */

// Load environment variables
require('dotenv').config({ path: require('path').join(__dirname, '../backend/.env') });

const { initDatabase } = require('../backend/config/db');

// Database initialization promise
let dbInitialized = false;
let dbInitPromise = null;

async function ensureDbInitialized() {
    if (dbInitialized) return;
    if (!dbInitPromise) {
        dbInitPromise = initDatabase().then(() => {
            dbInitialized = true;
            console.log('📦 Database initialized for Vercel');
        });
    }
    await dbInitPromise;
}

// Import the Express app after db init setup
const app = require('../backend/server.js');

// Wrap the handler to ensure DB is initialized before each request
module.exports = async (req, res) => {
    try {
        await ensureDbInitialized();
        return app(req, res);
    } catch (err) {
        console.error('Serverless handler error:', err);
        res.status(500).json({ error: 'Sunucu hatası', message: err.message });
    }
};
