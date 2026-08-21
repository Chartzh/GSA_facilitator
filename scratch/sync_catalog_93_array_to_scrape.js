import fs from 'fs';

const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
const section = catText.slice(startIdx);

const catalog93Names = [];
const matches = section.matchAll(/"name":\s*"([^"]+)"/g);
for (const m of matches) {
  if (!catalog93Names.includes(m[1]) && !m[1].startsWith('http') && !m[1].startsWith('game-') && !m[1].startsWith('Lab ')) {
    catalog93Names.push(m[1]);
  }
}

console.log('Total CATALOG_SKILL_BADGES:', catalog93Names.length);

// Update api/_scrape.js to use CATALOG_SKILL_BADGES array of 93 names
let jsContent = fs.readFileSync('api/_scrape.js', 'utf8');

// Replace catalog93 array in api/_scrape.js
const arrayCode = `export const CATALOG_93_BADGES = ${JSON.stringify(catalog93Names, null, 2)};`;

// Insert CATALOG_93_BADGES before parseProfileHtml
if (!jsContent.includes('CATALOG_93_BADGES')) {
  jsContent = jsContent.replace('export function parseProfileHtml', `${arrayCode}\n\nexport function parseProfileHtml`);
} else {
  jsContent = jsContent.replace(/export const CATALOG_93_BADGES = \[[\s\S]*?\];/, arrayCode);
}

// Replace catalog93 iteration in parseProfileHtml to iterate CATALOG_93_BADGES
jsContent = jsContent.replace(/const catalog93 = \[[\s\S]*?\]/, 'const catalog93 = CATALOG_93_BADGES');

fs.writeFileSync('api/_scrape.js', jsContent, 'utf8');
console.log('Updated api/_scrape.js with CATALOG_93_BADGES array!');
