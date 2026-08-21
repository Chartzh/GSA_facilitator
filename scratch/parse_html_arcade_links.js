import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('Tutorial Lab - Google Cloud Arcade X Dicoding.html', 'utf8');
const $ = cheerio.load(html);

console.log('HTML loaded successfully. Extracting lab YouTube links...');

const labYoutubeMap = new Map();

$('a[href*="youtube.com"], a[href*="youtu.be"]').each((i, el) => {
  const href = $(el).attr('href');
  const text = $(el).text().trim() || $(el).closest('tr, li, div').text().trim();
  
  // Extract video ID or embed URL
  let embedUrl = '';
  if (href.includes('embed/')) {
    embedUrl = href;
  } else if (href.includes('v=')) {
    const v = new URLSearchParams(href.split('?')[1]).get('v');
    if (v) embedUrl = `https://www.youtube.com/embed/${v}`;
  } else if (href.includes('youtu.be/')) {
    const v = href.split('youtu.be/')[1].split('?')[0];
    if (v) embedUrl = `https://www.youtube.com/embed/${v}`;
  }

  if (embedUrl) {
    // Find parent element text or preceding heading
    const parentText = $(el).closest('tr, div.accordion-item, div.card, li').text().replace(/\s+/g, ' ').trim();
    labYoutubeMap.set(href, { href, embedUrl, parentText: parentText.slice(0, 100) });
  }
});

console.log(`Extracted ${labYoutubeMap.size} YouTube video links from HTML.`);

// Print sample extracted links
let count = 0;
for (const [k, v] of labYoutubeMap.entries()) {
  if (count < 20) {
    console.log(`${count + 1}. [${v.embedUrl}] -> ${v.parentText}`);
    count++;
  }
}
