/* Expeditie Werkplezier – content data
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
      "In een kleine groep werk je aan de thema's die jouw balans beïnvloeden. Je koppelt theorie aan de praktijk van je eigen leven en leert daadwerkelijk nieuw gedrag inzetten – met de steun van vrouwen die precies weten hoe het voelt.",
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
      "Advies en trainingen voor organisaties die hun mensen – en juist de werkende moeders in hun team – echt willen ondersteunen. Zodat medewerkers met plezier blijven werken en de kans op uitval daalt.",
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

/* --- Echte reviews (ervaringen) ---
   Verzameld van klanten van Expeditie Werkplezier. Portretten zijn anonieme
   illustraties (review-1..6) – mensen blijven vaak liever anoniem. Elke review
   heeft een korte pull-quote (quote) en, waar beschikbaar, het hele verhaal (full). */
const REVIEWS = [
  {
    id: "karin", name: "Karin Aafjes", role: "Ondernemer", rating: 5, portrait: 5,
    quote: "Een van de grootste shifts voor mij was het loslaten van perfectionisme. Daardoor ervaar ik meer rust, heb ik meer grip op mijn gevoel en geniet ik weer van kleine dingen.",
    full: [
      "In eerste instantie dacht ik dat ik er met rust wel zou komen, maar ergens voelde ik dat ik hulp nodig had. Na het lezen van de website en het e-book wist ik dat dit precies was wat ik nodig had.",
      "Tijdens het traject heb ik geleerd om beter mijn rust te pakken en hulp te vragen. Ik maak nu bewustere keuzes, laat de boel de boel en durf beter mijn grenzen aan te geven. Een van de grootste shifts voor mij was het loslaten van perfectionisme – ik besef dat het ook op een andere manier goed genoeg is. Daardoor ervaar ik meer rust, heb ik meer grip op mijn gevoel en ik geniet weer van kleine dingen.",
      "Wat me vooral is bijgebleven, is hoeveel er voor mij is veranderd in hoe ik met mezelf en mijn situatie omga. Ik ben ervan overtuigd dat ik zonder dit traject niet zo snel de stap naar mijn eigen bedrijf had gezet.",
    ],
  },
  {
    id: "shalini", name: "Shalini Siwpersad", role: "Adviseur/manager projectbeheersing · 39", rating: 5, portrait: 2,
    quote: "Ik ben zo dankbaar dat ik jou heb leren kennen en voor de inzichten. Zonder jou was ik niet de persoon die ik vandaag ben.",
    full: [
      "Lieve Agathe, ik wilde je even laten weten hoe blij ik ben met onze sessies van vorig jaar. Ik denk er nog vaak aan terug. Je hebt me zo enorm geholpen – door onze gesprekken ben ik een sterker mens geworden.",
      "Ik voel me stabiel en sterk, weet steeds beter mijn grenzen aan te geven en focus op de dingen die ik echt belangrijk vind. Op het werk gaat het goed; ik heb een mooie kans gekregen om met een nieuwe functie te starten. Dat komt echt door jouw begeleiding.",
      "Ik ben zo dankbaar dat ik jou heb leren kennen en voor de inzichten die ik heb gekregen. Nogmaals superveel dank!",
    ],
  },
  {
    id: "elsbeth", name: "Elsbeth P.", role: "Moeder van een zoon (19) en dochter (14) · 44", rating: 5, portrait: 4,
    quote: "Ik voel me zelfverzekerder, kan mijn grenzen beter aangeven en ik voel dat ik veel meer kan bereiken dan ik voorheen dacht. Dit geeft mij moed om door te gaan.",
    full: [
      "Voordat ik bij Agathe kwam, kon ik mijn emoties niet onder woorden brengen. Ik ging helemaal op in negatieve gevoelens, voelde me onzeker en had moeite om beslissingen te nemen.",
      "Agathe had geduld. Ze leerde mij zelf na te denken over mijn problemen. Ik heb haar ervaren als een warm persoon die het beste met mij voorhad. In de sessies zijn we echt de diepte ingedoken en kwam ik snel tot de kern.",
      "De grootste ontwikkeling is dat ik minder afhankelijk ben van anderen en veel zelfstandiger en zelfverzekerder ben geworden. Mijn grootste inzicht: ik kan meer bereiken dan ik dacht. Al met al ervaar ik meer rust en vertrouwen dat wat ik doe goed genoeg is.",
    ],
  },
  {
    id: "km", name: "K.M.", role: "Senior sales- & business development manager · moeder van twee · 39", rating: 5, portrait: 3,
    quote: "Ik ben blijer, energieker en meer gefocust. Ik krijg meer gedaan op een dag en dit geeft voldoening en rust. Dit straalt direct door naar mijn gezin. Kortom: win-win-win!",
    full: [
      "De uitdagingen waar ik tegenaan liep waren divers. Ik ben moeder van twee schatten van kinderen, werk fulltime in een uitdagende functie en heb best wat ballen hoog te houden. Omdat ik vrij perfectionistisch ben, had ik behoefte om me minder schuldig te voelen en beter voor mezelf te zorgen.",
      "Agathe heeft met haar rust alle tijd genomen, vragen gesteld, gespiegeld én theorieën geboden. Het prettige vond ik dat ze zowel op het vlak van opvoeden, op werkgebied als sociaal inzicht zonder oordeel een spiegel voorhoudt.",
      "Na afronding kan ik me weer beter focussen en kiezen welke activiteiten ik wanneer aandacht geef. Ik krijg letterlijk meer gedaan op een dag. Dat brengt rust en geduld, wat direct doorstraalt naar mijn gezin. Ik ben leuker voor mijn gezin én productiever op mijn werk én liever voor mezelf. Win, win, win.",
    ],
  },
  {
    id: "consultant52", name: "Nicolette", role: "Consultant", rating: 5, portrait: 1,
    quote: "Ik voel me goed en energiek. Jouw kennis en kunde en de manier van benaderen heeft mijn vertrouwen versterkt, waardoor ik de juiste keuzes en acties ben gaan inzetten.",
    full: [
      "Je hebt mij in staat gesteld mijn vraagstukken aan te pakken door me bewuster te maken van mijn gedachten, reactie en handelen. Dit heeft me veel rust opgeleverd en nog steeds, een half jaar na het traject, gaat het heel goed met me. Ik heb meer energie dan ooit.",
      "Ik heb je ervaren als benaderbaar, toegankelijk, vertrouwenwekkend en ondersteunend. Je bent een prettig en leuk mens – absoluut geen grijze, muizerige psycholoog.",
      "Je stemt goed af op wie er tegenover je zit en spitst je manier van werken daarop toe. Die combinatie van talenten maakte jou uniek in ons contact.",
    ],
  },
  {
    id: "gva", name: "G.v.A., 26", role: "", rating: 5, portrait: 2,
    quote: "Ik vond de sleutel naar mijn eigen geluk.",
    full: [
      "Ik startte met als belangrijkste doel: voor mezelf durven kiezen en mezelf accepteren. Al lange tijd had ik het gevoel vast te zitten in een leven dat ik eigenlijk niet wilde, in combinatie met een dwang tot perfectie en een laag zelfbeeld.",
      "Ik heb geleerd mezelf te accepteren en mijn perfectionisme deels los te laten. Mijn grootste eyeopener: de enige die iets kon veranderen, was ikzelf. Dat besef voelde eerst zwaar, maar op den duur zag ik het als de sleutel naar geluk.",
      "Agathe's begeleiding was rustig en vriendelijk, maar ook heel direct. Ik had het gevoel dat ik mezelf mocht zijn. The best project you'll ever work on is you!",
    ],
  },
  {
    id: "rk", name: "R.K.", role: "Arbeidshygiënist", rating: 5, portrait: 3,
    quote: "Je hebt me de weg gewezen in de wanorde. Van een vol hoofd naar rust.",
    full: [
      "Je hebt me de weg gewezen in de wanorde door me methodes en technieken te laten zien die helpen bij het beheersbaar houden van stressvolle perioden.",
      "Je neemt geen genoegen met het eerste antwoord, maar prikt door tot de kern is bereikt. De rust die je uitstraalt komt fijn over en je werkt respectvol – dat geeft een veilig gevoel.",
      "Ik kwam binnen met een hoofd vol dingen. Nu is het veel rustiger en heb ik tools om dat zo te houden. Ik heb er veel vertrouwen in dat het gaat lukken. En ik heb er weer zin in!",
    ],
  },
  {
    id: "lh", name: "L.H., 27", role: "", rating: 5, portrait: 4,
    quote: "Ik kon mijn belemmerende gedachten ombuigen en hierdoor mijn ‘pusherige ik’ vervangen voor een ‘ik’ die veel functioneler is.",
    full: [
      "Ik ervoer stress doordat ik mezelf te veel druk oplegde. Die stress vertaalde zich in lichamelijke klachten – de aanleiding om een traject bij Agathe te starten.",
      "Ik heb geleerd om te gaan met belemmerende gedachten: ik kan ze nu beter afremmen en in een andere richting sturen. Daardoor voel ik me lichamelijk een stuk beter en ga ik makkelijker om met stressvolle situaties.",
      "Ik voelde me serieus genomen. Je staat nuchter in het leven en begrijpt dat 2 uur mindfulness niet voor iedereen de oplossing is. Het heeft me enorm geholpen!",
    ],
  },
  {
    id: "ellen", name: "Ellen", role: "Directiesecretaresse", rating: 5, portrait: 6,
    quote: "Agathe hield me een spiegel voor. Ik kreeg heldere inzichten waardoor ik weer plezier kreeg in mijn werk. Mijn work-life balance verbeterde waardoor ik meer energie kreeg.",
    full: [
      "De sessies bij Agathe hebben mij erg goed gedaan. Al enkele jaren liep ik te tobben, was oververmoeid en had geen energie om leuke dingen te doen. Negatieve gevoelens kregen de overhand.",
      "Aan de hand van praktische oefeningen werd duidelijk hoe ik op diverse zaken reageerde. Agathe hield me een spiegel voor waarmee ik aan de slag kon.",
      "Met behulp van de coaching heb ik weer plezier in mijn werk. De work-life balance is verbeterd waardoor ik weer meer energie heb.",
    ],
  },
  {
    id: "sema", name: "Sema", role: "Communicatieadviseur", rating: 5, portrait: 2,
    quote: "Je hebt me laten ervaren dat ik er als individu mag zijn. Ik begon weer in mijzelf te geloven en heb een geweldige nieuwe baan gevonden.",
    full: [
      "Jij hebt mij het inzicht gegeven dat ik er als individu mag zijn. Ik begon weer in mezelf te geloven. Dankzij het traject heb ik voor mezelf durven kiezen, een punt achter mijn vorige baan gezet en een nieuwe baan gevonden.",
      "Je hebt me aan het denken gezet om dieper te graven, kritisch naar mezelf te kijken en in verbinding te komen met mezelf. Je blijft objectief en benadert de zaken vanuit alle kanten.",
      "Ik vind je een warm en hartelijk persoon. Zelfs na afronding blijf je interesse tonen en vraag je hoe het gaat. Dat vind ik zo bijzonder aan jou.",
    ],
  },
  {
    id: "it29", name: "Vrouw, 29", role: "IT Consultant", rating: 5, portrait: 6,
    quote: "Ik ben er beter en sterker uitgekomen voor de rest van mijn leven.",
    full: [
      "Jong, energiek en niet te stoppen – zo was ik. Tot ik op mijn 26ste last kreeg van vreemde lichamelijke klachten die ik niet kon plaatsen: kortademig, hoofdpijn, duizeligheid en een heel afwezig gevoel.",
      "Medisch bleek alles in orde, maar ik was geen stap verder. Vanuit mijn werkgever startte ik een traject met een psycholoog – zo kwam ik bij Agathe. Samen werkten we aan een persoonlijk plan.",
      "Zelfs een jaar later merk ik nog profijt. Ik heb leren omgaan met mijn gedachtegang in specifieke situaties. Agathe komt over als iemand met kennis van zaken, en als persoon iemand bij wie je je gemakkelijk openstelt.",
    ],
  },
  {
    id: "pc", name: "P.C., 31", role: "", rating: 5, portrait: 5,
    quote: "Je bent een anker of spiegel waartegen ik hardop kan reflecteren over mijn gedachtegang. Je hebt me meegenomen op mijn persoonlijke ontdekkingsreis.",
    full: [
      "Hoewel het programma een gestructureerd pad is, schroom jij je niet ervan af te wijken wanneer je denkt dat ik daar beter bij geholpen ben. Flexibel ingesteld, zonder hierin door te schieten.",
      "Je denkt verder dan het programma en geeft handvatten daarbuiten. Ik vind het prettig dat je me deelgenoot maakt van waar je naartoe wilt met je vragen. Dat maakt een sessie minder zweverig en ik kan gerichter nadenken over het antwoord.",
    ],
  },
  {
    id: "rvd", name: "R.v.D., 45", role: "", rating: 5, portrait: 4,
    quote: "Tijdens het traject heb ik mezelf volledig teruggevonden. Ik was al mijn motivatie en enthousiasme kwijt, maar heb dit volledig teruggevonden. Net als mijn energie.",
    full: [
      "Voordat ik startte had ik enorm last van het feit dat ik al mijn motivatie en enthousiasme kwijt was. Ik had geen doel meer en voelde me lusteloos en enorm vermoeid.",
      "Gedurende het traject heb ik gerust, gesport en meer tijd voor mezelf vrijgemaakt. Het werd duidelijk wat ik wilde. Ik heb mezelf weer teruggevonden – en ook mijn positieve energie, enthousiasme en motivatie.",
      "Ik had direct het gevoel dat ik echt mijn ei kwijt kon bij Agathe. Tijdens dit traject heb ik geleerd mijn grenzen aan te geven en dat geeft echt rust.",
    ],
  },
  {
    id: "nh", name: "N.H., 37", role: "", rating: 5, portrait: 3,
    quote: "Ik voel me veel meer ontspannen. Je bent voor mij uniek omdat je me echt met een andere bril hebt leren kijken. Ik wist niet dat dit zo veel invloed kon hebben op hoe ik me voel.",
    full: [
      "Ik heb je ervaren als iemand die graag anderen helpt in moeilijke tijden. Voor mij heb je veel betekend, omdat je me weer op de goede weg hebt gezet waar ik even van af was gegleden.",
      "Je grootste talenten: je kunt heel goed luisteren en je goed inleven. Je hebt me op een andere manier leren denken – een manier waar ik zelf nooit op zou komen.",
      "Ik voel me een stuk rustiger in mijn werk en ervaar veel minder druk. Het is er nog wel, maar ik ga er echt anders mee om.",
    ],
  },
  {
    id: "kvb", name: "K.v.B., 53", role: "Automatiseerder", rating: 5, portrait: 1,
    quote: "Ik heb de teugels van mijn eigen leven weer in handen en voel me beter dan ooit.",
    full: [
      "Na onze gesprekken is er veel gebeurd. Door jouw begeleiding heb ik de teugels van mijn eigen leven weer in eigen handen gekregen. Ik voel me veel beter, en volgens mijn werkgever straal ik dat ook uit.",
      "Je laat zien dat er meerdere manieren zijn om naar een situatie te kijken. Dat genereert positiviteit en leidt tot inzichten om tot oplossingen te komen. Je grootste talenten zijn je positieve uitstraling en de oprechte aandacht die je geeft.",
      "Ik heb heel veel gehad aan jouw hulp en ben je er erg dankbaar voor.",
    ],
  },
  {
    id: "ro", name: "R.O.", role: "", rating: 5, portrait: 2,
    quote: "Agathe is een coach pur sang. Ik heb absoluut meer inzicht gekregen in mijn gedrag, drijfveren en valkuilen en kan nu veel beter mijn grenzen aangeven en bewaken.",
    full: [
      "Het totale traject heb ik niet alleen als heel zinvol, maar ook als erg prettig ervaren. Agathe is in haar benadering heel beheerst, rustig en weldadig relaxt. Hierdoor voelde ik me direct bij de intake op mijn gemak.",
      "Doordat zij kalm en intensief luistert, voel je je gehoord. Een grote kwaliteit is dat zij stuurt zonder dat je je daarvan bewust bent. Ergo: een coach pur sang.",
      "De rode draad van mijn valkuilen was die van een ‘pleaser’. Nu ik een aantal keer duidelijk ‘nee’ heb verkocht, merk ik dat dit juist vrijwel altijd begrepen en geaccepteerd wordt.",
    ],
  },
  {
    id: "instrumentmaker", name: "Vrouw", role: "Instrumentmaker", rating: 5, portrait: 5,
    quote: "Ik sta weer in mijn kracht door deze resultaatgerichte coaching. Agathe’s manier van begeleiden werkt snel en effectief waardoor mijn stress al snel verminderde.",
    full: [
      "Mijn reden van aanmelding: burn-out, zowel fysiek als mentaal het gevoel op een dood punt te zijn, ondanks een prettige werksfeer.",
      "De methode bestond uit drie sessies van drie à vier uur, waarin verleden, heden en toekomst worden besproken. De sessies leken me aanvankelijk lang, maar bleken juist door hun lengte zeer effectief.",
      "Ik leerde hoe ik beter in mijn eigen kracht kan staan, situaties positiever kan benaderen en stress kan verminderen. Ik vond Agathe betrouwbaar, professioneel en to the point – zonder dat dit ten koste ging van warmte en betrokkenheid.",
    ],
  },
];

