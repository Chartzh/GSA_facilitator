import fs from 'fs';

const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
const section = catText.slice(startIdx);

const catalog93Names = [];
const matches = section.matchAll(/"name":\s*"
