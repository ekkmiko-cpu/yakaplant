/**
 * YakaPlant Auth Module
 * Manages authentication state across pages
 */

// Current user state (cached)
let currentUser = null;
let authChecked = false;

/**
 * Check if user is logged in
 * Fetches /api/me to verify session
 * @returns {Promise<object|null>} User object or null
 */
async function checkAuth() {
    if (authChecked && currentUser) {
        return currentUser;
    }

    try {
        const data = await window.YakaAPI.user.getMe();
        currentUser = data.user;
        authChecked = true;
        return currentUser;
    } catch (err) {
        currentUser = null;
        authChecked = true;
        return null;
    }
}

/**
 * Get current user (from cache)
 * Call checkAuth first to ensure fresh data
 */
function getUser() {
    return currentUser;
}

/**
 * Check if user is logged in (sync, from cache)
 */
function isLoggedIn() {
    return currentUser !== null;
}

/**
 * Check if user has PRO role
 */
function isPro() {
    return currentUser && ['landscape_architect', 'company'].includes(currentUser.role);
}

/**
 * Logout and redirect to home
 */
async function logout() {
    try {
        await window.YakaAPI.auth.logout();
    } catch (err) {
        console.error('Logout error:', err);
    }
    currentUser = null;
    authChecked = false;
    window.location.href = '/index.html';
}

/**
 * Redirect to login if not authenticated
 * Use on protected pages
 */
async function requireAuth() {
    const user = await checkAuth();
    if (!user) {
        // Save current URL for redirect after login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = '/login.html';
        return null;
    }
    return user;
}

/**
 * Redirect to account if already logged in
 * Use on login/register pages
 */
async function redirectIfLoggedIn() {
    const user = await checkAuth();
    if (user) {
        window.location.href = '/account/index.html';
    }
}

/**
 * Get redirect URL after login (and clear it)
 */
function getRedirectUrl() {
    const url = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    return url || '/account/index.html';
}

/**
 * Update navbar based on auth state
 */
async function updateNavbar() {
    const user = await checkAuth();
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (!navLinks) return;

    // Find or create auth container
    let authContainer = document.getElementById('nav-auth-container');
    if (!authContainer) {
        authContainer = document.createElement('li');
        authContainer.id = 'nav-auth-container';
        navLinks.appendChild(authContainer);
    }

    if (user) {
        // Logged in: Show account dropdown
        authContainer.innerHTML = `
            <div class="nav-dropdown">
                <button class="nav-link nav-dropdown-trigger">
                    <i class="ph ph-user-circle"></i>
                    <span>${user.name}</span>
                    <i class="ph ph-caret-down"></i>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="/account/index.html" class="dropdown-item">
                        <i class="ph ph-user"></i> Profilim
                    </a>
                    <a href="/account/favorites.html" class="dropdown-item">
                        <i class="ph ph-heart"></i> Favorilerim
                    </a>
                    <a href="/account/requests.html" class="dropdown-item">
                        <i class="ph ph-file-text"></i> Teklif Taleplerim
                    </a>
                    ${isPro() ? `
                    <a href="/account/projects.html" class="dropdown-item">
                        <i class="ph ph-folder"></i> Projelerim
                    </a>
                    ` : ''}
                    <hr class="dropdown-divider">
                    <button onclick="YakaAuth.logout()" class="dropdown-item logout-btn">
                        <i class="ph ph-sign-out"></i> Çıkış Yap
                    </button>
                </div>
            </div>
        `;

        // Add dropdown toggle logic
        const trigger = authContainer.querySelector('.nav-dropdown-trigger');
        const menu = authContainer.querySelector('.nav-dropdown-menu');

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.toggle('show');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!authContainer.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

    } else {
        // Not logged in: Show login/register buttons
        authContainer.innerHTML = `
            <a href="/login.html" class="nav-link auth-link">
                <i class="ph ph-sign-in"></i> Giriş Yap
            </a>
        `;
    }
}

// Export
window.YakaAuth = {
    checkAuth,
    getUser,
    isLoggedIn,
    isPro,
    logout,
    requireAuth,
    redirectIfLoggedIn,
    getRedirectUrl,
    updateNavbar
};

// Auto-update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    window.YakaAuth.updateNavbar();
});
