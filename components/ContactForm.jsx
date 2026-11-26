'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Stagger, Item } from '@/components/Motion';
import { BIZ, EVENT_TYPES, SERVICES } from '@/lib/content';

/* The form posts to /api/kontakt, which sends the enquiry to Erick via his Google Workspace mailbox.
   If the server cannot send (not configured, error), it falls back to the visitor's mail app (mailto).
   Nothing is stored on the server – see Datenschutz. */
export default function ContactForm() {
  const params = useSearchParams();
  const preset = SERVICES.find((s) => s.slug === params.get('anlass'));
  // idle | sending | sent | mailto | error
  const [status, setStatus] = useState('idle');

  const mailtoHref = (f) => {
    const name = `${f.vorname} ${f.nachname || ''}`.trim();
    const subject = `Anfrage: ${f.anlass}${f.datum ? ' am ' + f.datum : ''} – ${name}`;
    const body = [
      `Name: ${name}`,
      `E-Mail: ${f.email}`,
      f.telefon ? `Telefon: ${f.telefon}` : null,
      `Anlass: ${f.anlass}`,
      f.datum ? `Datum: ${f.datum}` : null,
      f.ort ? `Ort / Location: ${f.ort}` : null,
      f.gaeste ? `Gäste: ${f.gaeste}` : null,
      f.empfehlung ? `Empfohlen von: ${f.empfehlung}` : null,
      '',
      f.nachricht || '',
    ].filter((l) => l !== null).join('\n');
    return `mailto:${BIZ.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    setStatus('sending');
    let res;
    try {
      res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, datenschutz: form.querySelector('#ds').checked }),
      });
    } catch {
      res = null;
    }
    if (res?.ok) {
      setStatus('sent');
      form.reset();
      return;
    }
    if (res && (res.status === 400 || res.status === 429)) {
      setStatus('error');
      return;
    }
    // Server cannot send (not configured / mail error / offline): use the visitor's mail app instead.
    window.location.href = mailtoHref(f);
    setStatus('mailto');
  };

  return (
    <form className="form-dark" onSubmit={onSubmit}>
      <Stagger className="row g-3" gap={0.05}>
        <Item className="col-md-6">
          <label htmlFor="vorname">Vorname *</label>
          <input className="form-control" id="vorname" name="vorname" required autoComplete="given-name" />
        </Item>
        <Item className="col-md-6">
          <label htmlFor="nachname">Nachname</label>
          <input className="form-control" id="nachname" name="nachname" autoComplete="family-name" />
        </Item>
        <Item className="col-md-6">
          <label htmlFor="email">E-Mail-Adresse *</label>
          <input className="form-control" id="email" name="email" type="email" required autoComplete="email" />
        </Item>
        <Item className="col-md-6">
          <label htmlFor="telefon">Telefon</label>
          <input className="form-control" id="telefon" name="telefon" type="tel" autoComplete="tel" />
        </Item>
        <Item className="col-md-6">
          <label htmlFor="anlass">Anlass *</label>
          <select className="form-select" id="anlass" name="anlass" required defaultValue={preset ? preset.title.split(' ')[0] : ''}>
            <option value="" disabled>Bitte wählen</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Item>
        <Item className="col-md-6">
          <label htmlFor="datum">Datum der Feier</label>
          <input className="form-control" id="datum" name="datum" type="date" />
        </Item>
        <Item className="col-md-8">
          <label htmlFor="ort">Ort / Location</label>
          <input className="form-control" id="ort" name="ort" placeholder="z. B. Hofgut Dagobertshausen, Marburg" />
        </Item>
        <Item className="col-md-4">
          <label htmlFor="gaeste">Gäste (ca.)</label>
          <input className="form-control" id="gaeste" name="gaeste" type="number" min="1" placeholder="80" />
        </Item>
        <Item className="col-12">
          <label htmlFor="nachricht">Ihre Nachricht</label>
          <textarea className="form-control" id="nachricht" name="nachricht" rows={5} placeholder="Erzählen Sie mir kurz von Ihrer Feier – Ablauf, Musikwünsche, Fragen." />
        </Item>
        <Item className="col-12">
          <label htmlFor="empfehlung"><i className="bi bi-gift me-2" style={{ color: 'var(--magenta)' }} />Wurde ich Ihnen empfohlen? Von wem?</label>
          <input className="form-control" id="empfehlung" name="empfehlung" placeholder="Ich würde mich gerne beim Empfehlungsgeber bedanken." />
        </Item>
        <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <Item className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="ds" required />
            <label className="form-check-label" htmlFor="ds" style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, fontSize: 14 }}>
              Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen. Meine Angaben werden nur zur Bearbeitung der Anfrage verwendet.
            </label>
          </div>
        </Item>
        <Item className="col-12">
          <motion.button type="submit" className="btn-magenta" disabled={status === 'sending'} aria-busy={status === 'sending'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <i className={status === 'sending' ? 'bi bi-hourglass-split' : 'bi bi-send-fill'} />{status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
          </motion.button>
        </Item>
      </Stagger>
      <AnimatePresence>
        {['sent', 'mailto', 'error'].includes(status) && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card-dark"
            style={{ marginTop: 'var(--md)', borderColor: status === 'error' ? 'var(--magenta)' : 'var(--success)' }}
            role="status"
            aria-live="polite"
          >
            {status === 'sent' && (
              <strong style={{ color: 'var(--success)' }}><i className="bi bi-check2-circle me-2" />Danke, Ihre Anfrage ist bei mir angekommen. Ich melde mich so schnell wie möglich bei Ihnen.</strong>
            )}
            {status === 'mailto' && (
              <strong style={{ color: 'var(--success)' }}><i className="bi bi-envelope-open me-2" />Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage. Bitte dort noch auf Senden tippen.</strong>
            )}
            {status === 'error' && (
              <strong style={{ color: 'var(--magenta)' }}><i className="bi bi-exclamation-circle me-2" />Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Angaben oder versuchen Sie es in ein paar Minuten erneut.</strong>
            )}
            {status !== 'sent' && (
              <p className="muted" style={{ margin: '6px 0 0', fontSize: 14 }}>
                Oder schreiben Sie mir direkt an <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> bzw. rufen Sie an unter <a href={BIZ.phoneHref}>{BIZ.phone}</a>.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
