import fs from 'fs';

import { SKILL_BADGES } from '../api/_program.js';

const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
const section = catText.slice(startIdx);

const matches = section.matchAll(/"name":\s*"([^"]+)"/g);
const catalogNames = [];
for (const m of matches) {
  if (!catalogNames.includes(m[1]) && !m[1].startsWith('http') && !m[1].startsWith('game-') && !m[1].startsWith('Lab ')) {
    catalogNames.push(m[1]);
  }
}

console.log('Total CATALOG_SKILL_BADGES Standalone Count:', catalogNames.length);

const normalize = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

const catalogNormMap = new Map();
catalogNames.forEach(name => {
  catalogNormMap.set(normalize(name), name);
});

let updatedCount = 0;
SKILL_BADGES.forEach(s => {
  const normS = normalize(s.name);
  const exactCatName = catalogNormMap.get(normS);
  if (exactCatName && exactCatName !== s.name) {
    console.log(`Updating Syllabus Badge: "${s.name}" -> "${exactCatName}"`);
    s.name = exactCatName;
    if (s.nameEn) s.nameEn = exactCatName;
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} syllabus badges to match catalogData.ts exact strings.`);

// Write back updated SKILL_BADGES to api/_program.js and src/config/program.ts
const replaceSyllabus = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  SKILL_BADGES.forEach(s => {
    // replace name in SKILL_BADGES block
    const norm = normalize(s.name);
    // Find matching entry by ID
    const re = new RegExp(`(id:\\s*${s.id}[\\s\\S]*?name:\\s*')([^']+)(')`, 'g');
    content = content.replace(re, `$1${s.name}$3`);
  });
  fs.writeFileSync(filePath, content, 'utf8');
};

replaceSyllabus('api/_program.js');
replaceSyllabus('src/config/program.ts');
console.log('Successfully updated syllabus names in api/_program.js and src/config/program.ts');
