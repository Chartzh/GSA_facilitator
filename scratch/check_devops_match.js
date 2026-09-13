import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { ARCADE_GAMES } from '../src/config/program.ts';

async function checkDevOpsMatch() {
  const url = 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const game7445 = ARCADE_GAMES.find(g => g.id === 7445);

  $('.profile-badge').each((i, el) => {
    const title = $(el).find('.qm-title, h2, h3, .badge-title, span').first().text().trim();
    const fullText = $(el).text().trim().replace(/\s+/g, ' ');
    const norm = fullText.toLowerCase();

    if (game7445.match(norm)) {
      console.log(`Badge index ${i}: Title="${title}" | FullText="${fullText}"`);
    }
  });
}

checkDevOpsMatch().catch(console.error);
