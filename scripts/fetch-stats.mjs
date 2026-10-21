// Refreshes lib/stats.json from pub.dev before every build.
// If pub.dev can't be reached, the last saved numbers stay, so a build never fails because of it.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../lib/stats.json', import.meta.url);
const PACKAGES = ['flutter_accessibility_scanner'];

const current = JSON.parse(await readFile(FILE, 'utf8'));
let changed = false;

for (const pkg of PACKAGES) {
  try {
    const res = await fetch(`https://pub.dev/api/packages/${pkg}/score`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const score = await res.json();
    if (typeof score.downloadCount30Days !== 'number') throw new Error('no downloadCount30Days in response');
    current[pkg] = {
      downloads30Days: score.downloadCount30Days,
      grantedPoints: score.grantedPoints,
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
    changed = true;
    console.log(`pub.dev ${pkg}: ${score.downloadCount30Days} downloads in 30 days, ${score.grantedPoints} points`);
  } catch (err) {
    console.warn(`pub.dev ${pkg}: kept saved value ${current[pkg]?.downloads30Days ?? 'none'} (${err.message})`);
  }
}

if (changed) await writeFile(FILE, `${JSON.stringify(current, null, 2)}\n`);
