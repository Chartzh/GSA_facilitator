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

  const { parseProfileHtml } = await import('./api/_scrape.js');
  const parsed = parseProfileHtml(html, 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e');

  const rawBadges = [];
  parsed.validSyllabusBadges.forEach(b => rawBadges.push({ name: b.name, date: b.earnedDate }));
  parsed.validExtraBadges.forEach(b => rawBadges.push({ name: b.name, date: b.earnedDate }));

  console.log('Total Scraped Valid Badges on Neisya Profile:', rawBadges.length);

  // Read catalogData.ts text and parse CATALOG_SKILL_BADGES names
  const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
  
  // Extract block starting from export const CATALOG_SKILL_BADGES
  const skillBadgesMatch = catText.match(/export const CATALOG_SKILL_BADGES: CatalogSkillBadge\[\] = (\[[\s\S]*?\])\n\nexport/);
  
  let catalogNames = [];
  if (skillBadgesMatch) {
    const block = skillBadgesMatch[1];
    const nameMatches = block.matchAll(/"name":\s*"([^"]+)"/g);
    for (const m of nameMatches) {
      catalogNames.push(m[1]);
    }
  }

  console.log('Total Catalog Skill Badges extracted:', catalogNames.length);

  const normalize = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const profileNorms = rawBadges.map(b => ({ original: b.name, norm: normalize(b.name) }));

  const matched = [];
  const missing = [];

  catalogNames.forEach((catName, idx) => {
    const catNorm = normalize(catName);
    const found = profileNorms.find(p => {
      if (p.norm === catNorm) return true;
      if (p.norm.includes(catNorm) || catNorm.includes(p.norm)) return true;
      if (catNorm.length > 12 && p.norm.slice(0, 15) === catNorm.slice(0, 15)) return true;
      return false;
    });

    if (found) {
      matched.push({ idx: idx + 1, catName, profileName: found.original });
    } else {
      missing.push({ idx: idx + 1, catName });
    }
  });

  console.log(`\n=== MATCHED CATALOG BADGES (${matched.length} / ${catalogNames.length}) ===`);
  console.log(`\n=== MISSING CATALOG BADGES (${missing.length}) ===`);
  missing.forEach(m => console.log(`${m.idx}. ${m.catName}`));

  // Check extra badges in profile that are NOT in catalog
  const catalogNormsSet = new Set(catalogNames.map(c => normalize(c)));
  const extraNotCatalog = profileNorms.filter(p => {
    for (const cn of catalogNormsSet) {
      if (p.norm === cn || p.norm.includes(cn) || cn.includes(p.norm)) return false;
    }
    return true;
  });
  console.log(`\n=== PROFILE BADGES NOT IN CATALOG (${extraNotCatalog.length}) ===`);
  extraNotCatalog.forEach((e, i) => console.log(`${i+1}. ${e.original}`));
}

test().catch(console.error);
