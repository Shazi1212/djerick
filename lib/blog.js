// Blog: Markdown-Dateien unter content/blog/<slug>.md mit YAML-Frontmatter.
// Keine externen Frontmatter-Libs – bewusst simpel, damit die wöchentliche Routine
// nichts kaputt machen kann. Validierung: scripts/validate-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'blog');
export const BLOG_IMAGES = [
  'hero-crowd', 'crowd-beams', 'hand-ddj', 'setup', 'ballroom', 'ballroom-table', 'wedding-table', 'wedding-bw',
  'pergola', 'balloons', 'crowd-lasers', 'beams-venue', 'salsa', 'kassel-ballroom', 'samsung-stage', 'samsung-crowd',
  'dvm-atrium', 'erick-decks', 'erick-portrait', 'erick-studio', 'eq-ddj-sz', 'eq-evox8', 'eq-cameo', 'contact-hands',
];

export function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (/^\[.*\]$/.test(val)) val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    data[key] = val;
  }
  return { data, body: m[2] };
}

/* Interne Links in Posts: [Text](page:/leistungen#hochzeit), [Text](post:anderer-slug) */
function resolveLinks(md) {
  return md
    .replace(/\]\(page:([^)]+)\)/g, '](/$1)')
    .replace(/\]\(post:([^)]+)\)/g, '](/blog/$1)')
    .replace(/\]\(asset:([^)]+)\)/g, '](/img/$1.jpg)');
}

export function getPosts({ includeDrafts = false } = {}) {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
      const { data, body } = parseFrontmatter(raw);
      const slug = data.slug || f.replace(/\.md$/, '');
      const words = body.split(/\s+/).filter(Boolean).length;
      return { ...data, slug, body, words, readMinutes: Math.max(1, Math.round(words / 200)), file: f };
    })
    .filter((p) => includeDrafts || p.draft !== true)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getPost(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

export function renderPost(post) {
  marked.setOptions({ gfm: true, breaks: false });
  return marked.parse(resolveLinks(post.body));
}
