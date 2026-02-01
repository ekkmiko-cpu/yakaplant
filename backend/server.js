/**
 * Minimal test server to isolate function invocation failure
 */

require('dotenv').config();

const express = require('express');
const app = express();

// Simple test endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Test working!' });
});

// All other routes
app.use('*', (req, res) => {
    res.json({ error: 'Not found', path: req.originalUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
