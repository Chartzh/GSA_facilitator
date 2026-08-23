import fs from 'fs';
import { parseProfileHtml } from '../api/_scrape.js';

async function main() {
  const url = 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f'; // Wildan Alghifari
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await res.text();
  const parsed = parseProfileHtml(html, url);

  console.log('--- INSPECTING WILDAN PARSED RESULTS ---');
  console.log('Valid Syllabus Badges:', parsed.validSyllabusBadges.length);
  console.log('Valid Extra Badges:', parsed.validExtraBadges.length);
  console.log('Excluded Items:', parsed.excludedItems.length);
  console.log('Excluded Items list:');
  parsed.excludedItems.forEach((ex, idx) => console.log(`${idx+1}. [${ex.reason}] ${ex.title} (Date: ${ex.date})`));
}

main().catch(console.error);
