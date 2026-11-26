// Contact form backend: sends the enquiry to Erick through his Google Workspace mailbox (SMTP).
// Settings (Coolify environment variables, runtime only):
//   SMTP_USER  the Google Workspace address that sends, e.g. erick@djerick.de
//   SMTP_PASS  a Google app password for that address (needs 2-step verification on the account)
//   CONTACT_TO optional recipient, defaults to BIZ.email
// Without SMTP_USER/SMTP_PASS the route answers 503 and the form falls back to the visitor's mail app.
// Nothing is stored on the server.
import nodemailer from 'nodemailer';
import { BIZ, EVENT_TYPES } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LIMITS = { vorname: 80, nachname: 80, email: 200, telefon: 40, anlass: 60, datum: 20, ort: 200, gaeste: 10, nachricht: 5000, empfehlung: 200 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple per-IP limit (one container, so memory is enough): 5 sends per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}

const oneLine = (v) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim();

let transport;
function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transport;
}

export async function POST(req) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field. Pretend success to bots.
  if (data.website) return Response.json({ ok: true });

  const f = {};
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = k === 'nachricht' ? String(data[k] ?? '').trim() : oneLine(data[k]);
    if (v.length > max) return Response.json({ ok: false, error: 'too_long', field: k }, { status: 400 });
    f[k] = v;
  }
  if (!f.vorname || !EMAIL_RE.test(f.email) || !EVENT_TYPES.includes(f.anlass) || data.datenschutz !== true) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const ip = oneLine(req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown');
  if (limited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const name = `${f.vorname} ${f.nachname}`.trim();
  const subject = `Anfrage: ${f.anlass}${f.datum ? ' am ' + f.datum : ''} – ${name}`;
  const text = [
    `Name: ${name}`,
    `E-Mail: ${f.email}`,
    f.telefon ? `Telefon: ${f.telefon}` : null,
    `Anlass: ${f.anlass}`,
    f.datum ? `Datum: ${f.datum}` : null,
    f.ort ? `Ort / Location: ${f.ort}` : null,
    f.gaeste ? `Gäste: ${f.gaeste}` : null,
    f.empfehlung ? `Empfohlen von: ${f.empfehlung}` : null,
    '',
    f.nachricht,
    '',
    '—',
    'Gesendet über das Kontaktformular auf djerick.de. Auf diese E-Mail antworten = Antwort an den Anfragenden.',
  ].filter((l) => l !== null).join('\n');

  try {
    await getTransport().sendMail({
      from: { name: 'djerick.de Kontaktformular', address: process.env.SMTP_USER },
      to: process.env.CONTACT_TO || BIZ.email,
      replyTo: { name, address: f.email },
      subject,
      text,
    });
  } catch (err) {
    console.error('kontakt: send failed', err?.code || '', err?.responseCode || '', err?.message || err);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
