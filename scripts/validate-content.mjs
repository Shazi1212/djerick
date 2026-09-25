// Prüft alle Blog-Beiträge und den Redaktionsplan. Wird vom Build (prebuild) und von der
// wöchentlichen Routine ausgeführt. Endet mit "content: OK" oder "content: FAILED".
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content', 'blog');
const PLAN = path.join(DIR, 'plan.json');
const IMG_DIR = path.join(ROOT, 'public', 'img');
const PAGES = ['', 'leistungen', 'ueber-mich', 'musik', 'technik', 'referenzen', 'faq', 'kontakt', 'blog', 'impressum', 'datenschutz'];
const ANCHORS = { leistungen: ['hochzeit', 'firmenevent', 'geburtstag', 'club'], referenzen: ['eindruecke'] };
const BANNED = [/fredd\s*erick/i, /freddy/i, /\bwir\b.*\bDJs\b/i, /[–—]/];
const REQUIRED = ['title', 'description', 'date', 'slug', 'keyword', 'image', 'imageAlt', 'category', 'draft'];
const CATEGORIES = ['Hochzeit', 'Firmenevent', 'Party & Geburtstag', 'Musik', 'Locations', 'Planung'];

const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

function fm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[line.slice(0, i).trim()] = v;
  }
  return { data, body: m[2] };
}

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.md')) : [];
const slugs = new Map();
const images = fs.existsSync(IMG_DIR) ? new Set(fs.readdirSync(IMG_DIR).map((f) => f.replace(/\.jpg$/, ''))) : null;

for (const f of files) {
  const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
  const parsed = fm(raw);
  if (!parsed) { err(f, 'kein Frontmatter'); continue; }
  const { data, body } = parsed;
  for (const k of REQUIRED) if (!(k in data) || data[k] === '') err(f, `Frontmatter-Feld fehlt: ${k}`);
  if (data.slug && f !== `${data.slug}.md`) err(f, `Dateiname muss ${data.slug}.md sein`);
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) err(f, 'slug nur a-z, 0-9, Bindestrich');
  if (data.slug) { if (slugs.has(data.slug)) err(f, `slug doppelt (${slugs.get(data.slug)})`); slugs.set(data.slug, f); }
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) err(f, 'date muss YYYY-MM-DD sein');
  if (data.description && (data.description.length < 110 || data.description.length > 165)) warn(f, `description ${data.description.length} Zeichen (Ziel 120 bis 160)`);
  if (data.title && data.title.length > 70) warn(f, `title ${data.title.length} Zeichen (Ziel unter 65)`);
  if (data.category && !CATEGORIES.includes(data.category)) err(f, `category muss eine von: ${CATEGORIES.join(', ')}`);
  if (data.image && images && !images.has(data.image)) err(f, `image "${data.image}" existiert nicht unter public/img (erst npm run build oder node scripts/prepare-images.mjs)`);
  if (data.draft !== 'false' && data.draft !== 'true') err(f, 'draft muss true oder false sein');

  const text = data.title + '\n' + data.description + '\n' + body;
  for (const re of BANNED) if (re.test(text)) err(f, `verbotener Inhalt gefunden: ${re}`);
  if (/^#\s/m.test(body)) err(f, 'kein H1 im Body (Titel ist das H1)');
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < 700 || words > 1500) err(f, `${words} Wörter (erlaubt 700 bis 1500)`);
  const h2 = (body.match(/^##\s/gm) || []).length;
  if (h2 < 3 || h2 > 7) warn(f, `${h2} H2-Abschnitte (Ziel 4 bis 6)`);
  if (!/^##\s.*(Häufige Fragen|FAQ)/m.test(body)) warn(f, 'kein Abschnitt "## Häufige Fragen"');
  if (data.keyword) {
    const kw = data.keyword.toLowerCase();
    const first = body.trim().split(/\n\s*\n/)[0]?.toLowerCase() || '';
    if (!data.title.toLowerCase().includes(kw.split(' ')[0])) warn(f, 'Keyword-Stammwort fehlt im Titel');
    if (!first.includes(kw.split(' ')[0])) warn(f, 'Keyword fehlt im ersten Absatz');
    const n = (body.toLowerCase().match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (n > 8) warn(f, `Keyword ${n}x im Text (Keyword-Stuffing, Ziel 3 bis 6)`);
  }
  // links
  let internal = 0, contact = 0;
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
    const href = m[1].trim();
    if (href.startsWith('page:')) {
      internal++;
      const [p, a] = href.slice(5).replace(/^\//, '').split('#');
      if (!PAGES.includes(p)) err(f, `unbekannte Seite in Link: ${href}`);
      if (a && !(ANCHORS[p] || []).includes(a)) err(f, `unbekannter Anker in Link: ${href}`);
      if (p === 'kontakt') contact++;
    } else if (href.startsWith('post:')) {
      internal++;
      const s = href.slice(5);
      if (!files.includes(`${s}.md`)) err(f, `post-Link auf nicht existierenden Beitrag: ${s}`);
    } else if (href.startsWith('asset:')) {
      if (images && !images.has(href.slice(6))) err(f, `asset fehlt: ${href}`);
    } else if (!/^https:\/\//.test(href) && !href.startsWith('#')) {
      err(f, `nur page:, post:, asset: oder https:// Links erlaubt, gefunden: ${href}`);
    }
  }
  if (internal < 2) warn(f, `nur ${internal} interne Links (Ziel mindestens 3)`);
  if (contact < 1) warn(f, 'kein Link auf page:kontakt');
  if (/!\s*$/m.test(body.split('\n').filter((l) => l.startsWith('#')).join('\n'))) warn(f, 'Ausrufezeichen in Überschrift');
}

// plan
try {
  const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
  if (!Array.isArray(plan.topics)) err('plan.json', 'topics muss ein Array sein');
  const nrs = new Set();
  for (const t of plan.topics || []) {
    for (const k of ['nr', 'prio', 'slug', 'title', 'keyword', 'category', 'angle', 'status']) if (!(k in t)) err('plan.json', `Eintrag ${t.nr ?? '?'} ohne Feld ${k}`);
    if (nrs.has(t.nr)) err('plan.json', `nr ${t.nr} doppelt`);
    nrs.add(t.nr);
    if (t.status === 'published' && !files.includes(`${t.slug}.md`)) err('plan.json', `nr ${t.nr} published, aber ${t.slug}.md fehlt`);
  }
  const open = (plan.topics || []).filter((t) => t.status === 'open').length;
  if (open < 3) warn('plan.json', `nur ${open} offene Themen, bitte nachfüllen`);
} catch (e) {
  err('plan.json', 'nicht lesbar oder ungültig: ' + e.message);
}

for (const w of warnings) console.log('WARN  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`${files.length} Beiträge geprüft, ${errors.length} Fehler, ${warnings.length} Warnungen`);
if (errors.length) { console.log('content: FAILED'); process.exit(1); }
console.log('content: OK');
