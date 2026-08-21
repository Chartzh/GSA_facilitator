import fs from 'fs';

async function test() {
  const catText = fs.readFileSync('src/config/catalogData.ts', 'utf8');

  // Check JULY_ARCADE_GAMES and AUGUST_ARCADE_GAMES
  const { JULY_ARCADE_GAMES, AUGUST_ARCADE_GAMES } = await import('../src/config/catalogData.ts');

  console.log('--- JULY ARCADE GAMES ---');
  JULY_ARCADE_GAMES.forEach(g => {
    console.log(`Game: ${g.name} (${g.labs.length} labs)`);
    g.labs.forEach((l, i) => {
      console.log(`  Lab ${i+1}: ${l.name} | YT: ${l.videoUrl || 'MISSING'}`);
    });
  });

  console.log('\n--- AUGUST ARCADE GAMES ---');
  AUGUST_ARCADE_GAMES.forEach(g => {
    console.log(`Game: ${g.name} (${g.labs.length} labs)`);
    g.labs.forEach((l, i) => {
      console.log(`  Lab ${i+1}: ${l.name} | YT: ${l.videoUrl || 'MISSING'}`);
    });
  });
}

test().catch(console.error);
