import fs from 'fs';

// 1. Read CATALOG_SKILL_BADGES from src/config/catalogData.ts
const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
const section = catText.slice(startIdx);

const catalog93Names = [];
const matches = section.matchAll(/"name":\s*"([^"]+)"/g);
for (const m of matches) {
  if (!catalog93Names.includes(m[1]) && !m[1].startsWith('http') && !m[1].startsWith('game-') && !m[1].startsWith('Lab ')) {
    catalog93Names.push(m[1]);
  }
}

console.log('Total Catalog 93 Badges:', catalog93Names.length);

const normalize = (t) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

const aliases = new Map([
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

async function verifyProfile(url, nameLabel) {
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const scraped = parseProfileHtml(html, url);

  const rawSkillBadges = [...scraped.validSyllabusBadges, ...scraped.validExtraBadges];
  const earnedSet = new Map();
  rawSkillBadges.forEach(b => earnedSet.set(normalize(b.name), b.earnedDate || 'Selesai'));

  let matchedCatalogCount = 0;
  const missingCatalogBadges = [];

  catalog93Names.forEach((catName, idx) => {
    const normName = normalize(catName);
    let earnedDate = earnedSet.get(normName);

    if (!earnedDate) {
      for (const [key, val] of earnedSet.entries()) {
        if (key.includes(normName) || normName.includes(key) || (normName.length > 12 && key.slice(0, 15) === normName.slice(0, 15))) {
          earnedDate = val;
          break;
        }
      }
    }

    if (!earnedDate) {
      const catKey = catName.toLowerCase().trim();
      const aliasList = aliases.get(catKey) || [];
      for (const al of aliasList) {
        const alNorm = normalize(al);
        earnedDate = earnedSet.get(alNorm);
        if (!earnedDate) {
          for (const [key, val] of earnedSet.entries()) {
            if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
              earnedDate = val;
              break;
            }
          }
        }
        if (earnedDate) break;
      }
    }

    if (earnedDate) {
      matchedCatalogCount++;
    } else {
      missingCatalogBadges.push({ idx: idx + 1, catName });
    }
  });

  console.log(`\n=== UNIFIED CATALOG MATCHING FOR ${nameLabel} ===`);
  console.log(`Matched Catalog Skill Badges: ${matchedCatalogCount} / 93`);
  console.log(`Skill Badge Points: ${(matchedCatalogCount * 0.5).toFixed(1)} PT`);
  console.log(`Valid Games: ${scraped.validGames.length}`);
  console.log(`Base Points: ${scraped.validGames.length * 1.0 + matchedCatalogCount * 0.5} PT`);
  if (missingCatalogBadges.length > 0) {
    console.log('Missing Catalog Badges:', missingCatalogBadges);
  }
}

async function run() {
  await verifyProfile('https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', 'NEISYA SYAFINA');
  await verifyProfile('https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', 'WILDHAN ALGHIFARI');
}

run().catch(console.error);
