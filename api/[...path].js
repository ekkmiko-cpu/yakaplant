/**
 * Vercel Serverless Function Catch-all
 * Allows the Express backend to handle nested API routes like /api/health, /api/auth/login, etc.
 */

const app = require('../backend/server.js');

module.exports = app;

