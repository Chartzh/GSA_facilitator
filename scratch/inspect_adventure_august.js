import fs from 'fs';

const html = fs.readFileSync('Tutorial Lab - Google Cloud Arcade X Dicoding.html', 'utf8');

// Find occurrences of datamgt or Adventure or 92372
const script2 = fs.readFileSync('scratch/script_2.js', 'utf8');

const matches = script2.matchAll(/name:\s*"([^"]+)"[\s\S]*?accessCode:\s*"([^"]+)"/g);
for (const m of matches) {
  console.log(`Game: "${m[1]}" | Code: "${m[2]}"`);
}

const augustStart = script2.indexOf('const augustArcadeGames =');
const augustText = script2.slice(augustStart, augustStart + 5000);
console.log('\n--- augustArcadeGames FIRST 2000 CHARS ---');
console.log(augustText.slice(0, 2000));
