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

async function testProfile(url, nameLabel) {
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const parsed = parseProfileHtml(html, url);

  console.log(`\n=== SINKRONISASI TEST FOR ${nameLabel} (${url.split('/').pop()}) ===`);
  console.log('Profile Name:', parsed.profileName);
  console.log('Valid Games Count:', parsed.validGames.length);
  console.log('Valid Syllabus Badges Count:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Badges Count:', parsed.validExtraBadges.length);
  console.log('Total Skill Badges (capped at 93):', Math.min(93, parsed.validSyllabusBadges.length + parsed.validExtraBadges.length));
  console.log('Points from Skill Badges (93 * 0.5):', parsed.pointsFromSkillBadges);
  console.log('Base Points:', parsed.basePoints);
  console.log('Milestone Bonus:', parsed.milestoneBonus);
  console.log('Total Points:', parsed.totalPointsWithBonus);
}

async function run() {
  await testProfile('https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', 'NEISYA SYAFINA');
  await testProfile('https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', 'WILDHAN');
}

run().catch(console.error);
