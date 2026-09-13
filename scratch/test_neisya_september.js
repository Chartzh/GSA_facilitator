import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function testNeisyaProfile() {
  const url = 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- ALL BADGES FOUND IN NEISYA PROFILE ---');
  $('.profile-badge').each((i, el) => {
    const title = $(el).find('.qm-title, h2, h3, .badge-title, span').text().trim();
    const dateText = $(el).find('.qm-date, .badge-date, p').text().trim();
    if (title.toLowerCase().includes('arcade') || title.toLowerCase().includes('trail') || title.toLowerCase().includes('data engineering') || title.toLowerCase().includes('september')) {
      console.log(`Badge ${i+1}: "${title}" | Date: "${dateText}"`);
    }
  });

  // Print all badges containing september or arcade
  console.log('\n--- SEARCH FOR SEPT / TRAIL IN WHOLE PAGE ---');
  $('body').find('*').each((i, el) => {
    const text = $(el).clone().children().remove().end().text().trim();
    if (text.toLowerCase().includes('arcade trail') || text.toLowerCase().includes('data engineering and security')) {
      console.log(`Found text: "${text}" in tag <${el.tagName}>`);
    }
  });
}

testNeisyaProfile().catch(console.error);
