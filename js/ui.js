/**
 * YakaPlant UI Utilities
 * Toast notifications, loaders, modals, form helpers
 */

// =====================================================
// TOAST NOTIFICATIONS
// =====================================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {number} duration - Duration in ms (default: 4000)
 */
function showToast(message, type = 'info', duration = 4000) {
    // Create container if doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'ph-check-circle',
        error: 'ph-x-circle',
        warning: 'ph-warning',
        info: 'ph-info'
    };

    toast.innerHTML = `
        <i class="ph ${icons[type] || icons.info}"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close"><i class="ph ph-x"></i></button>
    `;

    // Close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

function removeToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
}

// Shorthand functions
const toast = {
    success: (msg) => showToast(msg, 'success'),
    error: (msg) => showToast(msg, 'error'),
    warning: (msg) => showToast(msg, 'warning'),
    info: (msg) => showToast(msg, 'info')
};

// =====================================================
// LOADING STATES
// =====================================================

/**
 * Show loading overlay
 * @param {string} message - Loading message
 */
function showLoader(message = 'Yükleniyor...') {
    let loader = document.getElementById('yaka-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'yaka-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p class="loader-text">${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
    } else {
        loader.querySelector('.loader-text').textContent = message;
        loader.style.display = 'flex';
    }
}

/**
 * Hide loading overlay
 */
function hideLoader() {
    const loader = document.getElementById('yaka-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

/**
 * Set button loading state
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 */
function setButtonLoading(button, loading) {
    if (loading) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<i class="ph ph-spinner loading-spin"></i>';
        button.disabled = true;
    } else {
        button.innerHTML = button.dataset.originalText || button.innerHTML;
        button.disabled = false;
    }
}

// =====================================================
// FORM HELPERS
// =====================================================

/**
 * Validate form and return data
 * @param {HTMLFormElement} form
 * @returns {object|null} Form data or null if invalid
 */
function validateForm(form) {
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    // Check HTML5 validation
    if (!form.checkValidity()) {
        // Find first invalid field
        const invalid = form.querySelector(':invalid');
        if (invalid) {
            showFieldError(invalid, invalid.validationMessage);
            invalid.focus();
        }
        return null;
    }

    // Return FormData as object
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        if (value !== '') {
            data[key] = value;
        }
    });

    return data;
}

/**
 * Show error on form field
 * @param {HTMLElement} field
 * @param {string} message
 */
function showFieldError(field, message) {
    field.classList.add('input-error');

    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;

    field.parentNode.insertBefore(error, field.nextSibling);
}

/**
 * Clear all form errors
 * @param {HTMLFormElement} form
 */
function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

// =====================================================
// CONFIRM DIALOG
// =====================================================

/**
 * Show confirmation dialog
 * @param {string} message
 * @param {object} options - { title?, confirmText?, cancelText?, danger? }
 * @returns {Promise<boolean>}
 */
function confirm(message, options = {}) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'confirm-modal';
        modal.innerHTML = `
            <div class="confirm-backdrop"></div>
            <div class="confirm-content">
                <h3 class="confirm-title">${options.title || 'Onay'}</h3>
                <p class="confirm-message">${message}</p>
                <div class="confirm-actions">
                    <button class="btn btn-secondary cancel-btn">${options.cancelText || 'İptal'}</button>
                    <button class="btn ${options.danger ? 'btn-danger' : 'btn-primary'} confirm-btn">
                        ${options.confirmText || 'Onayla'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('show'));

        const cleanup = (result) => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 200);
            resolve(result);
        };

        modal.querySelector('.cancel-btn').addEventListener('click', () => cleanup(false));
        modal.querySelector('.confirm-btn').addEventListener('click', () => cleanup(true));
        modal.querySelector('.confirm-backdrop').addEventListener('click', () => cleanup(false));
    });
}

// =====================================================
// FORMAT HELPERS
// =====================================================

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp (seconds)
 * @returns {string}
 */
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format timestamp to relative time
 * @param {number} timestamp - Unix timestamp (seconds)
 * @returns {string}
 */
function formatRelativeTime(timestamp) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 60) return 'Az önce';
    if (diff < 3600) return `${Math.floor(diff / 60)} dakika önce`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} gün önce`;

    return formatDate(timestamp);
}

/**
 * Get role display name in Turkish
 * @param {string} role
 * @returns {string}
 */
function getRoleName(role) {
    const roles = {
        customer: 'Bireysel Müşteri',
        landscape_architect: 'Peyzaj Mimarı',
        company: 'Firma / Kurumsal'
    };
    return roles[role] || role;
}

/**
 * Get quote status display name and color
 * @param {string} status
 * @returns {{ name: string, color: string }}
 */
function getQuoteStatus(status) {
    const statuses = {
        new: { name: 'Beklemede', color: 'warning' },
        contacted: { name: 'İletişime Geçildi', color: 'info' },
        quoted: { name: 'Teklif Verildi', color: 'success' },
        closed: { name: 'Tamamlandı', color: 'secondary' }
    };
    return statuses[status] || { name: status, color: 'secondary' };
}

// Export
window.YakaUI = {
    toast,
    showToast,
    showLoader,
    hideLoader,
    setButtonLoading,
    validateForm,
    showFieldError,
    clearFormErrors,
    confirm,
    formatDate,
    formatRelativeTime,
    getRoleName,
    getQuoteStatus
};
