/**
 * Quote Request Routes
 * Handle price/availability inquiries from users
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// All routes require authentication
router.use(requireAuth);

// =====================================================
// GET USER'S QUOTE REQUESTS
// =====================================================

router.get('/', (req, res) => {
    try {
        const quotes = db.all(`
            SELECT 
                qr.id,
                qr.project_id,
                qr.request_text,
                qr.status,
                qr.created_at,
                p.title as project_title
            FROM quote_requests qr
            LEFT JOIN projects p ON qr.project_id = p.id
            WHERE qr.user_id = ?
            ORDER BY qr.created_at DESC
        `, [req.session.userId]);

        res.json({ quotes });

    } catch (err) {
        console.error('Get quotes error:', err);
        res.status(500).json({ error: 'Teklif talepleri alınamadı' });
    }
});

// =====================================================
// CREATE QUOTE REQUEST
// =====================================================

const createValidation = [
    body('request_text')
        .optional()
        .trim()
        .isLength({ max: 2000 }).withMessage('Açıklama çok uzun'),
    body('project_id')
        .optional()
        .isInt().withMessage('Geçersiz proje ID'),
    body('product_ids')
        .optional()
        .isArray().withMessage('Ürün listesi dizi olmalı')
];

router.post('/', createValidation, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { request_text, project_id, product_ids } = req.body;
        const userId = req.session.userId;

        // If project_id provided, verify ownership
        if (project_id) {
            const project = db.get(`
                SELECT id FROM projects WHERE id = ? AND user_id = ?
            `, [project_id, userId]);

            if (!project) {
                return res.status(404).json({ error: 'Proje bulunamadı' });
            }
        }

        // Build request text with product list if provided
        let fullRequestText = request_text || '';
        if (product_ids && product_ids.length > 0) {
            fullRequestText += `\n\nİlgili Ürünler: ${product_ids.join(', ')}`;
        }

        const result = db.run(`
            INSERT INTO quote_requests (user_id, project_id, request_text, status)
            VALUES (?, ?, ?, 'new')
        `, [userId, project_id || null, fullRequestText.trim() || null]);

        res.status(201).json({
            message: 'Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.',
            quote_id: result.lastInsertRowid
        });

    } catch (err) {
        console.error('Create quote error:', err);
        res.status(500).json({ error: 'Teklif talebi oluşturulamadı' });
    }
});

// =====================================================
// GET SINGLE QUOTE
// =====================================================

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const quote = db.get(`
            SELECT 
                qr.id,
                qr.project_id,
                qr.request_text,
                qr.status,
                qr.created_at,
                p.title as project_title
            FROM quote_requests qr
            LEFT JOIN projects p ON qr.project_id = p.id
            WHERE qr.id = ? AND qr.user_id = ?
        `, [id, req.session.userId]);

        if (!quote) {
            return res.status(404).json({ error: 'Teklif talebi bulunamadı' });
        }

        res.json({ quote });

    } catch (err) {
        console.error('Get quote error:', err);
        res.status(500).json({ error: 'Teklif talebi alınamadı' });
    }
});

module.exports = router;
