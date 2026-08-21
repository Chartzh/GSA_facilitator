import fs from 'fs';

const url = 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981';

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

async function test() {
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const parsed = parseProfileHtml(html, url);

  const normalize = (t) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const earnedSet = new Map();
  parsed.validSyllabusBadges.forEach(b => earnedSet.set(normalize(b.name), b.earnedDate || 'Selesai'));
  parsed.validExtraBadges.forEach(b => earnedSet.set(normalize(b.name), b.earnedDate || 'Selesai'));

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

  const missing = [];
  let doneCount = 0;
  catalog93Names.forEach((catName, idx) => {
    const normName = normalize(catName);
    let isDone = earnedSet.has(normName);

    if (!isDone) {
      for (const [key] of earnedSet.entries()) {
        if (key.includes(normName) || normName.includes(key) || (normName.length > 12 && key.slice(0, 15) === normName.slice(0, 15))) {
          isDone = true;
          break;
        }
      }
    }

    if (!isDone) {
      const catKey = catName.toLowerCase().trim();
      const aliasList = aliases.get(catKey) || [];
      for (const al of aliasList) {
        const alNorm = normalize(al);
        isDone = earnedSet.has(alNorm);
        if (!isDone) {
          for (const [key] of earnedSet.entries()) {
            if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
              isDone = true;
              break;
            }
          }
        }
        if (isDone) break;
      }
    }

    if (isDone) {
      doneCount++;
    } else {
      missing.push({ idx: idx + 1, catName });
    }
  });

  console.log('--- LABCHECKLIST UI CHECKLIST MATCHING FOR JOOE PELLA ---');
  console.log(`Done Count in UI Checklist: ${doneCount} / 93`);
  console.log('Missing items in UI Checklist:', missing);
}

test().catch(console.error);
