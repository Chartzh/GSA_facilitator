import fetch from 'node-fetch';
import { parseProfileHtml } from '../api/_scrape.js';

const targetProfiles = [
  { name: 'Gusti', url: 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132', expectedS: 93, expectedG: 18 },
  { name: 'Zaimah', url: 'https://www.skills.google/public_profiles/1e437336-1d43-4434-b227-6d8399ec700d', expectedS: 94, expectedG: 13 },
  { name: 'Rizki', url: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4', expectedS: 94, expectedG: 13 },
  { name: 'Wildan', url: 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', expectedS: 93, expectedG: 13 },
];

async function debugMissingBadges() {
  for (const p of targetProfiles) {
    console.log(`\n==================================================`);
    console.log(`DEBUGGING ${p.name.toUpperCase()} (Expected: ${p.expectedG}G / ${p.expectedS}S)`);
    console.log(`==================================================`);

    const res = await fetch(p.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const parsed = parseProfileHtml(html, p.url);

    const actualS = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;
    console.log(`Scraped Result: ${parsed.validGames.length}G / ${actualS}S`);
    console.log(`Syllabus count: ${parsed.validSyllabusBadges.length}, Extra count: ${parsed.validExtraBadges.length}`);

    console.log(`\n--- ALL EXCLUDED BADGES (${parsed.excludedItems.length}) ---`);
    parsed.excludedItems.forEach(e => {
      console.log(`- "${e.title}" | Date: ${e.dateStr} | Reason: ${e.reason}`);
    });
  }
}

debugMissingBadges().catch(console.error);
