/**
 * YakaPlant Backend Server
 * Express.js API with session-based authentication
 */

require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { initDatabase } = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const favoriteRoutes = require('./routes/favorites');
const quoteRoutes = require('./routes/quotes');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');

// Import middleware
const { rateLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

// =====================================================
// DATABASE INITIALIZATION (for serverless)
// =====================================================

let dbReady = false;
let dbInitPromise = null;
let dbError = null;

// Middleware to ensure DB is initialized before any request
app.use(async (req, res, next) => {
    if (dbReady) return next();

    if (!dbInitPromise) {
        dbInitPromise = initDatabase().then(() => {
            dbReady = true;
            console.log('📦 Database ready');
        }).catch(err => {
            console.error('DB init error:', err);
            dbError = err;
        });
    }

    try {
        await dbInitPromise;
        if (dbError) {
            return res.status(500).json({
                error: 'Veritabanı başlatılamadı',
                details: dbError.message
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            error: 'Veritabanı başlatılamadı',
            details: err.message
        });
    }
});

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================

// Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://unpkg.com", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://www.googletagmanager.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://*.supabase.co", "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net"],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
const allowedOrigins = [
    'http://localhost:3001',
    'https://www.yakaplant.com',
    'https://yakaplant.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('CORS not allowed'));
    },
    credentials: true
}));

// Body parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================================================
// SESSION CONFIGURATION
// =====================================================

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
    console.error('WARNING: SESSION_SECRET is not set. Sessions will not be secure. Set this in your Vercel environment variables.');
}

const sessionConfig = {
    name: 'yakaplant.sid',
    secret: process.env.SESSION_SECRET || 'yakaplant-dev-secret-do-not-use-in-production',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new MemoryStore({
        checkPeriod: 86400000 // 24 hours
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
};

app.use(session(sessionConfig));

// =====================================================
// API ROUTES
// =====================================================

// Apply rate limiter before all routes (health check excluded)
app.use('/api/', rateLimiter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Current user
app.get('/api/me', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ user: null });
    }

    const db = require('./config/db');
    const user = db.get('SELECT id, name, surname, email, role FROM users WHERE id = ?', [req.session.userId]);

    if (!user) {
        return res.status(401).json({ user: null });
    }

    res.json({ user });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);

// =====================================================
// ERROR HANDLING
// =====================================================

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
