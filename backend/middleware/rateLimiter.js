/**
 * Rate Limiter Middleware
 * Prevents brute-force attacks on auth endpoints
 */

const rateLimit = require('express-rate-limit');
const db = require('../config/db');

// Login rate limiter: 5 attempts per 15 minutes
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: {
        error: 'Çok fazla deneme yaptınız. Lütfen 15 dakika sonra tekrar deneyin.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip successful requests
    skipSuccessfulRequests: true,
    // Key generator (by IP)
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] || 'unknown';
    },
    // Handler for exceeded limit
    handler: (req, res, next, options) => {
        // Log to audit
        logAuditEvent('RATE_LIMIT_EXCEEDED', req.body?.email || null, req.ip, 'Rate limit aşıldı');

        res.status(429).json(options.message);
    }
});

// General API rate limiter: 100 requests per minute
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: {
        error: 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Log audit event to database
 */
function logAuditEvent(eventType, email, ip, details) {
    try {
        db.run(`
            INSERT INTO audit_log (event_type, user_email, ip_address, details)
            VALUES (?, ?, ?, ?)
        `, [eventType, email, ip, details]);
    } catch (err) {
        console.error('Audit log error:', err.message);
    }
}

module.exports = {
    rateLimiter,
    apiLimiter,
    logAuditEvent
};
