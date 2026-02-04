/**
 * YakaPlant API Module
 * Fetch wrapper for backend API calls
 * Handles authentication cookies automatically
 */

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/api'
    : '/api';

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint (without /api prefix)
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const config = {
        credentials: 'include', // Send cookies
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    // Convert body to JSON if object
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);

        // Try to parse JSON, but handle non-JSON responses
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            // Non-JSON response (e.g., HTML error page from Vercel)
            const text = await response.text();
            if (!response.ok) {
                const error = new Error('Sunucu şu anda erişilebilir değil. Lütfen daha sonra tekrar deneyin.');
                error.status = response.status;
                throw error;
            }
            data = { message: text };
        }

        if (!response.ok) {
            // Create error with message from API
            const error = new Error(data.error || 'Bir hata oluştu');
            error.status = response.status;
            error.details = data.details;
            throw error;
        }

        return data;

    } catch (err) {
        // Network error or fetch failed
        if (!err.status) {
            err.message = 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.';
        }
        throw err;
    }
}

// =====================================================
// AUTH API
// =====================================================

const authAPI = {
    /**
     * Register new user
     * @param {object} userData - { name, surname, email, password, role, phone?, city?, company_name? }
     */
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: userData
    }),

    /**
     * Login user
     * @param {object} credentials - { email, password }
     */
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: credentials
    }),

    /**
     * Logout current user
     */
    logout: () => apiRequest('/auth/logout', {
        method: 'POST'
    }),

    /**
     * Request password reset email
     * @param {string} email
     */
    forgotPassword: (email) => apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: { email }
    }),

    /**
     * Reset password with token
     * @param {string} token - Reset token from email
     * @param {string} password - New password
     */
    resetPassword: (token, password) => apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { token, password }
    })
};

// =====================================================
// USER API
// =====================================================

const userAPI = {
    /**
     * Get current user info
     */
    getMe: () => apiRequest('/me'),

    /**
     * Update user profile
     * @param {object} updates - { name?, surname?, phone?, city?, company_name? }
     */
    updateProfile: (updates) => apiRequest('/me', {
        method: 'PUT',
        body: updates
    })
};

// =====================================================
// FAVORITES API
// =====================================================

const favoritesAPI = {
    /**
     * Get all favorites
     */
    getAll: () => apiRequest('/favorites'),

    /**
     * Add product to favorites
     * @param {string} productId
     */
    add: (productId) => apiRequest('/favorites', {
        method: 'POST',
        body: { product_id: productId }
    }),

    /**
     * Remove product from favorites
     * @param {string} productId
     */
    remove: (productId) => apiRequest(`/favorites/${productId}`, {
        method: 'DELETE'
    }),

    /**
     * Check if product is favorited
     * @param {string} productId
     */
    check: (productId) => apiRequest(`/favorites/check/${productId}`)
};

// =====================================================
// QUOTES API
// =====================================================

const quotesAPI = {
    /**
     * Get all quote requests
     */
    getAll: () => apiRequest('/quotes'),

    /**
     * Get single quote
     * @param {number} id
     */
    getOne: (id) => apiRequest(`/quotes/${id}`),

    /**
     * Create quote request
     * @param {object} data - { request_text?, project_id?, product_ids? }
     */
    create: (data) => apiRequest('/quotes', {
        method: 'POST',
        body: data
    })
};

// =====================================================
// PROJECTS API (PRO only)
// =====================================================

const projectsAPI = {
    /**
     * Get all projects
     */
    getAll: () => apiRequest('/projects'),

    /**
     * Get single project with items
     * @param {number} id
     */
    getOne: (id) => apiRequest(`/projects/${id}`),

    /**
     * Create project
     * @param {object} data - { title, notes? }
     */
    create: (data) => apiRequest('/projects', {
        method: 'POST',
        body: data
    }),

    /**
     * Update project
     * @param {number} id
     * @param {object} data - { title, notes? }
     */
    update: (id, data) => apiRequest(`/projects/${id}`, {
        method: 'PUT',
        body: data
    }),

    /**
     * Delete project
     * @param {number} id
     */
    delete: (id) => apiRequest(`/projects/${id}`, {
        method: 'DELETE'
    }),

    /**
     * Add item to project
     * @param {number} projectId
     * @param {object} item - { product_id, qty?, notes? }
     */
    addItem: (projectId, item) => apiRequest(`/projects/${projectId}/items`, {
        method: 'POST',
        body: item
    }),

    /**
     * Remove item from project
     * @param {number} projectId
     * @param {number} itemId
     */
    removeItem: (projectId, itemId) => apiRequest(`/projects/${projectId}/items/${itemId}`, {
        method: 'DELETE'
    })
};

// Export all APIs
window.YakaAPI = {
    auth: authAPI,
    user: userAPI,
    favorites: favoritesAPI,
    quotes: quotesAPI,
    projects: projectsAPI
};
