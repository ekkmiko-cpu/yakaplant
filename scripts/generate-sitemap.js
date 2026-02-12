/* Regenerates sitemap.xml to include care pages under /bakim/.
 *
 * Run:
 *   node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://www.yakaplant.com';
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

function loadPlants() {
  const code = fs.readFileSync(path.join(process.cwd(), 'plant_data.js'), 'utf8');
  const plants = new Function(code + '; return plantCatalog;')();
  if (!Array.isArray(plants)) throw new Error('plantCatalog not found');
  return plants;
}

function url(loc, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const plants = loadPlants();

  const entries = [];

  // Core pages
  entries.push(url(`${SITE_ORIGIN}/`, 'weekly', '1.0'));
  entries.push(url(`${SITE_ORIGIN}/shop.html`, 'weekly', '0.9'));
  entries.push(url(`${SITE_ORIGIN}/care.html`, 'monthly', '0.8'));
  entries.push(url(`${SITE_ORIGIN}/bakim/index.html`, 'weekly', '0.8'));
  entries.push(url(`${SITE_ORIGIN}/about.html`, 'monthly', '0.7'));
  entries.push(url(`${SITE_ORIGIN}/contact.html`, 'monthly', '0.7'));
  entries.push(url(`${SITE_ORIGIN}/privacy.html`, 'yearly', '0.4'));
  entries.push(url(`${SITE_ORIGIN}/terms.html`, 'yearly', '0.4'));

  // Plant care pages
  for (const p of plants) {
    if (!p || !p.id) continue;
    entries.push(url(`${SITE_ORIGIN}/bakim/${p.id}.html`, 'monthly', '0.6'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join('\n') +
    `\n</urlset>\n`;

  fs.writeFileSync(path.join(process.cwd(), 'sitemap.xml'), xml, 'utf8');
  console.log(`Wrote sitemap.xml with ${entries.length} URLs (${plants.length} plant pages)`);
}

main();

