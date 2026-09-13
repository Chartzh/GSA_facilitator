import { getTop10 } from '../api/_db.js';

async function testGetTop10() {
  console.log('=== FETCHING TOP 10 FOR DATE 2026-09-06 ===');
  const res = await getTop10('2026-09-06');
  console.log('Snapshot Date Used:', res.lastUpdated);
  console.log('Available Dates:', res.availableDates);
  console.log('Top 10 Count:', res.top10.length);
  console.log('\n--- TOP 10 RANKINGS ---');
  res.top10.forEach((p, idx) => {
    console.log(`#${p.rank} ${p.name} | Total: ${p.totalPoints} pts (Base: ${p.points}, Bonus: ${p.bonusPoints}) | Games: ${p.games}G, Badges: ${p.badges}S | Milestone: ${p.milestone}`);
  });
}

testGetTop10().catch(console.error);
