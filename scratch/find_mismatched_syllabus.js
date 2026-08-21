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

const normalize = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

const catalogNormMap = new Map();
catalogNames.forEach(name => {
  catalogNormMap.set(normalize(name), name);
});

console.log('--- SYLLABUS BADGES IN _program.js THAT DO NOT MATCH catalogData.ts EXACT STRING ---');
SKILL_BADGES.forEach(s => {
  const normS = normalize(s.name);
  const catMatch = catalogNormMap.get(normS);
  if (!catMatch || catMatch !== s.name) {
    console.log(`ID ${s.id}: "${s.name}" | Catalog exact name: "${catMatch || 'NONE'}"`);
  }
});
