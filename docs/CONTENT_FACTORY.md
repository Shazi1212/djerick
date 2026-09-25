# DJ Erick – Content Factory (Runbook für die wöchentliche Blog-Routine)

Dieses Dokument ist die verbindliche Anleitung für die automatische Routine, die einmal pro Woche einen
Blog-Beitrag für https://djerick.de veröffentlicht. Es gewinnt bei Widersprüchen gegenüber dem Prompt der Routine.

## 1. Architektur

| Schritt | Wer | Was |
|---|---|---|
| Schreiben | Routine (Cloud-Session, frischer Clone von github.com/Shazi1212/djerick) | Thema aus `content/blog/plan.json` wählen, Beitrag als `content/blog/<slug>.md` schreiben, validieren, Plan aktualisieren, committen, `git push origin HEAD:main` |
| Bauen & Deployen | Vercel (Git-Integration) | Jeder Push auf `main` löst `npm run build` aus: `scripts/prepare-images.mjs` lädt die Fotos, `scripts/validate-content.mjs` prüft alle Beiträge, `next build` rendert statisch. Schlägt die Validierung fehl, schlägt der Build fehl und die alte Version bleibt live. |
| Bericht | Routine | Abschlussmeldung im Session-Log (Slug, Wortzahl, Commit). Kein E-Mail-Versand, keine Deploy-Befehle. |

Die Routine braucht keinerlei Zugangsdaten außer dem Repo-Zugriff, den die Session mitbringt. Sie deployt nicht, sie ruft die Live-Seite nicht als Gate auf, sie fragt niemanden nach Passwörtern.

## 2. Scope Guard (harte Grenze)

Die Routine darf nur diese Dateien anlegen oder ändern:

- `content/blog/<neuer-slug>.md` (neuer Beitrag)
- `content/blog/plan.json` (Status, `published_on`, neue Themen)

Sie darf **nicht** ändern: bestehende Beiträge, `app/`, `components/`, `lib/`, `scripts/`, `docs/`, `public/`, `package.json`, Konfigurationsdateien. Wenn etwas außerhalb des Scopes kaputt aussieht, wird es in der Abschlussmeldung erwähnt und nicht angefasst.

## 3. Erlaubte Fakten (einzige Quelle: `lib/content.js` und `content/blog/*.md`)

