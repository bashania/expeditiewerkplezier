/* Expeditie Werkplezier — content data
   All copy in Agathe's warm, first-person Dutch voice. Exported to window. */

/* --- Offerings / trajecten (3-tier aanbod) --- */
const TRAJECTEN = [
  {
    key: "coaching",
    accent: "rose",
    icon: "messages-square",
    kicker: "1-op-1",
    title: "Persoonlijke coaching",
    tagline: "Samen, in jouw tempo, naar meer rust en grip.",
    body:
      "Een intensief 1-op-1 traject waarin we jouw vraagstuk bij de kern aanpakken. Je wordt je bewust van je gedrag en patronen, leert je grenzen kennen én bewaken, en stelt een plan van aanpak op dat bij jóu past.",
    points: [
      "Intakegesprek + 6 sessies van een uur",
      "Online of bij mij in Waddinxveen",
      "Praktische opdrachten tussendoor",
      "App-contact tussen de sessies door",
    ],
    meta: "Traject van 3 maanden",
    cta: "Plan een kennismaking",
  },
  {
    key: "training",
    accent: "sky",
    icon: "users",
    kicker: "In een groep",
    title: "Groepstraining",
    tagline: "Leren van én met andere moeders die het herkennen.",
    body:
      "In een kleine groep werk je aan de thema's die jouw balans beïnvloeden. Je koppelt theorie aan de praktijk van je eigen leven en leert daadwerkelijk nieuw gedrag inzetten — met de steun van vrouwen die precies weten hoe het voelt.",
    points: [
      "4 bijeenkomsten in een vaste groep",
      "Maximaal 8 deelnemers",
      "Werkboek en oefeningen",
      "Blijvend contact na afloop",
    ],
    meta: "Nieuwe groepen elk seizoen",
    cta: "Bekijk de data",
  },
  {
    key: "advies",
    accent: "gold",
    icon: "building-2",
    kicker: "Voor organisaties",
    title: "Advies & inhuis",
    tagline: "Duurzame inzetbaarheid die verder gaat dan een fruitmand.",
    body:
      "Advies en trainingen voor organisaties die hun mensen — en juist de werkende moeders in hun team — echt willen ondersteunen. Zodat medewerkers met plezier blijven werken en de kans op uitval daalt.",
    points: [
      "Workshops en lezingen op maat",
      "Advies op het gebied van werkdruk",
      "Programma's voor (jonge) ouders",
      "Op locatie of online",
    ],
    meta: "Op aanvraag",
    cta: "Vraag een voorstel aan",
  },
];

/* --- Testimonials --- */
const TESTIMONIALS = [
  {
    quote:
      "Je hebt mij in staat gesteld mijn uitdagingen aan te pakken. Dit heeft me veel rust opgeleverd — ik heb meer energie dan ooit. Absoluut geen grijze, muizerige psycholoog.",
    name: "Marleen",
    role: "Consultant · moeder van twee",
    rating: 5,
  },
  {
    quote:
      "Voor het eerst in jaren leg ik mijn laptop écht weg om 17:00. Agathe hielp me zien dat 'goed genoeg' vaak meer dan genoeg is.",
    name: "Esther",
    role: "Teamlead · moeder van één",
    rating: 5,
  },
  {
    quote:
      "Ze stelt precies die ene vraag waar je even stil van wordt. Geen zweverig gedoe, maar concrete stappen die ik de volgende dag al kon zetten.",
    name: "Daniëlle",
    role: "Ondernemer · moeder van drie",
    rating: 5,
  },
  {
    quote:
      "Ik dacht dat moe-zijn er gewoon bij hoorde. Nu weet ik beter. Mijn emmertje loopt niet meer over en ik geniet weer van de kleine dingen.",
    name: "Kim",
    role: "Beleidsadviseur · moeder van twee",
    rating: 5,
  },
  {
    quote:
      "Agathe begrijpt als geen ander hoe het is om een carrière en een gezin te combineren. Ze heeft het zelf meegemaakt — dat voel je in alles.",
    name: "Sanne",
    role: "Manager · moeder van twee",
    rating: 5,
  },
];

