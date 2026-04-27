/**
 * YakaPlant UI Utilities
 * Toast notifications, loaders, modals, form helpers
 */

// =====================================================
// SECURITY HELPERS
// =====================================================

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

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
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'ph-check-circle',
        error: 'ph-x-circle',
        warning: 'ph-warning',
        info: 'ph-info'
    };

    const icon = document.createElement('i');
    icon.className = `ph ${icons[type] || icons.info}`;

    const msgSpan = document.createElement('span');
    msgSpan.className = 'toast-message';
    msgSpan.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '<i class="ph ph-x"></i>';

    toast.appendChild(icon);
    toast.appendChild(msgSpan);
    toast.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => removeToast(toast));
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => removeToast(toast), duration);
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
                <p class="loader-text"></p>
            </div>
        `;
        loader.querySelector('.loader-text').textContent = message;
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
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    if (!form.checkValidity()) {
        const invalid = form.querySelector(':invalid');
        if (invalid) {
            showFieldError(invalid, invalid.validationMessage);
            invalid.focus();
        }
        return null;
    }

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

        const backdrop = document.createElement('div');
        backdrop.className = 'confirm-backdrop';

        const content = document.createElement('div');
        content.className = 'confirm-content';

        const title = document.createElement('h3');
        title.className = 'confirm-title';
        title.textContent = options.title || 'Onay';

        const msg = document.createElement('p');
        msg.className = 'confirm-message';
        msg.textContent = message;

        const actions = document.createElement('div');
        actions.className = 'confirm-actions';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-secondary cancel-btn';
        cancelBtn.textContent = options.cancelText || 'İptal';

        const confirmBtn = document.createElement('button');
        confirmBtn.className = `btn ${options.danger ? 'btn-danger' : 'btn-primary'} confirm-btn`;
        confirmBtn.textContent = options.confirmText || 'Onayla';

        actions.appendChild(cancelBtn);
        actions.appendChild(confirmBtn);
        content.appendChild(title);
        content.appendChild(msg);
        content.appendChild(actions);
        modal.appendChild(backdrop);
        modal.appendChild(content);

        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('show'));

        const cleanup = (result) => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 200);
            resolve(result);
        };

        cancelBtn.addEventListener('click', () => cleanup(false));
        confirmBtn.addEventListener('click', () => cleanup(true));
        backdrop.addEventListener('click', () => cleanup(false));
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
    escapeHTML,
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
