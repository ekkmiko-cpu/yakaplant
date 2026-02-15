/* Generates static, indexable care pages for each plant in plant_data.js.
 * Output:
 * - bakim/index.html
 * - bakim/<plant.id>.html
 *
 * These pages reuse the existing site CSS so the UI stays consistent.
 */

const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://www.yakaplant.com';
const OUT_DIR = path.join(process.cwd(), 'bakim');

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(html) {
  return String(html ?? '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function jsonForScriptTag(obj) {
  // Avoid accidentally closing the script tag.
  return JSON.stringify(obj).replace(/<\/script/gi, '<\\/script');
}

function buildMetaDescription(plant) {
  const bits = [];
  if (plant.water) bits.push(`Sulama: ${plant.water}`);
  if (plant.env) bits.push(`Işık: ${plant.env}`);
  if (plant.temp) bits.push(`Sıcaklık: ${plant.temp}`);
  const prefix = `${plant.title}${plant.scientific ? ` (${plant.scientific})` : ''} bakımı:`;
  const desc = `${prefix} ${bits.join(' | ')}.`;
  // Keep it roughly under ~160 chars.
  return desc.length > 165 ? desc.slice(0, 162).trimEnd() + '…' : desc;
}

function yesNo(val) {
  if (val === true) return 'Evet';
  if (val === false) return 'Hayır';
  return '-';
}

function pageTemplate(plant) {
  const title = `${plant.title} Bakımı | Yakaplant`;
  const canonicalPath = `/bakim/${plant.id}`;
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
  const metaDesc = buildMetaDescription(plant);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${plant.title} Bakımı`,
    description: metaDesc,
    mainEntityOfPage: canonicalUrl,
    about: {
      '@type': 'Thing',
      name: plant.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yakaplant',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/apple-touch-icon.png`,
        width: 180,
        height: 180,
      },
    },
  };

  // Note: plant.desc already contains HTML paragraphs; we reuse it as-is.
  const safeTitle = escapeHtml(plant.title);
  const safeScientific = escapeHtml(plant.scientific || '');
  const safeMetaDesc = escapeHtml(metaDesc);

  const jsonLdStr = jsonForScriptTag(jsonLd);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${safeMetaDesc}">
  <link rel="canonical" href="${canonicalUrl}" />

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/style.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <script type="application/ld+json">${jsonLdStr}</script>
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <a href="/" class="logo">Yaka<span class="highlight">plant</span><span class="dot">.</span></a>
      <ul class="nav-links" id="nav-links">
        <li><a href="/" class="nav-link">Ana Sayfa</a></li>
        <li><a href="/about" class="nav-link">Hakkımızda</a></li>
        <li><a href="/care" class="nav-link">Bakım Rehberi</a></li>
        <li><a href="/shop" class="nav-link">Koleksiyon</a></li>
        <li><a href="/contact" class="nav-link button-primary">İletişim</a></li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Karanlık Mod">
          <i class="ph ph-moon"></i>
        </button>
        <button class="mobile-toggle" aria-label="Menüyü Aç" id="mobile-toggle">
          <i class="ph ph-list"></i>
        </button>
      </div>
    </div>
  </nav>

  <div style="margin-top: 110px;"></div>

  <section class="section shop-section">
    <div class="container">
      <div class="section-header">
        <h1 class="section-title">${safeTitle} Bakımı</h1>
        ${plant.scientific ? `<p class="section-subtitle" style="font-style: italic;">${safeScientific}</p>` : ''}
      </div>

      <div class="grid-gallery" style="grid-template-columns: 1fr; max-width: 980px; margin: 0 auto;">
        <article class="product-card" style="overflow: visible;">
          <div class="product-image" style="height: 420px;">
            <img src="/${escapeHtml(plant.image || '')}" alt="${safeTitle}" style="width: 100%; height: 100%; object-fit: contain; padding: 1rem;">
          </div>
          <div class="product-info">
            <h2 style="margin-bottom: 0.35rem;">Bakım Özeti</h2>
            <div class="product-meta" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin: 1rem 0 0.75rem 0;">
              <span><strong>Sulama:</strong> ${escapeHtml(plant.water || '-')}</span>
              <span><strong>Işık:</strong> ${escapeHtml(plant.env || '-')}</span>
              <span><strong>Sıcaklık:</strong> ${escapeHtml(plant.temp || '-')}</span>
              <span><strong>Nem:</strong> ${escapeHtml(plant.humidity || '-')}</span>
              <span><strong>Zorluk:</strong> ${escapeHtml(plant.difficulty || '-')}</span>
              <span><strong>Evcil Dostu:</strong> ${yesNo(plant.petFriendly)}</span>
            </div>

            <div class="care-rich-content">
              ${plant.desc || ''}
            </div>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem;">
              <a href="/shop" class="btn btn-secondary">Koleksiyona Dön</a>
              <a href="/contact" class="btn btn-primary">Fiyat/Sipariş İçin İletişim</a>
            </div>
          </div>
        </article>
      </div>

      <p style="max-width: 980px; margin: 1.25rem auto 0 auto; color: var(--text-muted); font-size: 0.95rem;">
        Tüm bakım rehberleri için <a href="/bakim" style="color: var(--primary); text-decoration: none; font-weight: 600;">bakım listesine</a> göz atın.
      </p>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <a href="/" class="logo">Yaka<span class="highlight">plant</span><span class="dot">.</span></a>
          <p>© 2024 Tüm hakları saklıdır.</p>
        </div>
        <div class="social-links">
          <a href="https://www.instagram.com/yakaplant" target="_blank" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://wa.me/905318433309" target="_blank" aria-label="WhatsApp"><i class="ph ph-whatsapp-logo"></i></a>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/js/supabase.js"></script>
  <script src="/js/ui.js"></script>
  <script src="/js/auth.js"></script>
  <script src="/script.js"></script>
