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

// =====================================================
// GET FAVORITES
// =====================================================

router.get('/', (req, res) => {
    try {
        const favorites = db.all(`
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

// =====================================================
// ADD TO FAVORITES
// =====================================================

router.post('/', (req, res) => {
    try {
        const { product_id } = req.body;

        if (!product_id || typeof product_id !== 'string') {
            return res.status(400).json({ error: 'Ürün ID gerekli' });
        }

        // Check if already exists
        const existing = db.get(`
            SELECT id FROM favorites WHERE user_id = ? AND product_id = ?
        `, [req.session.userId, product_id]);

        if (existing) {
            return res.json({ message: 'Ürün zaten favorilerde' });
        }

        db.run(`
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

// =====================================================
// REMOVE FROM FAVORITES
// =====================================================

router.delete('/:productId', (req, res) => {
    try {
        const { productId } = req.params;

        const result = db.run(`
            DELETE FROM favorites
            WHERE user_id = ? AND product_id = ?
        `, [req.session.userId, productId]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Favori bulunamadı' });
        }

        res.json({ message: 'Favorilerden çıkarıldı' });

    } catch (err) {
        console.error('Remove favorite error:', err);
        res.status(500).json({ error: 'Favoriden çıkarılamadı' });
    }
});

// =====================================================
// CHECK IF FAVORITE (for UI toggle)
// =====================================================

router.get('/check/:productId', (req, res) => {
    try {
        const { productId } = req.params;

        const favorite = db.get(`
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
