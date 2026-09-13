import fetch from 'node-fetch';
import { parseProfileHtml } from '../api/_scrape.js';

async function testBackendScraper() {
  const url = 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const result = parseProfileHtml(html, url);

  console.log('--- BACKEND SCRAPE RESULT FOR NEISYA ---');
  console.log('Profile Name:', result.profileName);
  console.log('Total Games Count:', result.validGames.length);
  console.log('Total Skill Badges Count:', result.validSyllabusBadges.length + result.validExtraBadges.length);
  console.log('Total Points:', result.totalPoints);
  console.log('Milestone:', result.currentMilestone?.label);

  console.log('\n--- SEPTEMBER GAMES MATCHED ---');
  const septGames = result.validGames.filter(g => g.month === '2026-09');
  septGames.forEach(g => console.log(`- [ID ${g.id}] ${g.name} (${g.earnedDate})`));
}

testBackendScraper().catch(console.error);