</body>
</html>
`;
}

function indexTemplate(plants) {
  const title = 'Bitki Bakım Rehberleri | Yakaplant';
  const canonicalUrl = `${SITE_ORIGIN}/bakim`;
  const metaDesc = 'Yakaplant bitki bakım rehberleri: sulama, ışık, sıcaklık ve pratik ipuçları.';

  const items = plants
    .slice()
    .sort((a, b) => String(a.title).localeCompare(String(b.title), 'tr'))
    .map(p => {
      const href = `/bakim/${p.id}`;
      const label = `${p.title}${p.scientific ? ` (${p.scientific})` : ''}`;
      return `<li style="margin: 0.2rem 0;"><a href="${href}" style="color: inherit; text-decoration: none;"><strong>${escapeHtml(label)}</strong></a></li>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <a href="/" class="logo">Yaka<span class="highlight">plant</span><span class="dot">.</span></a>
      <ul class="nav-links" id="nav-links">
        <li><a href="/" class="nav-link">Ana Sayfa</a></li>
        <li><a href="/about" class="nav-link">Hakkımızda</a></li>
        <li><a href="/care" class="nav-link">Bakım Rehberi</a></li>
        <li><a href="/shop" class="nav-link">Koleksiyon</a></li>
        <li><a href="/contact" class="nav-link button-primary">İletişim</a></li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Karanlık Mod">
          <i class="ph ph-moon"></i>
        </button>
        <button class="mobile-toggle" aria-label="Menüyü Aç" id="mobile-toggle">
          <i class="ph ph-list"></i>
        </button>
      </div>
    </div>
  </nav>

  <div style="margin-top: 110px;"></div>

  <section class="section shop-section">
    <div class="container">
      <div class="section-header">
        <h1 class="section-title">Bitki Bakım Rehberleri</h1>
        <p class="section-subtitle">Bitkiler için sulama, ışık ve genel bakım ipuçları.</p>
      </div>

      <div class="product-card" style="max-width: 980px; margin: 0 auto;">
        <div class="product-info">
          <ul style="list-style: none; padding-left: 0; columns: 2; column-gap: 2rem;">
            ${items}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <a href="/" class="logo">Yaka<span class="highlight">plant</span><span class="dot">.</span></a>
          <p>© 2024 Tüm hakları saklıdır.</p>
        </div>
        <div class="social-links">
          <a href="https://www.instagram.com/yakaplant" target="_blank" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://wa.me/905318433309" target="_blank" aria-label="WhatsApp"><i class="ph ph-whatsapp-logo"></i></a>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/js/supabase.js"></script>
  <script src="/js/ui.js"></script>
  <script src="/js/auth.js"></script>
  <script src="/script.js"></script>
</body>
</html>
`;
}

function main() {
  const code = fs.readFileSync(path.join(process.cwd(), 'plant_data.js'), 'utf8');
  const plants = new Function(code + '; return plantCatalog;')();
  if (!Array.isArray(plants) || plants.length === 0) {
    throw new Error('plantCatalog not found or empty');
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Individual pages
  for (const p of plants) {
    if (!p || !p.id) continue;
    const html = pageTemplate(p);
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}.html`), html, 'utf8');
  }

  // Index page
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexTemplate(plants), 'utf8');

  console.log(`Generated ${plants.length} pages in ${OUT_DIR}`);
}

main();
