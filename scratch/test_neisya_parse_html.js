import fetch from 'node-fetch';
import { parseProfileHtml } from '../src/utils/scraper.ts';

async function testScraperOnNeisya() {
  const url = 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const parsed = parseProfileHtml(html, url);

  console.log('=== VALID GAMES MATCHED (' + parsed.validGames.length + ') ===');
  parsed.validGames.forEach(g => console.log(`- [ID: ${g.id}] Month: ${g.month} | Name: ${g.name} | Earned: ${g.earnedDate}`));

  console.log('\n=== CHECK IF GAME 7443 IS IN EXCLUDED ITEMS ===');
  const septExcluded = parsed.excludedItems.filter(e => e.title.toLowerCase().includes('data engineering') || e.title.toLowerCase().includes('7443'));
  console.log('Sept Excluded Count:', septExcluded.length);
  septExcluded.forEach(e => console.log(`- ${e.title} | Reason: ${e.reason} | Date: ${e.date}`));
}

testScraperOnNeisya().catch(console.error);
