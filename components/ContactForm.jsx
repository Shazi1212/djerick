'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Stagger, Item } from '@/components/Motion';
import { BIZ, EVENT_TYPES, SERVICES } from '@/lib/content';

/* The form composes an e-mail to BIZ.email in the visitor's mail app.
   No data is stored on the server – see Datenschutz. A form backend can be added later. */
export default function ContactForm() {
  const params = useSearchParams();
  const preset = SERVICES.find((s) => s.slug === params.get('anlass'));
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = `${f.get('vorname')} ${f.get('nachname') || ''}`.trim();
    const subject = `Anfrage: ${f.get('anlass')}${f.get('datum') ? ' am ' + f.get('datum') : ''} – ${name}`;
    const body = [
      `Name: ${name}`,
      `E-Mail: ${f.get('email')}`,
      f.get('telefon') ? `Telefon: ${f.get('telefon')}` : null,
      `Anlass: ${f.get('anlass')}`,
      f.get('datum') ? `Datum: ${f.get('datum')}` : null,
      f.get('ort') ? `Ort / Location: ${f.get('ort')}` : null,
      f.get('gaeste') ? `Gäste: ${f.get('gaeste')}` : null,
      f.get('empfehlung') ? `Empfohlen von: ${f.get('empfehlung')}` : null,
      '',
      f.get('nachricht') || '',
    ].filter((l) => l !== null).join('\n');
    window.location.href = `mailto:${BIZ.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
        <Item className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="ds" required />
            <label className="form-check-label" htmlFor="ds" style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, fontSize: 14 }}>
              Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen. Meine Angaben werden nur zur Bearbeitung der Anfrage verwendet.
            </label>
          </div>
        </Item>
        <Item className="col-12">
          <motion.button type="submit" className="btn-magenta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <i className="bi bi-send-fill" />Anfrage senden
          </motion.button>
        </Item>
      </Stagger>
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card-dark"
            style={{ marginTop: 'var(--md)', borderColor: 'var(--success)' }}
            role="status"
          >
            <strong style={{ color: 'var(--success)' }}><i className="bi bi-check2-circle me-2" />Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage.</strong>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: 14 }}>
              Falls nicht: Schreiben Sie mir direkt an <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> oder rufen Sie an unter <a href={BIZ.phoneHref}>{BIZ.phone}</a>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
