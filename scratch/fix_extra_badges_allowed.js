import fs from 'fs';

// 1. Read SKILL_BADGES names from api/_program.js
import { SKILL_BADGES } from '../api/_program.js';
const syllabusNames = new Set(SKILL_BADGES.map(b => b.name.toLowerCase().trim()));

// 2. Read CATALOG_SKILL_BADGES names from src/config/catalogData.ts
const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');
const startIdx = catText.indexOf('export const CATALOG_SKILL_BADGES');
const section = catText.slice(startIdx);

const matches = section.matchAll(/"name":\s*"([^"]+)"/g);
const catalogExtraBadges = [];
for (const m of matches) {
  const name = m[1];
  if (!name.startsWith('http') && !name.startsWith('game-')) {
    if (!syllabusNames.has(name.toLowerCase().trim()) && !catalogExtraBadges.includes(name)) {
      catalogExtraBadges.push(name);
    }
  }
}

console.log('Total Extra Badges in CATALOG_SKILL_BADGES (outside Syllabus):', catalogExtraBadges.length);

// Also add alias variations for these extra badges
const extraAliases = [
  'Implement Sensitive Data Protection on Google Cloud',
  'Discover and Protect Sensitive Data Across Your Ecosystem',
  'Kickstarting Application Development with Gemini Code Assist',
  'Build Real World AI Applications with Gemini and Imagen',
  'Claim Skill Badge: Organize and Manage Data with Dataplex',
  'Organize and Govern Data with Knowledge Catalog',
  'Build a Data Mesh with Knowledge Catalog',
  'Use APIs to Work with Cloud Storage',
  'Connecting Cloud Networks with NCC',
  'Deploy and Secure Serverless APIs with API Gateway',
  'Use Functions, Formulas, and Charts in Google Sheets',
  'Implement Cloud Security Fundamentals on Google Cloud',
  'Develop Serverless Applications on Cloud Run',
  'Implement CI/CD Pipelines on Google Cloud',
  'Build Infrastructure with Terraform on Google Cloud'
];

const fullExtraAllowed = [...catalogExtraBadges, ...extraAliases];
console.log('Total Full EXTRA_BADGES_ALLOWED array length:', fullExtraAllowed.length);

// Update api/_program.js
let jsContent = fs.readFileSync('api/_program.js', 'utf8');
jsContent = jsContent.replace(/export const EXTRA_BADGES_ALLOWED = \[[[\s\S]*?\];/, `export const EXTRA_BADGES_ALLOWED = ${JSON.stringify(fullExtraAllowed, null, 2)};`);
fs.writeFileSync('api/_program.js', jsContent, 'utf8');

// Update src/config/program.ts
let tsContent = fs.readFileSync('src/config/program.ts', 'utf8');
tsContent = tsContent.replace(/export const EXTRA_BADGES_ALLOWED = \[[[\s\S]*?\];/, `export const EXTRA_BADGES_ALLOWED = ${JSON.stringify(fullExtraAllowed, null, 2)};`);
fs.writeFileSync('src/config/program.ts', tsContent, 'utf8');

console.log('Successfully updated EXTRA_BADGES_ALLOWED in api/_program.js and src/config/program.ts');
