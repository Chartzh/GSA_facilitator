import fs from 'fs';

const jsText = fs.readFileSync('scratch/script_2.js', 'utf8');

// Find julyArcadeGames start and end
const julyStart = jsText.indexOf('const julyArcadeGames =');
const augustStart = jsText.indexOf('const augustArcadeGames =');
const catalogStart = jsText.indexOf('const skillBadges =');

const julyBlock = jsText.slice(julyStart, augustStart);
const augustBlock = jsText.slice(augustStart, catalogStart);

fs.writeFileSync('scratch/julyBlock.js', julyBlock, 'utf8');
fs.writeFileSync('scratch/augustBlock.js', augustBlock, 'utf8');
console.log('Saved julyBlock.js and augustBlock.js');
