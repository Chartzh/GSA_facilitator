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
  const resParsed = parseProfileHtml(html, 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e');
  const { SKILL_BADGES } = await import('../api/_program.js');
  const sylSet = new Set(SKILL_BADGES.map(b => b.name.toLowerCase().trim()));

  console.log('--- ALL VALID EXTRA BADGES SCRAPED ---');
  resParsed.validExtraBadges.forEach((b, i) => {
    const isOverlap = sylSet.has(b.name.toLowerCase().trim());
    console.log(`${i+1}. "${b.name}" ${isOverlap ? '[IS SYLLABUS]' : ''}`);
  });
}

test().catch(console.error);
