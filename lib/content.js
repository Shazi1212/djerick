// Alle Inhalte stammen von der bisherigen Website www.fredderick.net (Stand 21.09.2026).
// Nichts ist erfunden. Kleinere Tippfehler des Originals wurden korrigiert.
// Offene Punkte für den Kunden sind im README markiert.

export const BIZ = {
  name: 'DJ Erick',
  fullName: 'DJ Erick – Hochzeits- & Event-DJ',
  owner: 'Erick Hernández',
  email: 'erick@djerick.de',
  phone: '01525 3748413',
  phoneHref: 'tel:+4915253748413',
  whatsappHref: 'https://wa.me/4915253748413',
  taxNumber: '06534014',
  base: 'Marburg & Gießen',
  regions: 'Gießen, Marburg, Frankfurt, Rhein-Main-Gebiet, Hessen und deutschlandweit',
  url: 'https://djerick.de',
  google: {
    rating: '4,8',
    count: 27,
    url: 'https://maps.google.com/?cid=11940412044753428638',
    reviewUrl: 'https://maps.google.com/?cid=11940412044753428638',
  },
  socials: {
    instagram: 'https://www.instagram.com/fredderickdjs/',
    facebook: 'https://www.facebook.com/DJ Erick.Djs/',
    youtube: 'https://www.youtube.com/channel/UCyWfkJMbRPlqRyuIz5zM36A',
  },
  directory: 'http://www.hochzeitsservice-online.de/unterhaltung/djdisco/index.html',
  imageCredits: 'Johannes Leistner, Jan Dodenhof, Rasmus Wenzel & Kai Fritze',
};

export const NAV = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/ueber-mich', label: 'Über mich' },
  { href: '/musik', label: 'Musik' },
  { href: '/technik', label: 'Technik' },
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
];

export const TICKER = [
  'Gießen', 'Marburg', 'Frankfurt', 'Rhein-Main', 'deutschlandweit',
  'Hochzeit', 'Firmenevent', 'Geburtstag', 'Silvester', 'Abi-Party', 'Club',
];

