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
  const parsed = parseProfileHtml(html, 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e');

  const earnedSyllabus = parsed.validSyllabusBadges.map(b => b.name);
  const earnedExtra = parsed.validExtraBadges.map(b => b.name);
  const allEarned = [...earnedSyllabus, ...earnedExtra];

  console.log('Valid Syllabus Badges Scraped:', earnedSyllabus.length);
  console.log('Valid Extra Badges Scraped:', earnedExtra.length);
  console.log('Total Scraped Badges:', allEarned.length);

  // Read CATALOG_SKILL_BADGES from src/config/catalogData.ts
  const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
  const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
  const section = catText.slice(startIdx);

  const nameMatches = [...section.matchAll(/"name":\s*"([^"]+)"/g)];
  const catalog93Names = [];
  for (const m of nameMatches) {
    if (!catalog93Names.includes(m[1])) {
      catalog93Names.push(m[1]);
    }
  }

  console.log('Extracted CATALOG_SKILL_BADGES Names Count:', catalog93Names.length);

  const normalize = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const earnedNorms = allEarned.map(n => ({ original: n, norm: normalize(n) }));

  const matched = [];
  const missing = [];

  catalog93Names.forEach((catName, idx) => {
    const catNorm = normalize(catName);
    let found = earnedNorms.find(e => e.norm === catNorm);
    if (!found) {
      found = earnedNorms.find(e => e.norm.includes(catNorm) || catNorm.includes(e.norm));
    }
    if (!found && catNorm.length > 12) {
      found = earnedNorms.find(e => e.norm.slice(0, 15) === catNorm.slice(0, 15));
    }

    if (found) {
      matched.push({ idx: idx + 1, catName, earnedName: found.original });
    } else {
      missing.push({ idx: idx + 1, catName });
    }
  });

  console.log(`\n=== MATCHED CATALOG BADGES (${matched.length} / ${catalog93Names.length}) ===`);
  console.log(`\n=== MISSING CATALOG BADGES (${missing.length}) ===`);
  missing.forEach(m => console.log(`${m.idx}. "${m.catName}"`));
}

test().catch(console.error);
