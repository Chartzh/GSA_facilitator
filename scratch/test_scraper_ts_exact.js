import { parseProfileHtml } from '../api/_scrape.js';

async function testProfile(name, url) {
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await res.text();
  const parsed = parseProfileHtml(html, url);

  console.log(`👤 ${name}`);
  console.log(`   Games Count   : ${parsed.validGames.length}`);
  console.log(`   Catalog Badges: ${parsed.totalSkillBadgesCount}`);
  console.log(`   Total Points  : ${parsed.totalPointsWithBonus}\n`);
}

async function main() {
  console.log('=== SCRAPER ENGINE ACCURACY CHECK ===\n');
  await testProfile('Wildan Alghifari', 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f');
  await testProfile('Rizki Fais Mubarok', 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4');
  await testProfile('Jooe Pella', 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981');
  await testProfile('Neisya Syafina', 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e');
}

main().catch(console.error);