export const SERVICES = [
  {
    slug: 'hochzeit',
    icon: 'bi-heart-fill',
    title: 'Hochzeit',
    kicker: 'Der schönste Tag',
    short:
      'Dezente Hintergrundmusik zum Sektempfang und Dinner, dann eine volle Tanzfläche bis zum Morgengrauen.',
    long: [
      'Beim Sektempfang und Essen wähle ich die Musik so, dass sie die gute Stimmung und die Gespräche ganz dezent unterstützt. Später am Abend sorge ich mit Songauswahl und Lichteffekten für Partystimmung – bis zum Morgengrauen, wenn Sie möchten.',
      'Bei der Musikbesprechung im Vorfeld gestalten wir gemeinsam den musikalischen Rahmen Ihrer Feier: Eröffnungstanz, No-Gos, Wunschsongs. Musikwünsche von Ihnen und Ihren Gästen baue ich am Abend gerne mit ein.',
      'Auf Wunsch bringe ich die passende Licht- und Tontechnik mit und empfehle Ihnen gerne professionelle Dienstleister aus meinem Netzwerk – Fotografen, Musiker, Cocktail-Service, Caterer und Locations.',
    ],
    facts: ['Musikbesprechung im Vorfeld', 'Sektempfang, Dinner & Party', 'Licht- und Tontechnik optional', 'Feste Pauschalpreise'],
    image: 'ballroom',
    imageAlt: 'Festlich gedeckter Hochzeitssaal in Gießen mit Kronleuchter und Kerzenständern',
  },
  {
    slug: 'firmenevent',
    icon: 'bi-briefcase-fill',
    title: 'Firmenevent',
    kicker: 'Jubiläum, Sommerfest, Weihnachtsfeier',
    short:
      'Von der Examensfeier bis zur Konzernparty: Unternehmen wie Deutsche Bank, Samsung und PwC haben mir ihre Feiern anvertraut.',
    long: [
      'Firmenevents haben ihre eigene Dynamik: Reden, Ehrungen, Programmpunkte – und dann soll die Tanzfläche voll werden. Ich halte mich an Ihren Ablauf, liefere die Technik für Ansprachen und Präsentationen und sorge im richtigen Moment für Stimmung.',
      'Von 30 bis 2000 Gästen war bisher alles dabei – vom Tagungszentrum Marburg bis zur Hessenhalle in Gießen und dem Steigenberger Frankfurter Hof.',
    ],
    facts: ['Funkmikrofon für Reden', 'Ablauf nach Ihrem Programm', 'Von 30 bis 2000 Gästen', 'Bundesweit buchbar'],
    image: 'samsung-crowd',
    imageAlt: 'Große Firmenfeier in einer Industriehalle in blauem Licht',
  },
  {
    slug: 'geburtstag',
    icon: 'bi-balloon-fill',
    title: 'Geburtstag & private Feiern',
    kicker: 'Runde Geburtstage, Jubiläen, Silvester',
    short:
      'Hits aus den 50ern bis zu den aktuellen Charts – damit alle Generationen auf der Tanzfläche zusammenkommen.',
    long: [
      'Ein runder Geburtstag, ein Jubiläum, Silvester im Freundeskreis: Bei privaten Feiern kommt es darauf an, drei Generationen gleichzeitig auf die Tanzfläche zu holen. Mit einem Repertoire von Rock’n’Roll über NDW und Dance Classics bis zu aktuellen Charts gelingt genau das.',
      'Sie bekommen nach einem Kennenlern- bzw. Beratungsgespräch ein kostenfreies, unverbindliches Angebot, das sich nach Ihren Wünschen richtet.',
    ],
    facts: ['Musik für alle Generationen', 'Musikwünsche willkommen', 'Standard-Paket mit Licht', 'Kostenfreies Angebot'],
    image: 'pergola',
    imageAlt: 'Gäste tanzen unter einer Pergola mit Discokugel',
  },
  {
    slug: 'club',
    icon: 'bi-music-note-beamed',
    title: 'Club, Abi & Studentenparty',
    kicker: 'Dauereinsatz bis zum Schluss',
    short:
      'Vom Changó Latin Palace in Frankfurt bis zur Großen Freiheit 36 in Hamburg: House, Hip-Hop, Reggaeton, Salsa und Bachata.',
    long: [
      'Ich bin auch in Clubs anzutreffen – in Marburg, Gießen, Frankfurt, Hamburg und Köln. Wer mich „live“ bei der Arbeit erleben möchte, den lade ich gerne dazu ein. Allerdings entwickelt die Party in einem Club eine ganz andere Dynamik als die auf einer Hochzeit oder einem Privat-Event.',
      'Abi-Feten, Studentenparties und Examensfeiern begleite ich seit vielen Jahren – unter anderem für die Pharmazeuten der Philipps-Universität Marburg.',
    ],
    facts: ['House, Hip-Hop, Reggaeton', 'Salsa, Bachata, Merengue', 'Clubs in Marburg, Gießen, Frankfurt', 'Keine Pausen'],
    image: 'crowd-lasers',
    imageAlt: 'Partycrowd unter pinken und blauen Lichtstrahlen',
  },
];

export const STATS = [
  { value: 10, suffix: '+', label: 'Jahre an den Decks', icon: 'bi-calendar-check', note: 'seit mehr als 10 Jahren' },
  { value: 2000, prefix: '30 – ', label: 'Gäste pro Event', icon: 'bi-people-fill', note: 'Von 30 bis 2000 Gästen war bisher alles dabei.' },
  { value: 4.8, decimals: 1, suffix: ' ★', label: 'Google-Bewertung', icon: 'bi-google', note: 'aus 27 Rezensionen – Stand September 2026', href: 'https://maps.google.com/?cid=11940412044753428638' },
];

export const DECADES = ['50er', '60er', '70er', '80er', '90er', '2000er', 'Aktuelle Charts'];

