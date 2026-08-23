import fs from 'fs';
import { load } from 'cheerio';
import { CATALOG_93_BADGES } from '../api/_scrape.js';

async function main() {
  const url = 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f'; // Wildan Alghifari
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await res.text();
  const $ = load(html);

  const normNoSpace = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const catalogSet = new Set();
  CATALOG_93_BADGES.forEach(cat => {
    catalogSet.add(normNoSpace(cat.title));
    if (cat.aliases) {
      cat.aliases.forEach(a => catalogSet.add(normNoSpace(a)));
    }
  });

  console.log(`Catalog normalized titles total: ${catalogSet.size}`);

  const profileBadges = [];
  $('.public-profile-badge, .profile-badge, .badge-card').each((i, el) => {
    const titleEl = $(el).find('span, h2, h3, h4, .badge-title, .title').first();
    const title = titleEl.text().trim();
    if (title) {
      profileBadges.push(title);
    }
  });

  console.log(`Wildan profile has ${profileBadges.length} badge cards in HTML.`);

  const unmatchedInCatalog = [];
  const matchedInCatalog = [];

  profileBadges.forEach(b => {
    const key = normNoSpace(b);
    if (catalogSet.has(key)) {
      matchedInCatalog.push(b);
    } else {
      unmatchedInCatalog.push(b);
    }
  });

  console.log(`Matched in catalog: ${matchedInCatalog.length}`);
  console.log(`Unmatched in catalog: ${unmatchedInCatalog.length}`);

  console.log('\n--- UNMATCHED BADGES IN WILDAN PROFILE ---');
  unmatchedInCatalog.forEach((b, i) => console.log(`${i+1}. ${b}`));
}

main().catch(console.error);
