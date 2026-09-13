import fetch from 'node-fetch';
import { parseProfileHtml } from '../api/_scrape.js';

async function checkGustiBadges() {
  const url = 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const parsed = parseProfileHtml(html, url);

  console.log('=== GUSTI SCRAPE RESULT ===');
  console.log('Valid Games Count:', parsed.validGames.length);
  console.log('Valid Syllabus Badges:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Badges:', parsed.validExtraBadges.length);
  console.log('Total Skill Badges:', parsed.validSyllabusBadges.length + parsed.validExtraBadges.length);

  console.log('\n=== EXCLUDED BADGES FOR GUSTI ===');
  parsed.excludedItems.forEach(e => {
    console.log(`- ${e.title} (${e.dateStr}) | Reason: ${e.reason}`);
  });
}

checkGustiBadges().catch(console.error);
