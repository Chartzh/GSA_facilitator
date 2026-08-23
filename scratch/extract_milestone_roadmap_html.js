import fs from 'fs';
import { load } from 'cheerio';

async function main() {
  const filePath = '/run/media/jeep/506C0AC66C0AA6B6/UIN Jakarta/Project Gabut/Google Cloud Arcade Facitilitator/Arcade Tracker 2026 _ Google Cloud Skills Boost.html';
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);

  console.log('=== EXTRACTING MILESTONE ROADMAP HTML ===\n');
  
  $('div, section').each((i, el) => {
    const text = $(el).text();
    if (text.includes('MILESTONE ROADMAP') && $(el).find('h1, h2, h3, span, div').length > 5) {
      const parentHtml = $(el).html();
      if (parentHtml.length < 15000 && parentHtml.length > 500) {
        console.log('Found Roadmap Block (HTML snippet length:', parentHtml.length, '):');
        console.log(parentHtml.slice(0, 3000));
        console.log('\n-----------------------------------\n');
      }
    }
  });
}

main().catch(console.error);
