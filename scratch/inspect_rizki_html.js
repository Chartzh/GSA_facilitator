import { load } from 'cheerio';

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
  const $ = load(html);

  console.log('--- ALL BADGES IN RIZKI FAIS PROFILE HTML ---');
  let totalBadgesFound = 0;
  $('.public-profile-badge, .profile-badge, .badge-card, div:has(> .badge-title), .badge').each((i, el) => {
    const text = $(el).text().trim();
    if (text) {
      // console.log(`${i+1}. ${text.replace(/\s+/g, ' ').slice(0, 80)}`);
      totalBadgesFound++;
    }
  });

  console.log('Raw DOM badge elements found:', totalBadgesFound);

  // Let's print all badge titles inside span/h2/h3/h4/a/p
  const titles = [];
  $('span, h2, h3, h4, div, a').each((i, el) => {
    const classAttr = $(el).attr('class') || '';
    if (classAttr.includes('title') || classAttr.includes('badge') || classAttr.includes('name')) {
      const t = $(el).text().trim();
      if (t && t.length > 5 && t.length < 120 && !titles.includes(t)) {
        titles.push(t);
      }
    }
  });

  console.log(`Found ${titles.length} unique title candidates:`);
  titles.slice(0, 20).forEach((t, i) => console.log(`${i+1}. ${t}`));
}

main().catch(console.error);
