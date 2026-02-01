/**
 * User Routes
 * Profile view and update, current user info
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// All routes require authentication
router.use(requireAuth);

/**
 * GET / - Get current user info
 */
router.get('/', async (req, res) => {
    try {
        const user = await db.get(`
            SELECT id, name, surname, email, phone, city, role, company_name, created_at
            FROM users WHERE id = ?
        `, [req.session.userId]);

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }

        res.json({ user });

    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: 'Kullanıcı bilgileri alınamadı' });
    }
});

/**
 * PUT / - Update profile
 */
const updateValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 karakter arasında olmalıdır'),
    body('surname')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 karakter arasında olmalıdır'),
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9+\s()-]*$/).withMessage('Geçersiz telefon numarası'),
    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Şehir adı çok uzun'),
    body('company_name')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Şirket adı çok uzun')
];

router.put('/', updateValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { name, surname, phone, city, company_name } = req.body;
        const userId = req.session.userId;

        // Build dynamic update query
        const updates = [];
        const values = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (surname !== undefined) {
            updates.push('surname = ?');
            values.push(surname);
        }
        if (phone !== undefined) {
            updates.push('phone = ?');
            values.push(phone || null);
        }
        if (city !== undefined) {
            updates.push('city = ?');
            values.push(city || null);
        }
        if (company_name !== undefined) {
            updates.push('company_name = ?');
            values.push(company_name || null);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'Güncellenecek alan bulunamadı' });
        }

        updates.push("updated_at = strftime('%s','now')");
        values.push(userId);

        await db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

        // Get updated user
        const user = await db.get(`
            SELECT id, name, surname, email, phone, city, role, company_name, updated_at
            FROM users WHERE id = ?
        `, [userId]);

        res.json({
            message: 'Profil güncellendi',
            user
        });

    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ error: 'Profil güncellenemedi' });
    }
});

module.exports = router;