/* --- Blog posts --- */
const POSTS = [
  {
    cat: "Rust in je hoofd",
    accent: "sage",
    title: "Waarom jouw to-do-lijst nooit af is (en dat oké is)",
    excerpt:
      "Het gevoel dat je nooit klaar bent, herken je dat? In dit artikel deel ik waarom je hoofd zo vol zit — en drie manieren om weer overzicht te krijgen.",
    read: "5 min",
    date: "12 mei 2026",
  },
  {
    cat: "Energie",
    accent: "rose",
    title: "Het emmertje dat overloopt: zo herken je de signalen op tijd",
    excerpt:
      "Burn-out komt zelden uit het niets. Deze subtiele signalen geeft je lijf af — lang voordat het licht uitgaat.",
    read: "6 min",
    date: "28 april 2026",
  },
  {
    cat: "Loslaten",
    accent: "sky",
    title: "Werk loslaten na 17:00 uur: 5 dingen die mij hielpen",
    excerpt:
      "Mentaal afsluiten is een vaardigheid, geen karaktertrek. Deze vijf rituelen maakten voor mij het verschil.",
    read: "4 min",
    date: "9 april 2026",
  },
  {
    cat: "Grenzen",
    accent: "gold",
    title: "Nee zeggen zonder schuldgevoel — een kleine handleiding",
    excerpt:
      "Grenzen stellen voelt voor veel moeders als egoïsme. Ik leg uit waarom het juist het tegenovergestelde is.",
    read: "5 min",
    date: "21 maart 2026",
  },
  {
    cat: "Genieten",
    accent: "sage",
    title: "Aandacht is het mooiste cadeau (ook aan jezelf)",
    excerpt:
      "‘Alles wat je aandacht geeft groeit.’ Wat gebeurt er als je die aandacht eens naar binnen richt?",
    read: "4 min",
    date: "3 maart 2026",
  },
  {
    cat: "Balans",
    accent: "rose",
    title: "De mythe van de perfecte balans tussen werk en gezin",
    excerpt:
      "Balans is geen weegschaal die altijd recht hangt. Een eerlijk verhaal over schipperen, kiezen en loslaten.",
    read: "7 min",
    date: "16 februari 2026",
  },
];

/* --- FAQ --- */
const FAQ = [
  {
    q: "Voor wie is Expeditie Werkplezier precies?",
    a: "Voor ambitieuze, werkende moeders met jonge kinderen die een uitdagende baan of eigen onderneming combineren met hun gezin — en merken dat het te veel wordt. Herken je je daarin? Dan ben je hier op de juiste plek.",
  },
  {
    q: "Ben je een psycholoog? Krijg ik dan een ‘diagnose’?",
    a: "Ik ben arbeids- en organisatiepsycholoog en stresscoach. Ik werk praktisch en oplossingsgericht, niet met diagnoses of langdurige therapie. We kijken naar wat jou helpt om weer met rust en plezier te leven en werken.",
  },
  {
    q: "Hoe ziet een coachingstraject eruit?",
    a: "We starten met een kennismaking. Daarna volgen we samen een traject van een aantal sessies, met praktische opdrachten ertussendoor en app-contact als je het nodig hebt. Alles in jouw tempo en afgestemd op jouw situatie.",
  },
  {
    q: "Kan het ook online?",
    a: "Zeker. Veel moeders vinden online juist fijn omdat het makkelijk in te plannen is rond werk en gezin. Liever live? Dan ben je welkom bij mij in Waddinxveen.",
  },
  {
    q: "Vergoedt mijn werkgever dit?",
    a: "Steeds vaker wel. Coaching valt regelmatig onder een persoonlijk ontwikkelbudget of duurzame-inzetbaarheidsregeling. Ik denk graag mee over hoe je dit bespreekbaar maakt.",
  },
  {
    q: "Ik twijfel nog of dit iets voor mij is.",
    a: "Helemaal logisch. Begin gerust met het gratis ebook, of plan een vrijblijvende kennismaking. Geen verplichtingen — gewoon even kennismaken en kijken of het klikt.",
  },
];

/* --- Trust / social proof stats --- */
const TRUST = [
  ["10+", "jaar als psycholoog & HR"],
  ["150+", "moeders begeleid"],
  ["4,9", "gemiddelde waardering"],
  ["1", "eerlijk verhaal, uit ervaring"],
];

/* --- 1-op-1 programmanaam --- */
const PROGRAMMA = {
  naam: "Rust Ruimte Regie",
  sub: "Het complete 1-op-1 herstel- en groeitraject",
};

/* --- Home testimonials (rewritten homepage) --- */
const HOME_REVIEWS = [
  {
    name: "Karin Aafjes", role: "Ondernemer", rating: 5,
    quote:
      "Tijdens het traject heb ik geleerd om beter mijn rust te pakken en hulp te vragen. Ik maak nu bewustere keuzes, laat de boel de boel en durf mijn grenzen aan te geven. De grootste shift was het loslaten van perfectionisme — ik geniet weer van de kleine dingen. Zonder dit traject had ik niet zo snel de stap naar mijn eigen bedrijf gezet.",
  },
  {
    name: "K.M.", role: "Senior Sales- & Business Development Manager", rating: 5,
    quote:
      "Ik was moe en gespannen en had moeite om alle ballen in de lucht te houden: een fulltime baan, twee jonge kinderen en een druk sociaal leven. Door Agathe heb ik geleerd betere keuzes te maken en zonder schuldgevoel aandacht te geven aan wat belangrijk is. Ik voel me blijer, meer in balans en krijg zelfs meer gedaan op een dag — echt een win-win-win.",
  },
  {
    name: "Nicolette", role: "Consultant", rating: 5,
    quote:
      "Agathe heeft mij geholpen bewuster te worden van mijn gedachten, reacties en gedrag, waardoor ik mijn vraagstukken echt kon aanpakken en veel meer rust ervaar. Bijzonder is dat dit effect een half jaar later nog steeds merkbaar is. Benaderbaar, toegankelijk en vertrouwenwekkend — en ze houdt je op een prettige manier een spiegel voor.",
  },
];

Object.assign(window, { TRAJECTEN, TESTIMONIALS, POSTS, FAQ, TRUST, HOME_REVIEWS, PROGRAMMA });
