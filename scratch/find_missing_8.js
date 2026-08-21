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

  const earnedNames = [
    ...parsed.validSyllabusBadges.map(b => b.name),
    ...parsed.validExtraBadges.map(b => b.name)
  ];

  console.log('Total Scraped Valid Badges:', earnedNames.length);

  // Read CATALOG_SKILL_BADGES from src/config/catalogData.ts
  const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
  const matches = [...catText.matchAll(/"name":\s*"([^"]+)"/g)];
  const catalogNames = [];
  for (const m of matches) {
    if (!m[1].startsWith('http') && !m[1].startsWith('game-') && !catalogNames.includes(m[1])) {
      catalogNames.push(m[1]);
    }
  }

  console.log('Catalog Badges Count:', catalogNames.length);

  const normalize = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const earnedNorms = earnedNames.map(n => ({ original: n, norm: normalize(n) }));

  const matched = [];
  const missing = [];

  catalogNames.forEach((catName, idx) => {
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

  console.log(`\nMatched Catalog Count: ${matched.length} / ${catalogNames.length}`);
  console.log(`\nMissing Catalog Count: ${missing.length}`);
  console.log('\n--- LIST OF UNMATCHED CATALOG BADGES IN UI ---');
  missing.forEach(m => console.log(`${m.idx}. "${m.catName}"`));
}

test().catch(console.error);
