import fs from 'fs';

if (fs.existsSync('.env.local')) {
  const envText = fs.readFileSync('.env.local', 'utf8');
  envText.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

async function test() {
  const res = await fetch('https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const scrapedData = parseProfileHtml(html, 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e');

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

  const normalize = (t) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const earnedMap = new Set();
  scrapedData.validSyllabusBadges.forEach(b => earnedMap.add(normalize(b.name)));
  scrapedData.validExtraBadges.forEach(b => earnedMap.add(normalize(b.name)));

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

  let doneCount = 0;
  const missingInUI = [];

  catalog93Names.forEach((catName, idx) => {
    const normName = normalize(catName);
    let isDone = earnedMap.has(normName);
    if (!isDone) {
      for (const key of earnedMap) {
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
        if (earnedMap.has(alNorm)) {
          isDone = true;
          break;
        }
        for (const key of earnedMap) {
          if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
            isDone = true;
            break;
          }
        }
        if (isDone) break;
      }
    }

    if (isDone) {
      doneCount++;
    } else {
      missingInUI.push({ idx: idx + 1, catName });
    }
  });

  console.log(`=== UI CHECKLIST DONE COUNT FOR NEISYA: ${doneCount} / ${catalog93Names.length} ===`);
  if (missingInUI.length > 0) {
    console.log('Missing in UI checklist:', missingInUI);
  }
}

test().catch(console.error);
