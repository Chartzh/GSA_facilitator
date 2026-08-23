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

  const earnedMap = new Map();
  $('.public-profile-badge, .profile-badge, .badge-card').each((i, el) => {
    const titleEl = $(el).find('span, h2, h3, h4, .badge-title, .title').first();
    const title = titleEl.text().trim();
    if (title) {
      earnedMap.set(normNoSpace(title), title);
    }
  });

  const catalogAliases = new Map([
    ["get started with sensitive data protection", ["implement sensitive data protection on google cloud", "discover and protect sensitive data across your ecosystem"]],
    ["discover and protect sensitive data across your ecosystem", ["get started with sensitive data protection", "implement sensitive data protection on google cloud"]],
    ["get started with app development using gemini code assist", ["kickstarting application development with gemini code assist"]],
    ["build useful ai applications with gemini and imagen", ["build real world ai applications with gemini and imagen"]],
    ["organize and manage data with dataplex", ["claim skill badge: organize and manage data with dataplex", "organize and govern data with knowledge catalog", "build a data mesh with knowledge catalog"]],
    ["build a data mesh with knowledge catalog", ["organize and manage data with dataplex", "organize and govern data with knowledge catalog"]],
    ["use apis to manage cloud storage", ["use apis to work with cloud storage"]],
    ["connect cloud networks with ncc", ["connecting cloud networks with ncc"]],
    ["get started with api gateway", ["deploy and secure serverless apis with api gateway"]],
    ["using functions, formulas, and charts in google sheets", ["use functions, formulas, and charts in google sheets"]],
    ["implement cloud security fundamentals in google cloud", ["implement cloud security fundamentals on google cloud"]],
    ["develop serverless apps on cloud run", ["develop serverless applications on cloud run"]],
    ["implement ci/cd pipelines in google cloud", ["implement ci/cd pipelines on google cloud"]],
    ["build infrastructure with terraform in google cloud", ["build infrastructure with terraform on google cloud"]]
  ]);

  console.log(`--- DEBUGGING CATALOG MATCHES FOR WILDAN (${CATALOG_93_BADGES.length} CATALOG BADGES) ---`);
  let matchedCount = 0;
  const missingCatalogBadges = [];

  CATALOG_93_BADGES.forEach((catName, idx) => {
    const cNorm = normNoSpace(catName);
    let found = earnedMap.has(cNorm);
    let matchedTitle = earnedMap.get(cNorm);

    if (!found) {
      for (const [key, rawTitle] of earnedMap.entries()) {
        if (key.includes(cNorm) || cNorm.includes(key) || (cNorm.length > 12 && key.slice(0, 15) === cNorm.slice(0, 15))) {
          found = true;
          matchedTitle = rawTitle;
          break;
        }
      }
    }

    if (!found) {
      const catKey = catName.toLowerCase().trim();
      const aliasList = catalogAliases.get(catKey) || [];
      for (const al of aliasList) {
        const alNorm = normNoSpace(al);
        found = earnedMap.has(alNorm);
        if (!found) {
          for (const [key, rawTitle] of earnedMap.entries()) {
            if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
              found = true;
              matchedTitle = rawTitle;
              break;
            }
          }
        }
        if (found) break;
      }
    }

    if (found) {
      matchedCount++;
    } else {
      missingCatalogBadges.push(catName);
    }
  });

  console.log(`Matched Catalog Badges: ${matchedCount} / 93`);
  console.log(`Missing Catalog Badges (${missingCatalogBadges.length}):`);
  missingCatalogBadges.forEach((m, i) => console.log(`${i+1}. ${m}`));
}

main().catch(console.error);
