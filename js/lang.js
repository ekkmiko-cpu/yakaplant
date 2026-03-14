/**
 * Yakaplant Language Switcher
 * Reads/saves language preference from localStorage
 * Applies translations by finding elements with data-i18n attributes
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'yakaplant-lang';
  var DEFAULT_LANG = 'tr';
  var SUPPORTED = ['tr', 'en', 'de', 'nl'];

  /** Get the nested value from translations object by dot-path */
  function getTranslation(lang, key) {
    if (typeof translations === 'undefined' || !translations[lang]) return null;
    return key.split('.').reduce(function (obj, k) {
      return obj && obj[k] !== undefined ? obj[k] : null;
    }, translations[lang]);
  }

  /** Get current language from localStorage or default */
  function getCurrentLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  /** Apply all translations to the page */
  function applyTranslations(lang) {
    // Text content
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      var val = getTranslation(lang, key);
      if (val === null) continue;

      // Check if element has icon children that need preserving
      var hasIcons = el.querySelector('i, img, svg');
      if (hasIcons && el.children.length > 0) {
        // Find and update text nodes only
        var nodes = el.childNodes;
        var textUpdated = false;
        for (var j = 0; j < nodes.length; j++) {
          if (nodes[j].nodeType === Node.TEXT_NODE && nodes[j].textContent.trim()) {
            nodes[j].textContent = ' ' + val + ' ';
            textUpdated = true;
            break;
          }
        }
        if (!textUpdated) {
          // Prepend text before first child
          el.insertBefore(document.createTextNode(val + ' '), el.firstChild);
        }
      } else {
        el.textContent = val;
      }
    }

    // innerHTML translations (for elements with mixed HTML content)
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var i = 0; i < htmlEls.length; i++) {
      var key = htmlEls[i].getAttribute('data-i18n-html');
      var val = getTranslation(lang, key);
      if (val !== null) htmlEls[i].innerHTML = val;
    }

    // Placeholders
    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var i = 0; i < phEls.length; i++) {
      var key = phEls[i].getAttribute('data-i18n-placeholder');
      var val = getTranslation(lang, key);
      if (val !== null) phEls[i].placeholder = val;
    }

    // Aria labels
    var ariaEls = document.querySelectorAll('[data-i18n-aria]');
    for (var i = 0; i < ariaEls.length; i++) {
      var key = ariaEls[i].getAttribute('data-i18n-aria');
      var val = getTranslation(lang, key);
      if (val !== null) ariaEls[i].setAttribute('aria-label', val);
    }

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update the language toggle display
    var currentLangSpan = document.getElementById('current-lang');
    if (currentLangSpan) {
      currentLangSpan.textContent = lang.toUpperCase();
    }

    // Mark active language in dropdown
    var options = document.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('data-lang') === lang) {
        options[i].classList.add('active');
      } else {
        options[i].classList.remove('active');
      }
    }
  }

  /** Set and apply language */
  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(lang);
    // Re-render auth nav if available (since auth.js creates elements dynamically)
    if (typeof YakaAuth !== 'undefined' && typeof YakaAuth.updateNavbar === 'function') {
      YakaAuth.updateNavbar();
    }
  }

  /** Initialize dropdown behaviour */
  function initDropdown() {
    var toggle = document.getElementById('lang-toggle');
    var dropdown = document.getElementById('lang-dropdown');
    if (!toggle || !dropdown) return;

    // Remove old listeners by cloning
    var newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    // Toggle dropdown on click
    newToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var isOpen = dropdown.classList.contains('open');
      // Close all other dropdowns first
      document.querySelectorAll('.lang-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
      if (!isOpen) {
        dropdown.classList.add('open');
      }
    });

    // Language option clicks
    var options = dropdown.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var lang = this.getAttribute('data-lang');
        setLanguage(lang);
        dropdown.classList.remove('open');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.lang-selector')) {
        dropdown.classList.remove('open');
      }
    });
  }

  // Expose for external use
  window.YakaLang = {
    get: getCurrentLang,
    set: setLanguage,
    apply: applyTranslations,
    init: function() {
      initDropdown();
      applyTranslations(getCurrentLang());
    }
  };

  // Initialize on DOM ready
  function init() {
    initDropdown();
    var lang = getCurrentLang();
    if (lang !== DEFAULT_LANG) {
      applyTranslations(lang);
    }
    // Update current-lang display regardless
    var span = document.getElementById('current-lang');
    if (span) span.textContent = lang.toUpperCase();
    // Mark active option
    var options = document.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('data-lang') === lang) {
        options[i].classList.add('active');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
