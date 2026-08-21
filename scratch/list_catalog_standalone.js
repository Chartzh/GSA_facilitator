import fs from 'fs';

const text = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const start = text.indexOf('export const CATALOG_SKILL_BADGES');
const section = text.slice(start);

const names = [];
const matches = section.matchAll(/"name":\s*"([^"]+)"/g);
for (const m of matches) {
  if (!names.includes(m[1])) {
    names.push(m[1]);
  }
}

console.log('Total Standalone Skill Badges in CATALOG_SKILL_BADGES:', names.length);
console.log('\n--- ALL CATALOG SKILL BADGES NAMES ---');
names.forEach((n, i) => console.log(`${i+1}. ${n}`));
