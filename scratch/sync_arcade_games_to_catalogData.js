import fs from 'fs';

const julyBlock = fs.readFileSync('scratch/julyBlock.js', 'utf8');
const augustBlock = fs.readFileSync('scratch/augustBlock.js', 'utf8');

// Evaluate in JS context
const evalContext = (blockStr, varName) => {
  const code = blockStr.replace(`const ${varName} =`, `global.${varName} =`);
  eval(code);
  return global[varName];
};

const julyGamesHTML = evalContext(julyBlock, 'julyArcadeGames');
const augustGamesHTML = evalContext(augustBlock, 'augustArcadeGames');

console.log('Parsed July Games from HTML:', julyGamesHTML.length);
console.log('Parsed August Games from HTML:', augustGamesHTML.length);

let totalJulyLabs = 0;
julyGamesHTML.forEach(g => { totalJulyLabs += g.labs.length; });
console.log('Total July Game Labs with YT videos:', totalJulyLabs);

let totalAugustLabs = 0;
augustGamesHTML.forEach(g => { totalAugustLabs += g.labs.length; });
console.log('Total August Game Labs with YT videos:', totalAugustLabs);

// Now update src/config/catalogData.ts
let catalogTs = fs.readFileSync('src/config/catalogData.ts', 'utf8');

// Replace JULY_ARCADE_GAMES block
const julyStr = `export const JULY_ARCADE_GAMES: CatalogArcadeGame[] = ${JSON.stringify(julyGamesHTML, null, 2)}`;
catalogTs = catalogTs.replace(/export const JULY_ARCADE_GAMES: CatalogArcadeGame\[\] = \[[\s\S]*?\];\n\nexport const AUGUST_ARCADE_GAMES/, `${julyStr};\n\nexport const AUGUST_ARCADE_GAMES`);

// Replace AUGUST_ARCADE_GAMES block
const augustStr = `export const AUGUST_ARCADE_GAMES: CatalogArcadeGame[] = ${JSON.stringify(augustGamesHTML, null, 2)}`;
catalogTs = catalogTs.replace(/export const AUGUST_ARCADE_GAMES: CatalogArcadeGame\[\] = \[[\s\S]*?\];\n\nexport const CATALOG_SKILL_BADGES/, `${augustStr};\n\nexport const CATALOG_SKILL_BADGES`);

fs.writeFileSync('src/config/catalogData.ts', catalogTs, 'utf8');
console.log('Successfully updated JULY_ARCADE_GAMES and AUGUST_ARCADE_GAMES in src/config/catalogData.ts!');
