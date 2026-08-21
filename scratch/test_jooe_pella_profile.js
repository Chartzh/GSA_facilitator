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
  const url = 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981';
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const parsed = parseProfileHtml(html, url);

  console.log('=== TEST JOOE PELLA PROFILE ===');
  console.log('Profile Name:', parsed.profileName);
  console.log('Valid Games:', parsed.validGames.length);
  console.log('Valid Syllabus Badges:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Badges:', parsed.validExtraBadges.length);
  console.log('Total Skill Badges Count:', parsed.totalSkillBadgesCount);
  console.log('Points from Skill Badges:', parsed.pointsFromSkillBadges);
  console.log('Base Points:', parsed.basePoints);
}

test().catch(console.error);
