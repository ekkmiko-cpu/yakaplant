/**
 * Vercel Serverless Function Entry Point
 * Simple wrapper that exports Express app directly
 */

// Import the Express app (which handles its own initialization)
const app = require('../backend/server.js');

// Export the app directly - Vercel will handle it
module.exports = app;
