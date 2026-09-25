// Lädt beim Build alle eigenen Fotos von FreddErick in Originalauflösung vom bisherigen
// Wix-Host (static.wixstatic.com), verkleinert sie auf Web-Größe.
// Nichts ist erfunden: jede Datei existiert bereits auf www.fredderick.net.
// Die gleichen Originale liegen auch unter 02-assets/original/ im Kundenordner.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const BASE = 'https://static.wixstatic.com/media/';
const OUT = path.join(process.cwd(), 'public', 'img');
const CACHE = path.join(process.cwd(), '.image-cache');

// name -> [Wix media id, max width]
const MAP = {
  'hero-crowd': ['073449_a3a087839401434297dd1f4d287bf3be.jpg', 2400],
  'crowd-beams': ['073449_41adf051d2e34c0a954e97cf0938792e.jpg', 2200],
  'hand-ddj': ['073449_5c841cdd696c48548779bf19d10e2bb9.jpg', 1800],
  'erick-portrait': ['073449_00cabfb2dd1c4c85bff1167dfbe3eed4.jpg', 533],
  'erick-decks': ['073449_8b6d57507099493b81a5ce3122f480ea.jpg', 1474],
  'setup': ['073449_e900130e1db2408694fcf35f28b0acbf.jpg', 2200],
  'ballroom': ['073449_b5c02b3276254fd38740e19e8cfca135.jpg', 2000],
  'ballroom-table': ['073449_c1550746dc3d43a29abf8a5dfdef8700.jpg', 1500],
  'wedding-table': ['073449_aa7e4785a0294b1c894a6fa0a8b5ab30~mv2.jpg', 958],
  'wedding-bw': ['073449_71fa2aab0d894548867cdb2aded8f423~mv2.jpg', 960],
  'pergola': ['073449_7cf3b5d76f094d0db74770e3e672f107~mv2.jpg', 960],
  'balloons': ['073449_09600f8d578b40ed89302d4384906d5d~mv2.jpg', 960],
  'crowd-lasers': ['073449_806ec390c6014e739bee91df4fea1fb9.jpg', 1500],
  'beams-venue': ['073449_9c172e81689a4a5b937aecd8e60de77c.jpg', 2048],
  'salsa': ['073449_d2cee2bcbcc44bb6a6edf6628142d9a6.jpg', 1000],
  'kassel-ballroom': ['073449_a76ec07fe16a43438dc5fdf64e27e432~mv2.jpg', 663],
  'samsung-stage': ['073449_d70e73d0d0b74308b1383650ee2befbd~mv2.jpg', 720],
  'samsung-sign': ['073449_d67a85d58f854f239e7e8eccb0a865ba~mv2.jpg', 720],
  'samsung-crowd': ['073449_64a46b1ca245425ba6d4ceb0aea39048~mv2.jpg', 960],
  'dvm-atrium': ['073449_bd6d0dff0d62492587b71a5636e59ed0~mv2.jpg', 960],
  'frankfurt-collage': ['073449_7a8e9ceed70145538ef1f212fa94f2d8~mv2.jpg', 960],
  'kassel-collage': ['073449_0440d202ecfb47018d4928cbb343f5e4.jpg', 1500],
  'contact-hands': ['073449_4c3d714a8ed04eefae3c892705ff5459~mv2.png', 1024],
  'note-jessi-michi': ['073449_effe56d91ed24130802c605bfed5af01~mv2.jpg', 720],
  'card-juana-david': ['073449_5ff70b797f7c4bb6937352cb8590c54d~mv2.jpg', 960],
  'note-sophie': ['073449_bc6ad8cd56954070af5f3b15ea56e3d4~mv2.jpg', 720],
  'eq-ddj-sz': ['073449_11d2a86dad7c4645b0ef34955eb2059a.jpg', 1200],
  'eq-ddj-rz': ['073449_2c080ec29296450ea42df7674e61fdbb.jpeg', 1200],
  'eq-traktor': ['073449_5f44404b0b7548ff82d6f42d1c466949.jpg', 1080],
  'eq-ipad': ['073449_42c7f8fa25f240c9ad1cb0f4aca9f22e.jpg', 1200],
  'eq-macbook': ['073449_33ebf3127f604d2c85d5b03263debe3c.jpg', 1200],
  'eq-hd25': ['073449_4ea805dd612c44058dd7f6d576e989b2.jpg', 1200],
  'eq-evox8': ['073449_b2f599661a3e489a918ee46eef1b570b.jpg', 888],
  'eq-f12': ['073449_f68a587030f0460399420cb4e8916e97.png', 804],
  'eq-gorilla': ['073449_0f08d1eb7809426f9a737ccbf586e934.png', 801],
  'eq-mic': ['073449_0644778ad2e4428da93e9646ea3c5928.jpg', 1200],
  'eq-cameo': ['073449_5162b28098064be6af9797421700e445.jpg', 600],
};

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(CACHE, { recursive: true });

async function grab(id) {
  const cached = path.join(CACHE, id);
  try { return await fs.readFile(cached); } catch {}
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(BASE + id, { headers: { 'User-Agent': 'Mozilla/5.0 (site-build)' }, signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error('too small');
      await fs.writeFile(cached, buf);
      return buf;
    } catch (e) {
      if (attempt === 2) { console.warn('[img] failed', id, e.message); return null; }
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
    }
  }
  return null;
}

let ok = 0, fail = 0;
for (const [name, [id, width]] of Object.entries(MAP)) {
  const target = path.join(OUT, name + '.jpg');
  const buf = await grab(id);
  if (!buf) { fail++; continue; }
  try { await fs.access(target); ok++; continue; } catch {}
  await sharp(buf).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(target);
  ok++;
}

// Erick allein: rechte Hälfte des Studiofotos
{
  const duo = await grab('073449_ac3181256c2c45cabccac0f40f104521.jpg');
  if (duo) { const m = await sharp(duo).metadata(); await sharp(duo).extract({ left: Math.round(m.width * 0.5), top: 0, width: m.width - Math.round(m.width * 0.5), height: m.height }).jpeg({ quality: 85 }).toFile(path.join(OUT, 'erick-studio.jpg')); }
}


console.log(`[img] ${ok} ready, ${fail} failed`);
if (fail > 0) throw new Error('Some images could not be fetched – aborting build');
