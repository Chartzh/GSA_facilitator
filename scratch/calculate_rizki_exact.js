import { parseProfileHtml } from '../api/_scrape.js';

async function main() {
  const url = 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4';
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await response.text();
  const parsed = parseProfileHtml(html, url);

  console.log('=== RIZKI FAIS MUBAROK DETAILED BREAKDOWN ===');
  console.log('Profile Name:', parsed.profileName);
  console.log('Valid Arcade Games Count:', parsed.validGames.length);
  console.log('Valid Syllabus Skill Badges:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Skill Badges:', parsed.validExtraBadges.length);
  const totalBadges = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;
  console.log('Total Skill Badges:', totalBadges);
  console.log('Points from Games:', parsed.validGames.length, 'PT');
  console.log('Points from Skill Badges:', totalBadges * 0.5, 'PT');
  console.log('Milestone Bonus:', parsed.milestoneBonus, 'PT');
  console.log('TOTAL POINTS WITH BONUS:', parsed.validGames.length + (totalBadges * 0.5) + parsed.milestoneBonus, 'PT');
}

main().catch(console.error);