- Person: Erick Hernández, Künstlername DJ Erick. Erste Person Singular („ich"), Kunden werden mit „Sie" angesprochen.
- Erfahrung: „seit mehr als 10 Jahren" an den Decks. Gäste: „von 30 bis 2000 Gästen war bisher alles dabei". Google: 4,8 Sterne aus 27 Rezensionen (Stand September 2026).
- Region: Gießen, Marburg, Frankfurt, Rhein-Main-Gebiet, Hessen, deutschlandweit (mit Anfahrt und Übernachtung bei weiten Strecken). Weitere Städte aus `CITIES` in `lib/content.js` dürfen genannt werden.
- Anlässe: Hochzeiten, Firmenevents (Jubiläum, Sommerfest, Weihnachtsfeier), Geburtstage, Silvester, Abi-Feten, Studentenparties, Clubs.
- Musik: Hits aus den 50ern bis zu den aktuellen Charts; Rock'n'Roll, Classic Rock, Standardtänze, Pop, NDW, House, Dance Classics, Eurodance, Electro Swing, R&B, Hip-Hop, Reggae, Reggaeton, Salsa, Bachata, Merengue. Die Top 10 steht in `lib/content.js` (`TOP10`).
- Technik: Pioneer DDJ-SZ und DDJ-RZ, Traktor X1 & Z1 als Notfallequipment, iPad Mini, MacBook Pro, Sennheiser HD-25 II, RCF Evox 8, PL-Audio F12, PL-Audio Gorilla-Bass, Funkmikrofon, Cameo Multi PAR COB1. Standard-Paket: Evox 8, zwei Lichteffekte, LED-Bar.
- Ablauf: kostenfreies, unverbindliches Angebot nach Kennenlern- oder Beratungsgespräch; Musikbesprechung; keine Pausen außer laut Programm; Netzwerk aus DJ-Kollegen bei Krankheit ohne Mehrkosten; Empfehlungen für Fotografen, Musiker, Cocktail-Service, Caterer, Locations.
- Referenzen (nur diese Namen): Firmen, Clubs und Locations aus `REFERENCES` in `lib/content.js`. Google-Rezensionen aus `TESTIMONIALS` dürfen wörtlich zitiert werden, mit Namen des Rezensenten.
- Kontakt: Telefon 01525 3748413, E-Mail erick@djerick.de, Anfrage über `page:kontakt`.

**Verboten:** Preise oder Preisspannen, Anzahl gespielter Hochzeiten, Kapazitäten oder Preise von Locations, Zertifikate, Auszeichnungen, Kundennamen außerhalb der Referenzliste, Aussagen über Wettbewerber, jede Erwähnung von „FreddErick", „Fredderick" oder „Freddy" (der Validator bricht ab), „wir" als Team.

## 4. Stil

- Deutsch, formell („Sie"), konkret, aus der Praxis. Keine Emojis. Keine Ausrufezeichen in Überschriften.
- **Keine Gedankenstriche** (weder „–" noch „—"), stattdessen Kommas, Doppelpunkte oder Punkte. Der Validator lehnt Beiträge mit Gedankenstrichen ab.
- 800 bis 1400 Wörter. Kein H1 im Text (der Titel ist das H1). 4 bis 6 „## " Abschnitte, einer davon „## Häufige Fragen" mit 3 bis 5 „### " Fragen. Kurzer Abschluss mit Link auf `page:kontakt`.
- Keyword im Titel, im ersten Absatz, in einer H2 und natürlich 2 bis 4 weitere Male. Kein Keyword-Stuffing.
- Interne Links ausschließlich in dieser Syntax: `[Text](page:leistungen#hochzeit)`, `[Text](post:anderer-slug)`, Bilder `![Alt](asset:hero-crowd)`. Externe Links nur `https://`.
  Gültige Seiten: `page:` + `leistungen` (Anker `hochzeit`, `firmenevent`, `geburtstag`, `club`), `ueber-mich`, `musik`, `technik`, `referenzen` (Anker `eindruecke`), `faq`, `kontakt`, `blog`. Mindestens 3 interne Links, einer davon `page:kontakt`, und wenn passend ein `post:`-Link auf einen vorhandenen Beitrag (`ls content/blog`).

## 5. Frontmatter (genau diese Felder)

```
---
title: "..."                      # unter 65 Zeichen, enthält das Keyword
description: "..."                # 120 bis 160 Zeichen, ganzer Satz, enthält das Keyword
date: YYYY-MM-DD                  # heute, Europe/Berlin
slug: <slug aus dem Plan>         # Dateiname = <slug>.md
keyword: <keyword aus dem Plan>
category: <Hochzeit | Firmenevent | Party & Geburtstag | Musik | Locations | Planung>
image: <Bildname ohne .jpg>       # aus BLOG_IMAGES in lib/blog.js
imageAlt: "..."                   # beschreibt das Bild
author: Erick Hernández
draft: false
---
```

Erlaubte Bilder (`image:`): hero-crowd, crowd-beams, hand-ddj, setup, ballroom, ballroom-table, wedding-table, wedding-bw, pergola, balloons, crowd-lasers, beams-venue, salsa, kassel-ballroom, samsung-stage, samsung-crowd, dvm-atrium, erick-decks, erick-portrait, erick-studio, eq-ddj-sz, eq-evox8, eq-cameo, contact-hands.

## 6. Validierung

`node scripts/validate-content.mjs` muss mit `content: OK` enden. Fehler (ERROR) sind Blocker, Warnungen (WARN) sollen behoben werden, wenn es sinnvoll ist. Maximal drei Korrekturrunden. Falls `public/img` fehlt (frischer Clone), vorher einmal `npm install && node scripts/prepare-images.mjs` ausführen, damit die Bildprüfung funktioniert; ohne Netzwerk bleibt die Bildprüfung aus und es zählt die Liste in Abschnitt 5.

## 7. Redaktionsplan

`content/blog/plan.json` enthält `topics`. Reihenfolge: erster Eintrag mit `status: "open"`, sortiert nach `prio` aufsteigend, dann `nr`. Einträge mit `status: "blocked: ..."` überspringen. Saisonale Einträge (Feld `note` mit „saisonal") nur in der passenden Jahreszeit nehmen. Sind weniger als drei Themen offen, mindestens sechs neue Einträge im gleichen Schema anlegen (fortlaufende `nr`, eindeutige `slug`, Fakten aus Abschnitt 3). Nach der Veröffentlichung: `status: "published"` und `published_on: "YYYY-MM-DD"`.

## 8. Commit und Push

```
git add content/blog/<slug>.md content/blog/plan.json
git commit -m "blog: <slug>"
git push origin HEAD:main || (git pull --rebase origin main && git push origin HEAD:main)
```

Niemals `git add -A`, niemals Force-Push, niemals History umschreiben. Wenn der Push nach einem Rebase weiterhin abgelehnt wird: abbrechen und melden.

## 9. Fehlerprotokoll

- Validierung nach drei Versuchen weiterhin fehlerhaft, oder das Thema lässt sich mit den erlaubten Fakten nicht schreiben: Beitrag verwerfen (`git checkout -- content/ && git clean -fd content/`), im Plan `status: "blocked: <Grund>"` setzen, nur diese Planänderung committen und pushen, im Abschlussbericht erklären.
- Nie einen Beitrag pushen, der die Validierung nicht bestanden hat.

## 10. Abschlussmeldung

Slug, Titel, Wortzahl, Validator-Ergebnis, Commit-Hash, nächstes offenes Thema, Anzahl offener Themen. Die Live-URL lautet `https://djerick.de/blog/<slug>` und ist wenige Minuten nach dem Push erreichbar (Vercel).
