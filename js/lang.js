/**
 * Yakaplant Language Switcher
 * Reads/saves language preference from localStorage
 * Applies translations by finding elements with data-i18n attributes
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'yakaplant-lang';
  const DEFAULT_LANG = 'tr';
  const SUPPORTED = ['tr', 'en', 'de', 'nl'];

  /** Get the nested value from translations object by dot-path */
  function getTranslation(lang, key) {
    if (!translations || !translations[lang]) return null;
    return key.split('.').reduce(function (obj, k) {
      return obj && obj[k] !== undefined ? obj[k] : null;
    }, translations[lang]);
  }

  /** Get current language from localStorage or default */
  function getCurrentLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return DEFAULT_LANG;
  }

  /** Apply all translations to the page */
  function applyTranslations(lang) {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = getTranslation(lang, key);
      if (val !== null) {
        // Preserve child elements (like <i> icons)
        // Check if element has icon children
        var icons = el.querySelectorAll('i, img, svg');
        if (icons.length > 0 && el.children.length > 0) {
          // Find text nodes and update them
          var nodes = el.childNodes;
          var textUpdated = false;
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim()) {
              nodes[i].textContent = ' ' + val + ' ';
              textUpdated = true;
              break;
            }
          }
          if (!textUpdated) {
            // If no text node found, prepend text before first icon or append after
            var firstChild = el.firstChild;
            if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
              el.insertBefore(document.createTextNode(val + ' '), firstChild);
            } else {
              el.textContent = val;
            }
          }
        } else if (el.querySelector('span.highlight')) {
          // Handle elements with span.highlight inside (like hero titles)
          // Don't replace — these are handled separately
        } else {
          el.textContent = val;
        }
      }
    });

    // innerHTML translations (for elements with mixed HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var val = getTranslation(lang, key);
      if (val !== null) el.innerHTML = val;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = getTranslation(lang, key);
      if (val !== null) el.placeholder = val;
    });

    // Aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var val = getTranslation(lang, key);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update the language toggle display
    var currentLangSpan = document.getElementById('current-lang');
    if (currentLangSpan) {
      currentLangSpan.textContent = lang.toUpperCase();
    }

    // Mark active language in dropdown
    document.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  /** Set and apply language */
  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  /** Initialize dropdown behaviour */
  function initDropdown() {
    var toggle = document.getElementById('lang-toggle');
    var dropdown = document.getElementById('lang-dropdown');
    if (!toggle || !dropdown) return;

    // Toggle dropdown
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Language option click
    dropdown.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        dropdown.classList.remove('open');
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });
  }

  // Expose for external use
  window.YakaLang = {
    get: getCurrentLang,
    set: setLanguage,
    apply: applyTranslations
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initDropdown();
      applyTranslations(getCurrentLang());
    });
  } else {
    initDropdown();
    applyTranslations(getCurrentLang());
  }
})();