export const GENRES = [
  'Rock’n’Roll', 'Classic Rock', 'Standardtänze', 'Pop', 'NDW', 'House', 'Dance Classics', 'Eurodance',
  'Electro Swing', 'R&B', 'Hip-Hop', 'Reggae', 'Reggaeton', 'Salsa', 'Bachata', 'Merengue',
];

export const TOP10 = [
  ['James Brown', 'I Got You'],
  ['Pharrell Williams', 'Happy'],
  ['Dr. Alban', 'Sing Hallelujah!'],
  ['Robin Thicke', 'Blurred Lines'],
  ['Prince', 'Kiss'],
  ['Amy Winehouse', 'Valerie'],
  ['Justin Timberlake', 'Can’t Stop The Feeling'],
  ['Mark Ronson', 'Uptown Funk'],
  ['Chubby Checker', 'Let’s Twist Again'],
  ['Blues Brothers', 'Everybody Needs Somebody'],
];

export const EQUIPMENT = [
  { name: 'Pioneer DDJ-SZ', caption: 'Professioneller DJ-Controller von Pioneer', image: 'eq-ddj-sz', icon: 'bi-disc' },
  { name: 'Pioneer DDJ-RZ', caption: 'Professioneller DJ-Controller', image: 'eq-ddj-rz', icon: 'bi-disc' },
  { name: 'Traktor X1 & Z1', caption: 'Das Notfallequipment ist immer dabei.', image: 'eq-traktor', icon: 'bi-shield-check' },
  { name: 'iPad Mini', caption: 'mit Traktor DJ-Software', image: 'eq-ipad', icon: 'bi-tablet' },
  { name: 'MacBook Pro', caption: 'Die Musikbibliothek – von den 50ern bis heute', image: 'eq-macbook', icon: 'bi-laptop' },
  { name: 'Sennheiser HD-25 II', caption: 'Der Klassiker', image: 'eq-hd25', icon: 'bi-headphones' },
  { name: 'RCF Evox 8', caption: 'Säulen-PA für Räume bis mehrere hundert Gäste', image: 'eq-evox8', icon: 'bi-speaker-fill' },
  { name: 'PL-Audio F12', caption: 'Topteil für große Säle', image: 'eq-f12', icon: 'bi-speaker-fill' },
  { name: 'PL-Audio „Gorilla“-Bass', caption: 'Subwoofer für die große Tanzfläche', image: 'eq-gorilla', icon: 'bi-soundwave' },
  { name: 'Funkmikrofon', caption: 'Handlich & praktisch – für Reden und Ansprachen', image: 'eq-mic', icon: 'bi-mic-fill' },
  { name: 'Cameo Multi PAR COB1', caption: 'LED-Bar für die Beleuchtung der Tanzfläche', image: 'eq-cameo', icon: 'bi-lightbulb-fill' },
];

export const REFERENCES = {
  firmen: [
    'AXA Investments', 'Brunswick Review', 'Deutsche Bank', 'Elavon', 'E-Plus', 'IG METALL', 'Kühne + Nagel',
    'McDonald’s', 'Mercedes Benz', 'PASCOE', 'PwC', 'Samsung', 'Upstairs – Agentur', 'Vero Moda',
  ],
  clubs: [
    { city: 'Marburg', names: ['5 Jahreszeiten', 'Knubbel', 'Nachtsalon', 'Studio C/Market', 'Till Dawn'] },
    { city: 'Gießen / Wetzlar', names: ['Admiral Music Lounge', 'Alpenmax', 'Event Werkstatt Wetzlar', 'Monkeys'] },
    { city: 'Frankfurt am Main', names: ['Brotfabrik', 'Changó Latin Palace', 'Orange Peel', 'Tanzschule Conexión'] },
    { city: 'Hamburg', names: ['Café Seeterrassen', 'Große Freiheit 36', '„WiWi-Bunker“'] },
    { city: 'Köln', names: ['Petit Prince'] },
    { city: 'Cancún, México', names: ['Club Daddy’O', 'Hard Rock Cafe Cancún'] },
  ],
  locations: [
    'VILA VITA Marburg', 'Hofgut Dagobertshausen', 'Congresszentrum Marburg', 'Tagungszentrum Marburg',
    'Hessenhallen Gießen', 'Hotel Dolce Bad Nauheim', 'Steigenberger Frankfurter Hof', 'Hotel Süllberg Hamburg',
    'Romanfabrik Frankfurt', 'Hausbar Frankfurt', 'Tafelspitz Offenbach am Main',
  ],
};