const reviewById = Object.fromEntries(REVIEWS.map((r) => [r.id, r]));
const pickReviews = (ids) => ids.map((id) => reviewById[id]).filter(Boolean);

/* Curated subsets per surface (distinct portraits within each set) */
const TESTIMONIALS = pickReviews(["km", "shalini", "consultant52", "rvd", "ellen"]);
const OA_REVIEWS = pickReviews(["consultant52", "sema", "km"]);
const DEEPDIVE_REVIEWS = pickReviews(["gva", "rk", "ro"]);
const TRAJECT_REVIEWS = pickReviews(["sema", "consultant52", "nh", "it29"]);
const BEDANKT_REVIEWS = pickReviews(["km", "gva", "nh"]);

/* --- Blog posts --- */
const POSTS = [
  {
    cat: "Rust in je hoofd",
    accent: "sage",
    title: "Waarom jouw to-do-lijst nooit af is (en dat oké is)",
    excerpt:
      "Het gevoel dat je nooit klaar bent, herken je dat? In dit artikel deel ik waarom je hoofd zo vol zit – en drie manieren om weer overzicht te krijgen.",
    read: "5 min",
    date: "12 mei 2026",
  },
  {
    cat: "Energie",
    accent: "rose",
    title: "Het emmertje dat overloopt: zo herken je de signalen op tijd",
    excerpt:
      "Burn-out komt zelden uit het niets. Deze subtiele signalen geeft je lijf af – lang voordat het licht uitgaat.",
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
    title: "Nee zeggen zonder schuldgevoel – een kleine handleiding",
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
    a: "Voor ambitieuze, werkende moeders met jonge kinderen die een uitdagende baan of eigen onderneming combineren met hun gezin – en merken dat het te veel wordt. Herken je je daarin? Dan ben je hier op de juiste plek.",
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
    a: "Helemaal logisch. Begin gerust met het gratis ebook, of plan een vrijblijvende kennismaking. Geen verplichtingen – gewoon even kennismaken en kijken of het klikt.",
  },
];

/* --- Trust / social proof stats --- */
const TRUST = [
  ["20+", "jaar als psycholoog & HR"],
  ["150+", "moeders begeleid"],
  ["4,9", "gemiddelde waardering"],
  ["1", "eerlijk verhaal, uit ervaring"],
];

/* --- 1-op-1 programmanaam --- */
const PROGRAMMA = {
  naam: "Rust Ruimte Regie",
  sub: "Het complete 1-op-1 herstel- en groeitraject",
};

/* --- Home testimonials --- */
const HOME_REVIEWS = pickReviews(["karin", "shalini", "consultant52"]);

Object.assign(window, { TRAJECTEN, TESTIMONIALS, REVIEWS, pickReviews, OA_REVIEWS, DEEPDIVE_REVIEWS, TRAJECT_REVIEWS, BEDANKT_REVIEWS, POSTS, FAQ, TRUST, HOME_REVIEWS, PROGRAMMA });
