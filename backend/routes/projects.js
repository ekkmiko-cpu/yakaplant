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

/**
 * GET / - List user's projects
 */
router.get('/', async (req, res) => {
    try {
        const projects = await db.all(`
            SELECT 
                p.id,
                p.name,
                p.description,
                p.created_at,
                p.updated_at
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

/**
 * POST / - Create project
 */
const createValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Proje adı gerekli')
        .isLength({ max: 200 }).withMessage('Proje adı çok uzun'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 5000 }).withMessage('Açıklama çok uzun')
];

router.post('/', createValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { name, description } = req.body;

        const result = await db.run(`
            INSERT INTO projects (user_id, name, description)
            VALUES (?, ?, ?)
        `, [req.session.userId, name, description || null]);

        res.status(201).json({
            message: 'Proje oluşturuldu',
            project: {
                id: result.lastInsertRowid,
                name,
                description
            }
        });

    } catch (err) {
        console.error('Create project error:', err);
        res.status(500).json({ error: 'Proje oluşturulamadı' });
    }
});

/**
 * GET /:id - Get single project
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const project = await db.get(`
            SELECT id, name, description, design_json, created_at, updated_at
            FROM projects
            WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        res.json({ project });

    } catch (err) {
        console.error('Get project error:', err);
        res.status(500).json({ error: 'Proje alınamadı' });
    }
});

/**
 * PUT /:id - Update project
 */
router.put('/:id', createValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { id } = req.params;
        const { name, description } = req.body;

        // Verify ownership
        const existing = await db.get(`
            SELECT id FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        if (!existing) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        await db.run(`
            UPDATE projects 
            SET name = ?, description = ?, updated_at = strftime('%s','now')
            WHERE id = ?
        `, [name, description || null, id]);

        res.json({ message: 'Proje güncellendi' });

    } catch (err) {
        console.error('Update project error:', err);
        res.status(500).json({ error: 'Proje güncellenemedi' });
    }
});

/**
 * DELETE /:id - Delete project
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.run(`
            DELETE FROM projects WHERE id = ? AND user_id = ?
        `, [id, req.session.userId]);

        res.json({ message: 'Proje silindi' });

    } catch (err) {
        console.error('Delete project error:', err);
        res.status(500).json({ error: 'Proje silinemedi' });
    }
});

module.exports = router;
