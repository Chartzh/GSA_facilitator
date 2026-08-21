import fs from 'fs';

const augustBlock = fs.readFileSync('scratch/augustBlock.js', 'utf8');

const evalContext = (blockStr, varName) => {
  const code = blockStr.replace(`const ${varName} =`, `global.${varName} =`);
  eval(code);
  return global[varName];
};

const augustGamesHTML = evalContext(augustBlock, 'augustArcadeGames');

augustGamesHTML.forEach((g, i) => {
  console.log(`${i+1}. id: "${g.id}" | name: "${g.name}" | code: "${g.code}" | labsCount: ${g.labs ? g.labs.length : 0}`);
});
