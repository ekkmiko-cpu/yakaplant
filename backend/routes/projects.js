/**
 * Project Routes
 * For PRO users only (landscape_architect, company)
 * Manage projects with plant items
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { requireAuth, requirePro } = require('../middleware/auth');

// All routes require authentication and PRO role
router.use(requireAuth);
router.use(requirePro);

// =====================================================
// GET ALL PROJECTS
// =====================================================

router.get('/', (req, res) => {
    try {
        const projects = db.all(`
            SELECT 
                p.id,
                p.title,
                p.notes,
                p.created_at,
                p.updated_at,
                (SELECT COUNT(*) FROM project_items WHERE project_id = p.id) as item_count
            FROM projects p
            WHERE p.user_id = ?
            ORDER BY p.updated_at DESC
        `, [req.session.userId]);

        res.json({ projects });

    } catch (err) {
        console.error('Get projects error:', err);
        res.status(500).json({ error: 'Projeler alınamadı' });
    }
});

// =====================================================
// CREATE PROJECT
// =====================================================

const createValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Proje adı gerekli')
        .isLength({ max: 200 }).withMessage('Proje adı çok uzun'),
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 5000 }).withMessage('Notlar çok uzun')
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

        const { title, notes } = req.body;

        const result = db.run(`
            INSERT INTO projects (user_id, title, notes)
            VALUES (?, ?, ?)
        `, [req.session.userId, title, notes || null]);

        res.status(201).json({
            message: 'Proje oluşturuldu',
            project: {
                id: result.lastInsertRowid,
                title,
                notes
            }
        });

    } catch (err) {
        console.error('Create project error:', err);
        res.status(500).json({ error: 'Proje oluşturulamadı' });
    }
});

// =====================================================
// GET SINGLE PROJECT WITH ITEMS
// =====================================================

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const project = db.get(`
            SELECT id, title, notes, created_at, updated_at
            FROM projects
            WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        // Get items
        const items = db.all(`
            SELECT id, product_id, qty, notes
            FROM project_items
            WHERE project_id = ?
        `, [id]);

        res.json({
            project: {
                ...project,
                items
            }
        });

    } catch (err) {
        console.error('Get project error:', err);
        res.status(500).json({ error: 'Proje alınamadı' });
    }
});

// =====================================================
// UPDATE PROJECT
// =====================================================

router.put('/:id', createValidation, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { id } = req.params;
        const { title, notes } = req.body;

        // Verify ownership
        const existing = db.get(`
            SELECT id FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!existing) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        db.run(`
            UPDATE projects 
            SET title = ?, notes = ?, updated_at = strftime('%s','now')
            WHERE id = ?
        `, [title, notes || null, id]);

        res.json({ message: 'Proje güncellendi' });

    } catch (err) {
        console.error('Update project error:', err);
        res.status(500).json({ error: 'Proje güncellenemedi' });
    }
});

// =====================================================
// DELETE PROJECT
// =====================================================

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const result = db.run(`
            DELETE FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        res.json({ message: 'Proje silindi' });

    } catch (err) {
        console.error('Delete project error:', err);
        res.status(500).json({ error: 'Proje silinemedi' });
    }
});

// =====================================================
// ADD ITEM TO PROJECT
// =====================================================

router.post('/:id/items', [
    body('product_id').notEmpty().withMessage('Ürün ID gerekli'),
    body('qty').optional().isInt({ min: 1 }).withMessage('Adet en az 1 olmalı'),
    body('notes').optional().trim().isLength({ max: 500 })
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { id } = req.params;
        const { product_id, qty, notes } = req.body;

        // Verify project ownership
        const project = db.get(`
            SELECT id FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        const result = db.run(`
            INSERT INTO project_items (project_id, product_id, qty, notes)
            VALUES (?, ?, ?, ?)
        `, [id, product_id, qty || 1, notes || null]);

        // Update project timestamp
        db.run(`
            UPDATE projects SET updated_at = strftime('%s','now') WHERE id = ?
        `, [id]);

        res.status(201).json({
            message: 'Ürün projeye eklendi',
            item_id: result.lastInsertRowid
        });

    } catch (err) {
        console.error('Add item error:', err);
        res.status(500).json({ error: 'Ürün eklenemedi' });
    }
});

// =====================================================
// REMOVE ITEM FROM PROJECT
// =====================================================

router.delete('/:id/items/:itemId', (req, res) => {
    try {
        const { id, itemId } = req.params;

        // Verify project ownership
        const project = db.get(`
            SELECT id FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        const result = db.run(`
            DELETE FROM project_items WHERE id = ? AND project_id = ?
        `, [itemId, id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Ürün bulunamadı' });
        }

        res.json({ message: 'Ürün projeden çıkarıldı' });

    } catch (err) {
        console.error('Remove item error:', err);
        res.status(500).json({ error: 'Ürün çıkarılamadı' });
    }
});

module.exports = router;
