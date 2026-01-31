/**
 * Authentication Middleware
 * Checks if user is logged in via session
 */

/**
 * Require authentication
 * Returns 401 if not logged in
 */
function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({
            error: 'Bu işlem için giriş yapmanız gerekiyor',
            code: 'UNAUTHORIZED'
        });
    }
    next();
}

/**
 * Require PRO role (landscape_architect or company)
 * Must be used after requireAuth
 */
function requirePro(req, res, next) {
    const proRoles = ['landscape_architect', 'company'];

    if (!req.session.userRole || !proRoles.includes(req.session.userRole)) {
        return res.status(403).json({
            error: 'Bu özellik sadece profesyonel hesaplar için kullanılabilir',
            code: 'PRO_REQUIRED'
        });
    }
    next();
}

/**
 * Optional auth - sets user info if logged in, but doesn't require it
 */
function optionalAuth(req, res, next) {
    // Just pass through - session info will be available if logged in
    next();
}

module.exports = {
    requireAuth,
    requirePro,
    optionalAuth
};