export const TESTIMONIALS = [
  {
    type: 'quote',
    text: 'Erick war unser Hochzeit-DJ und wir können ihn jedem nur wärmstens empfehlen: Erster Kontakt, Kennenlerngespräch und die weiteren Vorbereitungen waren unkompliziert und entspannt. Unsere Playlist hat er super eingearbeitet, ist am Abend auch auf alle Wünsche der Gäste eingegangen und hat bis in die frühen Morgenstunden für eine super Stimmung und volle Tanzfläche gesorgt!',
    who: 'Matthias R.',
    where: 'Hochzeit · Google-Rezension',
    rotate: 1.5,
  },
  {
    type: 'photo',
    image: 'note-jessi-michi',
    alt: 'Handgeschriebene Dankeskarte von Jessi und Michi',
    text: 'Lieber Erick, wir sind sehr froh, dass Du heute unsere Hochzeit musikalisch unterstützt. Alles ist toll! Musikwünsche werden angenommen, das finden die Gäste gut :) Vielen lieben Dank',
    who: 'Jessi ♥ Michi',
    where: 'Hochzeit',
    rotate: -2.5,
  },
  {
    type: 'quote',
    text: 'Wir hatten Erick als DJ für unsere Firmenweihnachtsfeier engagiert. Bisher gab es bei Firmenfeiern noch nie einen DJ, daher wussten wir nicht, wie das gemischte Publikum reagieren würde. Erick hat das ganz toll gemacht. Er hat mit Geschick und Feingefühl die richtigen Songs ausgewählt und damit die Tanzfläche gefüllt.',
    who: 'Ingeborg Artmann',
    where: 'Firmenweihnachtsfeier · Google-Rezension',
    rotate: -1,
  },
  {
    type: 'quote',
    text: 'Vielen Dank fürs Auflegen auf unserer Hochzeit! Erick hat ein gutes Gespür für die passende Musik zu jedem Zeitpunkt, unsere individuellen Wünsche und die unserer Gäste hat er außerdem wunderbar miteingeflochten. Dieser DJ ist jeden Cent wert :)',
    who: 'Bernadette Hänsler',
    where: 'Hochzeit · Google-Rezension',
    rotate: 2,
  },
  {
    type: 'photo',
    image: 'card-juana-david',
    alt: 'Dankeskarte von Juana und David Hempler mit drei Hochzeitsfotos',
    text: 'Vielen Dank für die tolle Unterstützung bei unserer Hochzeit! Es war ein unvergesslicher Tag!',
    who: 'Juana & David Hempler',
    where: 'Hochzeit',
    rotate: -1.5,
  },
  {
    type: 'quote',
    text: 'Erick hat vom Start um 21:30 Uhr bis zum Ende um 4:30 Uhr die Tanzfläche zum Beben gebracht: alle Gäste von 14 bis 78 Jahren und wir als Gastgeber waren total begeistert. Habe auch von vielen Gästen das Feedback bekommen, dass Erick der beste DJ war, den sie bisher erlebt haben.',
    who: 'Martin Vey',
    where: 'Party im 5 Jahreszeiten, Marburg · Google-Rezension',
    rotate: 1,
  },
  {
    type: 'quote',
    text: 'DJ Erick ist super sympathisch, nett und professionell. Aufbau und Soundcheck liefen auf unserer Hochzeit super und alles war deutlich vor Beginn fertig. Er hat es geschafft, dass die gesamte Hochzeitsgesellschaft schon direkt nach dem Hochzeitstanz auf der Tanzfläche war und ohne Unterbrechung bis früh am Morgen getanzt wurde.',
    who: 'Fabian Maximilian',
    where: 'Hochzeit · Google-Rezension',
    rotate: -2,
  },
  {
    type: 'photo',
    image: 'note-sophie',
    alt: 'Handgeschriebener Zettel: Der Wahnsinn, vielen vielen Dank, Sophie',
    text: 'Der WAHNSINN – vielen, vielen Dank',
    who: 'Sophie',
    where: 'Geburtstag',
    rotate: 2.5,
  },
  {
    type: 'quote',
    text: 'Erick ist ein großartiger DJ, er weiß wirklich, wie man sanfte Übergänge von einem Song zum anderen so macht, dass die Atmosphäre magisch wirkt.',
    who: 'Alina-Miguel Müller-Aguirre',
    where: 'Google-Rezension',
    rotate: -1,
  },
];

