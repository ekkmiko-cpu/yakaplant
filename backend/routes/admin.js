/**
 * Admin Routes
 * Protected endpoints for site administration
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin email (hardcoded for security)
const ADMIN_EMAIL = 'ekrem@yakaplant.com';

/**
 * Middleware: Check if user is admin
 */
async function requireAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Giriş yapmanız gerekiyor' });
    }

    // Check if user is admin by email
    const user = await db.get('SELECT email, role FROM users WHERE id = ?', [req.session.userId]);

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu sayfaya erişim yetkiniz yok' });
    }

    next();
}

/**
 * GET /stats - Dashboard statistics
 */
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const users = await db.get('SELECT COUNT(*) as count FROM users');
        const quotes = await db.get('SELECT COUNT(*) as count FROM quote_requests');
        const favorites = await db.get('SELECT COUNT(*) as count FROM favorites');
        const projects = await db.get('SELECT COUNT(*) as count FROM projects');

        res.json({
            users: users?.count || 0,
            quotes: quotes?.count || 0,
            favorites: favorites?.count || 0,
            projects: projects?.count || 0
        });
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'İstatistikler alınamadı' });
    }
});

/**
 * GET /users - List all users
 */
router.get('/users', requireAdmin, async (req, res) => {
    try {
        const users = await db.all(`
            SELECT id, name, surname, email, role, phone, city, company_name, created_at 
            FROM users 
            ORDER BY created_at DESC
        `);
        res.json(users);
    } catch (err) {
        console.error('Users error:', err);
        res.status(500).json({ error: 'Kullanıcı listesi alınamadı' });
    }
});

/**
 * GET /quotes - List all quote requests
 */
router.get('/quotes', requireAdmin, async (req, res) => {
    try {
        const quotes = await db.all(`
            SELECT q.*, u.name as user_name, u.surname as user_surname, u.email as user_email
            FROM quote_requests q
            LEFT JOIN users u ON q.user_id = u.id
            ORDER BY q.created_at DESC
        `);
        res.json(quotes);
    } catch (err) {
        console.error('Quotes error:', err);
        res.status(500).json({ error: 'Teklif listesi alınamadı' });
    }
});

/**
 * PUT /quotes/:id/status - Update quote status
 */
router.put('/quotes/:id/status', requireAdmin, async (req, res) => {
    const { status, notes } = req.body;
    const validStatuses = ['new', 'contacted', 'quoted', 'closed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Geçersiz durum' });
    }

    try {
        await db.run(`
            UPDATE quote_requests 
            SET status = ?, admin_notes = ?, updated_at = strftime('%s','now')
            WHERE id = ?
        `, [status, notes || null, req.params.id]);

        res.json({ message: 'Durum güncellendi' });
    } catch (err) {
        console.error('Quote update error:', err);
        res.status(500).json({ error: 'Güncelleme başarısız' });
    }
});

/**
 * POST /make-admin - Promote a user to admin (only for initial setup)
 */
router.post('/setup', async (req, res) => {
    const { email, secretKey } = req.body;

    // Simple secret key check for initial setup
    if (secretKey !== 'yakaplant-admin-2024') {
        return res.status(403).json({ error: 'Geçersiz anahtar' });
    }

    try {
        // Check if any admin exists
        const existingAdmin = await db.get("SELECT id FROM users WHERE role = 'admin'");

        if (existingAdmin) {
            return res.status(400).json({ error: 'Zaten bir admin mevcut' });
        }

        // Promote user
        const result = await db.run(
            "UPDATE users SET role = 'admin' WHERE email = ?",
            [email]
        );

        res.json({ message: 'Admin yetkisi verildi' });
    } catch (err) {
        console.error('Setup error:', err);
        res.status(500).json({ error: 'İşlem başarısız' });
    }
});

module.exports = router;
