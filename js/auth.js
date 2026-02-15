/**
 * YakaPlant Auth Module (Supabase Version)
 * Manages authentication state across pages
 */

// Current user state (cached)
let currentUser = null;
let currentProfile = null;
let authChecked = false;

/**
 * Check if user is logged in
 * @returns {Promise<object|null>} User object or null
 */
async function checkAuth() {
    if (authChecked && currentUser) {
        return currentUser;
    }

    try {
        const { data: { user }, error } = await window.YakaSupabase.auth.getUser();

        if (error || !user) {
            currentUser = null;
            currentProfile = null;
            authChecked = true;
            return null;
        }

        currentUser = user;

        // Fetch profile data
        const { data: profile } = await window.YakaSupabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        currentProfile = profile;
        authChecked = true;

        return { ...user, profile };
    } catch (err) {
        console.error('Auth check error:', err);
        currentUser = null;
        currentProfile = null;
        authChecked = true;
        return null;
    }
}

/**
 * Get current user (from cache)
 */
function getUser() {
    return currentUser;
}

/**
 * Get current user profile
 */
function getProfile() {
    return currentProfile;
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
    return currentProfile && ['landscape_architect', 'company'].includes(currentProfile.role);
}

/**
 * Check if user is Admin
 */
function isAdmin() {
    return currentProfile && currentProfile.role === 'admin';
}

/**
 * Register new user
 * @param {object} userData - { email, password, name, surname, phone?, city?, role?, company_name? }
 */
async function register(userData) {
    const { email, password, name, surname, phone, city, role, company_name } = userData;

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await window.YakaSupabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                surname
            }
        }
    });

    if (authError) {
        throw new Error(authError.message);
    }

    if (!authData.user) {
        throw new Error('Kayıt işlemi başarısız oldu');
    }

    // Create profile
    const { error: profileError } = await window.YakaSupabase
        .from('profiles')
        .insert({
            id: authData.user.id,
            name,
            surname,
            phone: phone || null,
            city: city || null,
            role: role || 'customer',
            company_name: company_name || null
        });

    if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't throw - user is created, profile can be fixed later
    }

    return authData;
}

/**
 * Login user
 * @param {object} credentials - { email, password }
 */
async function login(credentials) {
    const { email, password } = credentials;

    const { data, error } = await window.YakaSupabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        // Translate common errors
        if (error.message.includes('Invalid login credentials')) {
            throw new Error('E-posta veya şifre hatalı');
        }
        if (error.message.includes('Email not confirmed')) {
            throw new Error('Lütfen e-posta adresinizi doğrulayın');
        }
        throw new Error(error.message);
    }

    currentUser = data.user;
    authChecked = false; // Force re-fetch profile
    await checkAuth();

    return data;
}

/**
 * Logout and redirect to home
 */
async function logout() {
    try {
        await window.YakaSupabase.auth.signOut();
    } catch (err) {
        console.error('Logout error:', err);
    }
    currentUser = null;
    currentProfile = null;
    authChecked = false;
    window.location.href = '/';
}

/**
 * Redirect to login if not authenticated
 */
async function requireAuth() {
    const user = await checkAuth();
    if (!user) {
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = '/login';
        return null;
    }
    return user;
}

/**
 * Redirect to account if already logged in
 */
async function redirectIfLoggedIn() {
    const user = await checkAuth();
    if (user) {
        window.location.href = '/account';
    }
}

/**
 * Get redirect URL after login (and clear it)
 */
function getRedirectUrl() {
    const url = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    return url || '/account';
}

/**
 * Update navbar based on auth state
 */
async function updateNavbar() {
    const user = await checkAuth();
    const navLinks = document.querySelector('.nav-links');

    if (!navLinks) return;

    let authContainer = document.getElementById('nav-auth-container');
    if (!authContainer) {
        authContainer = document.createElement('li');
        authContainer.id = 'nav-auth-container';
        navLinks.appendChild(authContainer);
    }

    if (user && currentProfile) {
        authContainer.innerHTML = `
            <div class="nav-dropdown">
                <button class="nav-link nav-dropdown-trigger">
                    <i class="ph ph-user-circle"></i>
                    <span>${currentProfile.name || user.email}</span>
                    <i class="ph ph-caret-down"></i>
                </button>
                <div class="nav-dropdown-menu">
                    ${isAdmin() ? `
                    <a href="/admin" class="dropdown-item" style="color:var(--primary); font-weight:600;">
                        <i class="ph ph-squares-four"></i> Yönetim Paneli
                    </a>
                    <hr class="dropdown-divider">
                    ` : ''}
                    
                    <a href="/account" class="dropdown-item">
                        <i class="ph ph-user"></i> Profilim
                    </a>
                    <a href="/account/favorites" class="dropdown-item">
                        <i class="ph ph-heart"></i> Favorilerim
                    </a>
                    <a href="/account/requests" class="dropdown-item">
                        <i class="ph ph-file-text"></i> Teklif Taleplerim
                    </a>
                    ${isPro() ? `
                    <a href="/account/projects" class="dropdown-item">
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

        const trigger = authContainer.querySelector('.nav-dropdown-trigger');
        const menu = authContainer.querySelector('.nav-dropdown-menu');

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!authContainer.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

    } else {
        authContainer.innerHTML = `
            <a href="/login" class="nav-link auth-link">
                <i class="ph ph-sign-in"></i> Giriş Yap
            </a>
        `;
    }
}

/**
 * Reset password request
 * @param {string} email
 */
async function forgotPassword(email) {
    const { error } = await window.YakaSupabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Update password
 * @param {string} newPassword
 */
async function updatePassword(newPassword) {
    const { error } = await window.YakaSupabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        throw new Error(error.message);
    }
}

// Export
window.YakaAuth = {
    checkAuth,
    getUser,
    getProfile,
    isLoggedIn,
    isPro,
    isAdmin,
    register,
    login,
    logout,
    requireAuth,
    redirectIfLoggedIn,
    getRedirectUrl,
    updateNavbar,
    forgotPassword,
    updatePassword
};

// Auto-update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    window.YakaAuth.updateNavbar();
});

// Listen for auth state changes
window.YakaSupabase?.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        currentUser = null;
        currentProfile = null;
        authChecked = false;
    }
});
