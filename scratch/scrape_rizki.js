import { parseProfileHtml } from '../api/_scrape.js';

async function main() {
  const url = 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4';
  console.log('Fetching live profile for Rizki Fais Mubarok:', url);
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await response.text();
  const parsed = parseProfileHtml(html, url);
  console.log('--- RIZKI FAIS MUBAROK LIVE SCRAPE RESULTS ---');
  console.log('Name:', parsed.profileName);
  console.log('Valid Games Count:', parsed.validGames.length);
  console.log('Valid Games List:', parsed.validGames.map(g => g.title));
  console.log('Valid Syllabus Badges:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Badges:', parsed.validExtraBadges.length);
  const totalBadges = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;
  console.log('Total Skill Badges Matched (out of 93 catalog):', totalBadges);
  console.log('Points from Games:', parsed.validGames.length);
  console.log('Points from Skill Badges:', totalBadges * 0.5);
  console.log('Base Points:', parsed.validGames.length + (totalBadges * 0.5));
  console.log('Milestone Bonus:', parsed.milestoneBonus);
  console.log('Total Points With Bonus:', parsed.totalPointsWithBonus);

  console.log('\n--- ALL MATCHED BADGES FOR RIZKI FAIS ---');
  const allMatched = [...parsed.validSyllabusBadges, ...parsed.validExtraBadges];
  allMatched.forEach((b, i) => console.log(`${i+1}. ${b.title}`));
}

main().catch(console.error);
