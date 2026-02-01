/**
 * Authentication Routes
 * Handles register, login, logout, and password reset
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { logAuditEvent } = require('../middleware/rateLimiter');

// Bcrypt cost factor
const BCRYPT_ROUNDS = 12;

// =====================================================
// VALIDATION RULES
// =====================================================

const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Ad alanı zorunludur')
        .isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 karakter arasında olmalıdır'),
    body('surname')
        .trim()
        .notEmpty().withMessage('Soyad alanı zorunludur')
        .isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 karakter arasında olmalıdır'),
    body('email')
        .trim()
        .isEmail().withMessage('Geçerli bir e-posta adresi girin')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Şifre en az 8 karakter olmalıdır')
        .matches(/[A-Z]/).withMessage('Şifre en az bir büyük harf içermelidir')
        .matches(/[0-9]/).withMessage('Şifre en az bir rakam içermelidir'),
    body('role')
        .isIn(['customer', 'landscape_architect', 'company'])
        .withMessage('Geçersiz kullanıcı tipi'),
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9+\s()-]+$/).withMessage('Geçersiz telefon numarası'),
    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Şehir adı çok uzun'),
    body('company_name')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Şirket adı çok uzun')
];

const loginValidation = [
    body('email')
        .trim()
        .isEmail().withMessage('Geçerli bir e-posta adresi girin')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Şifre gereklidir')
];

// =====================================================
// REGISTER
// =====================================================

router.post('/register', registerValidation, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { name, surname, email, password, role, phone, city, company_name } = req.body;

        // Check if email already exists
        const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(409).json({
                error: 'Bu e-posta adresi zaten kayıtlı'
            });
        }

        // Check if this is the first user
        const countResult = await db.get("SELECT COUNT(*) as count FROM users");
        const userCount = countResult?.count || 0;
        const finalRole = userCount === 0 ? 'admin' : role;

        // Hash password
        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        // Create user
        const userId = uuidv4();
        await db.run(`
            INSERT INTO users (id, name, surname, email, password_hash, role, phone, city, company_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [userId, name, surname, email, passwordHash, finalRole, phone || null, city || null, company_name || null]);

        // Set session
        req.session.userId = userId;
        req.session.userRole = finalRole;
        req.session.userEmail = email;

        // Log success
        logAuditEvent('REGISTER_SUCCESS', email, req.ip, `New user registered as ${finalRole}`);

        res.status(201).json({
            message: 'Kayıt başarılı',
            user: {
                id: userId,
                name,
                surname,
                email,
                role: finalRole
            }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Kayıt işlemi başarısız' });
    }
});

// =====================================================
// LOGIN
// =====================================================

router.post('/login', loginValidation, async (req, res) => {
    try {
        // Check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await db.get(`
            SELECT id, name, surname, email, password_hash, role 
            FROM users WHERE email = ?
        `, [email]);

        if (!user) {
            logAuditEvent('LOGIN_FAILED', email, req.ip, 'User not found');
            return res.status(401).json({
                error: 'E-posta veya şifre hatalı'
            });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            logAuditEvent('LOGIN_FAILED', email, req.ip, 'Wrong password');
            return res.status(401).json({
                error: 'E-posta veya şifre hatalı'
            });
        }

        // Set session
        req.session.userId = user.id;
        req.session.userRole = user.role;
        req.session.userEmail = user.email;

        // Log success
        logAuditEvent('LOGIN_SUCCESS', email, req.ip, 'User logged in');

        res.json({
            message: 'Giriş başarılı',
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Giriş işlemi başarısız' });
    }
});

// =====================================================
// LOGOUT
// =====================================================

router.post('/logout', (req, res) => {
    const email = req.session?.userEmail;

    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Çıkış işlemi başarısız' });
        }

        // Clear cookie
        res.clearCookie('yakaplant.sid');

        if (email) {
            logAuditEvent('LOGOUT', email, req.ip, 'User logged out');
        }

        res.json({ message: 'Çıkış başarılı' });
    });
});

// =====================================================
// FORGOT PASSWORD
// =====================================================

router.post('/forgot-password', [
    body('email').trim().isEmail().withMessage('Geçerli bir e-posta girin').normalizeEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            });
        }

        const { email } = req.body;

        // Find user
        const user = await db.get('SELECT id FROM users WHERE email = ?', [email]);

        // Always return success (don't reveal if email exists)
        if (!user) {
            logAuditEvent('PASSWORD_RESET_REQUEST', email, req.ip, 'Email not found');
            return res.json({
                message: 'Eğer bu e-posta kayıtlıysa, şifre sıfırlama bağlantısı gönderildi'
            });
        }

        // Generate reset token
        const resetToken = uuidv4();
        const expiresAt = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour

        // Save token
        await db.run(`
            UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?
        `, [resetToken, expiresAt, user.id]);

        logAuditEvent('PASSWORD_RESET_REQUEST', email, req.ip, 'Reset token created');

        // TODO: Send email with reset link
        // For MVP, just log the token
        console.log(`\n🔑 Password Reset Token for ${email}: ${resetToken}\n`);

        res.json({
            message: 'Eğer bu e-posta kayıtlıysa, şifre sıfırlama bağlantısı gönderildi',
            // Only in development:
            ...(process.env.NODE_ENV === 'development' && { debug_token: resetToken })
        });

    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'İşlem başarısız' });
    }
});

// =====================================================
// RESET PASSWORD
// =====================================================

router.post('/reset-password', [
    body('token').notEmpty().withMessage('Token gerekli'),
    body('password')
        .isLength({ min: 8 }).withMessage('Şifre en az 8 karakter olmalıdır')
        .matches(/[A-Z]/).withMessage('Şifre en az bir büyük harf içermelidir')
        .matches(/[0-9]/).withMessage('Şifre en az bir rakam içermelidir')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Doğrulama hatası',
                details: errors.array().map(e => e.msg)
            });
        }

        const { token, password } = req.body;
        const now = Math.floor(Date.now() / 1000);

        // Find user with valid token
        const user = await db.get(`
            SELECT id, email FROM users 
            WHERE reset_token = ? AND reset_token_expires > ?
        `, [token, now]);

        if (!user) {
            return res.status(400).json({
                error: 'Geçersiz veya süresi dolmuş sıfırlama bağlantısı'
            });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        // Update password and clear token
        await db.run(`
            UPDATE users 
            SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL, updated_at = strftime('%s','now')
            WHERE id = ?
        `, [passwordHash, user.id]);

        logAuditEvent('PASSWORD_RESET_SUCCESS', user.email, req.ip, 'Password changed via reset');

        res.json({ message: 'Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.' });

    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Şifre sıfırlama başarısız' });
    }
});

module.exports = router;
