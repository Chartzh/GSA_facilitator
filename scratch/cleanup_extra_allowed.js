import fs from 'fs';

function cleanExtraAllowed(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/export const EXTRA_BADGES_ALLOWED = (\[[\s\S]*?\]);/);
  if (match) {
    let arr = JSON.parse(match[1]);
    arr = arr.filter(item => item !== "App Building with AppSheet" && item !== "Orchestrate Multi-agent Workflows with Gemini Enterprise");
    text = text.replace(/export const EXTRA_BADGES_ALLOWED = \[[\s\S]*?\];/, `export const EXTRA_BADGES_ALLOWED = ${JSON.stringify(arr, null, 2)};`);
    fs.writeFileSync(filePath, text, 'utf8');
  }
}

cleanExtraAllowed('api/_program.js');
cleanExtraAllowed('src/config/program.ts');
console.log('Successfully cleaned EXTRA_BADGES_ALLOWED in api/_program.js and src/config/program.ts');
