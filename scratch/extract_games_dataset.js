import fs from 'fs';

const jsText = fs.readFileSync('scratch/script_2.js', 'utf8');

// Find julyArcadeGames and augustArcadeGames declarations
const julyMatch = jsText.match(/const julyArcadeGames = (\[[\s\S]*?\]);\s*const augustArcadeGames/);
const augustMatch = jsText.match(/const augustArcadeGames = (\[[\s\S]*?\]);\s*\/\//);

if (julyMatch) {
  fs.writeFileSync('scratch/july_arcade_games_html.json', julyMatch[1], 'utf8');
  console.log('Saved july_arcade_games_html.json');
}

if (augustMatch) {
  fs.writeFileSync('scratch/august_arcade_games_html.json', augustMatch[1], 'utf8');
  console.log('Saved august_arcade_games_html.json');
}
