import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('Tutorial Lab - Google Cloud Arcade X Dicoding.html', 'utf8');
const $ = cheerio.load(html);

console.log('Script tag count:', $('script').length);

$('script').each((i, el) => {
  const text = $(el).html() || '';
  if (text.includes('youtube') || text.includes('embed') || text.includes('videoUrl') || text.includes('play') || text.includes('JULY_ARCADE_GAMES') || text.includes('AUGUST_ARCADE_GAMES')) {
    console.log(`--- SCRIPT TAG ${i+1} (${text.length} chars) ---`);
    console.log(text.slice(0, 500));
    fs.writeFileSync(`scratch/script_${i+1}.js`, text, 'utf8');
  }
});
