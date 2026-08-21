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

  const sylSet = new Set(parsed.validSyllabusBadges.map(b => b.name.toLowerCase().trim()));
  
  console.log('Syllabus Badges Count:', parsed.validSyllabusBadges.length);
  console.log('Extra Badges Count:', parsed.validExtraBadges.length);

  console.log('\n--- EXTRA BADGES LIST ---');
  parsed.validExtraBadges.forEach((ex, i) => {
    const isOverlap = sylSet.has(ex.name.toLowerCase().trim());
    console.log(`${i+1}. ${ex.name} ${isOverlap ? '[OVERLAPS SYLLABUS]' : ''}`);
  });
}

test().catch(console.error);
