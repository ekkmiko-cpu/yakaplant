const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware: Check if user is admin
function isAdmin(req, res, next) {
    if (req.session.userRole !== 'admin') {
        return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }
    next();
}

/**
 * GET /stats
 * Dashboard summary statistics
 */
router.get('/stats', isAdmin, (req, res) => {
    try {
        const userCount = db.get("SELECT COUNT(*) as count FROM users").count;
        const quoteCount = db.get("SELECT COUNT(*) as count FROM quote_requests").count;
        const favoritesCount = db.get("SELECT COUNT(*) as count FROM favorites").count;
        const projectCount = db.get("SELECT COUNT(*) as count FROM projects").count;

        res.json({
            users: userCount,
            quotes: quoteCount,
            favorites: favoritesCount,
            projects: projectCount
        });
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'İstatistikler alınamadı' });
    }
});

/**
 * GET /users
 * List all users
 */
router.get('/users', isAdmin, (req, res) => {
    try {
        const users = db.all(`
            SELECT id, name, surname, email, role, phone, city, company_name, created_at 
            FROM users 
            ORDER BY created_at DESC
        `);
        res.json(users);
    } catch (err) {
        console.error('Users error:', err);
        res.status(500).json({ error: 'Kullanıcılar alınamadı' });
    }
});

/**
 * GET /quotes
 * List all quote requests
 */
router.get('/quotes', isAdmin, (req, res) => {
    try {
        const quotes = db.all(`
            SELECT q.*, u.name as user_name, u.surname as user_surname, u.email as user_email
            FROM quote_requests q
            JOIN users u ON q.user_id = u.id
            ORDER BY q.created_at DESC
        `);
        res.json(quotes);
    } catch (err) {
        console.error('Quotes error:', err);
        res.status(500).json({ error: 'Teklifler alınamadı' });
    }
});

/**
 * PUT /quotes/:id/status
 * Update quote status
 */
router.put('/quotes/:id/status', isAdmin, (req, res) => {
    const { status } = req.body;
    if (!['new', 'contacted', 'quoted', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Geçersiz durum' });
    }

    try {
        db.run("UPDATE quote_requests SET status = ? WHERE id = ?", [status, req.params.id]);
        res.json({ message: 'Durum güncellendi' });
    } catch (err) {
        console.error('Quote update error:', err);
        res.status(500).json({ error: 'Güncelleme başarısız' });
    }
});

module.exports = router;