export const GALLERY = [
  { image: 'hero-crowd', alt: 'Hochzeitsgäste jubeln auf der Tanzfläche', caption: 'Hochzeit – die Tanzfläche um Mitternacht', span: 2 },
  { image: 'setup', alt: 'Der Aufbau: beleuchtetes DJ-Pult mit Säulenlautsprechern', caption: 'Der Aufbau – Standard-Paket', span: 1 },
  { image: 'samsung-stage', alt: 'Bühne bei einem Samsung-Firmenevent in Berlin', caption: 'Firmenevent Samsung, Berlin', span: 1 },
  { image: 'wedding-table', alt: 'DJ-Tisch bei einer Hochzeit im Freien', caption: 'Hochzeit im Freien, Gießen', span: 1 },
  { image: 'salsa', alt: 'Salsa-Tänzer auf einer vollen Tanzfläche', caption: 'Salsa-Nacht', span: 1 },
  { image: 'beams-venue', alt: 'Hochzeitsparty in einer Holzscheune bei Nacht', caption: 'Hochzeit in der Scheune', span: 2 },
  { image: 'kassel-ballroom', alt: 'Ballsaal in Kassel mit Kronleuchter in rotem Licht', caption: 'Ballsaal, Kassel', span: 1 },
  { image: 'balloons', alt: 'Leuchtende Ballons steigen in den Nachthimmel', caption: 'Ballons um Mitternacht', span: 1 },
  { image: 'dvm-atrium', alt: 'Modernes Atrium mit Lichtringen vor der VIP-Party', caption: 'VIP DJ Party DVM', span: 1 },
  { image: 'erick-decks', alt: 'Erick Hernández an den Pioneer-Decks', caption: 'An den Decks, Marburg', span: 1 },
  { image: 'samsung-sign', alt: 'Beleuchtetes Samsung-Logo bei Nacht', caption: 'Samsung, Hessen', span: 1 },
  { image: 'wedding-bw', alt: 'DJ hinter dem MacBook bei einer Hochzeit im Freien, schwarz-weiß', caption: 'Hochzeit im Grünen', span: 1 },
  { image: 'crowd-beams', alt: 'Partycrowd unter violetten Lichtstrahlen', caption: 'Clubnacht', span: 2 },
  { image: 'samsung-crowd', alt: 'Große Menschenmenge bei einem Firmenevent', caption: 'Firmenevent, Berlin', span: 1 },
  { image: 'ballroom-table', alt: 'Gedeckter Tisch mit Kerzenständer und rosa Blumen', caption: 'Hochzeitssaal, Gießen', span: 1 },
  { image: 'pergola', alt: 'Tanzende Gäste unter einer Pergola', caption: 'Hochzeit, Marburg-Biedenkopf', span: 1 },
];

