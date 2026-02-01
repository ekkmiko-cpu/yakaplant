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
                details: dbError.message,
                stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
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

// Temporary debug endpoint (remove after debugging)
app.get('/api/debug-env', (req, res) => {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;
    res.json({
        hasTursoUrl: !!tursoUrl,
        hasTursoToken: !!tursoToken,
        tursoUrlStart: tursoUrl ? tursoUrl.substring(0, 40) : 'not set',
        nodeEnv: process.env.NODE_ENV,
        vercel: process.env.VERCEL
    });
});

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================

// Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
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
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================================================
// SESSION CONFIGURATION
// =====================================================

const sessionConfig = {
    store: new MemoryStore({
        checkPeriod: 86400000 // Prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'yakaplant-fallback-secret',
    resave: false,
    saveUninitialized: false,
    name: 'yakaplant.sid', // Custom cookie name
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // 'strict' can cause issues with redirects
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
};

// Trust proxy in production (for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(session(sessionConfig));

// =====================================================
// API ROUTES
// =====================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Auth routes (with rate limiting)
app.use('/api/auth', rateLimiter, authRoutes);

// Protected routes
app.use('/api/me', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/projects', projectRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// =====================================================
// ERROR HANDLING
// =====================================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    // CSRF error
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ error: 'Geçersiz CSRF token' });
    }

    res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// =====================================================
// START SERVER (for local development)
// =====================================================

async function startServer() {
    try {
        // Initialize database
        await initDatabase();
        dbReady = true;
        console.log('📦 Database initialized');

        app.listen(PORT, () => {
            console.log(`\n🌿 YakaPlant Backend`);
            console.log(`===========================`);
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`===========================\n`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

module.exports = app;
