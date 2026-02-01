/**
 * Favorites Routes
 * Add, remove, and list favorite plants
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// All routes require authentication
router.use(requireAuth);

/**
 * GET / - List user's favorites
 */
router.get('/', async (req, res) => {
    try {
        const favorites = await db.all(`
            SELECT product_id, created_at
            FROM favorites
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [req.session.userId]);

        res.json({ favorites });

    } catch (err) {
        console.error('Get favorites error:', err);
        res.status(500).json({ error: 'Favoriler alınamadı' });
    }
});

/**
 * POST / - Add to favorites
 */
router.post('/', async (req, res) => {
    try {
        const { product_id } = req.body;

        if (!product_id || typeof product_id !== 'string') {
            return res.status(400).json({ error: 'Ürün ID gerekli' });
        }

        // Check if already exists
        const existing = await db.get(`
            SELECT id FROM favorites WHERE user_id = ? AND product_id = ?
        `, [req.session.userId, product_id]);

        if (existing) {
            return res.json({ message: 'Ürün zaten favorilerde' });
        }

        await db.run(`
            INSERT INTO favorites (user_id, product_id)
            VALUES (?, ?)
        `, [req.session.userId, product_id]);

        res.status(201).json({
            message: 'Favorilere eklendi',
            product_id
        });

    } catch (err) {
        console.error('Add favorite error:', err);
        res.status(500).json({ error: 'Favorilere eklenemedi' });
    }
});

/**
 * DELETE /:productId - Remove from favorites
 */
router.delete('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        await db.run(`
            DELETE FROM favorites
            WHERE user_id = ? AND product_id = ?
        `, [req.session.userId, productId]);

        res.json({ message: 'Favorilerden çıkarıldı' });

    } catch (err) {
        console.error('Remove favorite error:', err);
        res.status(500).json({ error: 'Favoriden çıkarılamadı' });
    }
});

/**
 * GET /check/:productId - Check if favorite
 */
router.get('/check/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        const favorite = await db.get(`
            SELECT id FROM favorites
            WHERE user_id = ? AND product_id = ?
        `, [req.session.userId, productId]);

        res.json({ isFavorite: !!favorite });

    } catch (err) {
        console.error('Check favorite error:', err);
        res.status(500).json({ error: 'Favori kontrolü başarısız' });
    }
});

module.exports = router;