export const FAQ = [
  {
    q: 'Wer steckt hinter DJ Erick?',
    a: 'Mein Name ist Erick Hernández. Ich lege seit mehr als 10 Jahren als DJ auf – vor allem in Gießen, Marburg und Frankfurt, aber auch deutschlandweit. Bei Ihrer Feier stehe ich persönlich an den Decks.',
  },
  {
    q: 'Welche Kosten kommen auf mich zu?',
    a: 'Jede Veranstaltung – ob Hochzeit, Geburtstag oder Firmenevent – ist einzigartig. Ich erstelle Ihnen nach einem Kennenlern- bzw. Beratungsgespräch ein auf Ihre Feier abgestimmtes, kostenfreies und unverbindliches Angebot.',
  },
  {
    q: 'Kann man dich „live“ bei der Arbeit erleben?',
    a: 'Natürlich, ich bin auch in Clubs anzutreffen. Gerne lade ich Sie dazu ein. Allerdings entwickelt die Party in einem Club eine ganz andere Dynamik als die auf einer Hochzeit oder einem Privat-Event.',
  },
  {
    q: 'Machst du Pausen während der Arbeit?',
    a: 'Nur wenn es im Event-Programm vorgesehen ist. Im Gegensatz zu Bands sind DJs im Dauereinsatz.',
  },
  {
    q: 'Was passiert, wenn du krank wirst?',
    a: 'Als DJ ist die Wahrscheinlichkeit eines krankheitsbedingten Ausfalls sehr gering. Als selbstständiger Event-DJ lebe ich von meinem Ruf und bin darauf angewiesen, dass glückliche Kunden eine Empfehlung für mich aussprechen. Nichtsdestotrotz bleibt immer ein geringes Restrisiko. Dafür habe ich ein gutes Netzwerk, das mir – sollte der Fall eines DJ-Ausfalls eintreten – eine schnelle Lösung durch einen kompetenten DJ-Kollegen ermöglicht. Weitere Kosten entstehen für Sie dadurch nicht.',
  },
  {
    q: 'Können wir dich auch in Hamburg, Berlin, Köln oder München buchen?',
    a: 'Ich bin deutschlandweit unterwegs und freue mich immer über neue Locations in anderen Städten. Durch die längeren Anfahrten, die damit verbundenen Anfahrtskosten und ein oder zwei Übernachtungen kommen jedoch höhere Kosten auf Sie zu. Sprechen Sie mich einfach darauf an. Gerne empfehle ich Ihnen auch kompetente Kollegen aus der Region.',
  },
  {
    q: 'Bringst du Licht- und Tontechnik mit?',
    a: 'Ja, auf Wunsch. In Sachen Licht- und Tontechnik mache ich keine Kompromisse und arbeite ausschließlich mit hochqualitativem Equipment von marktführenden Herstellern. Die genauen Komponenten des Techniksets, das ich auf Ihrer Feier verwende, bespreche ich im Vorfeld mit Ihnen.',
  },
  {
    q: 'Empfiehlst du auch andere Dienstleister?',
    a: 'Gerne empfehle ich professionelle Dienstleister – Fotografen, Musiker, Cocktail-Service, Caterer, Locations und mehr –, die Ihnen bei der Planung, Gestaltung und Durchführung Ihres Events behilflich sind.',
  },
];

export const EVENT_TYPES = ['Hochzeit', 'Firmenevent', 'Geburtstag', 'Silvester', 'Abi-Party / Studentenparty', 'Club', 'Sonstiges'];

export const CITIES = [
  'Alsfeld', 'Bad Hersfeld', 'Bad Homburg', 'Bad Nauheim', 'Bad Wildungen', 'Biedenkopf', 'Butzbach', 'Cölbe',
  'Frankenberg', 'Frankfurt', 'Friedberg', 'Fulda', 'Gießen', 'Hanau', 'Herborn', 'Kassel', 'Kirchhain',
  'Königstein', 'Korbach', 'Lich', 'Limburg', 'Marburg', 'Neu-Isenburg', 'Schwalmstadt', 'Siegen',
  'Stadtallendorf', 'Wetzlar', 'Wiesbaden',
];
