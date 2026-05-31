/* Expeditie Werkplezier – Gratis Stress & Energiescan salespagina */
const { useState: useScanState } = React;

const SCAN_GAINS = [
  ["bar-chart-3", "sky", "Inzicht in jouw stressprofiel",
    "Je ziet precies hoe jouw stress zich op dit moment laat zien."],
  ["heart-pulse", "rose", "Begrip van je klachten",
    "Je begrijpt waar die vermoeidheid, prikkelbaarheid en onrust vandaan komen."],
  ["hand-heart", "sage", "Erkenning",
    "Je stopt met denken dat het aan jou ligt."],
  ["footprints", "gold", "Concrete eerste stappen",
    "Je weet wat jij nu nodig hebt om je systeem tot rust te brengen."],
  ["wind", "sky", "Meer rust in je hoofd",
    "Vaak al direct na de scan voelbaar."],
];

const SCAN_REVIEWS = [
  "Ik dacht echt dat het aan mij lag. Maar door de uitleg viel alles op zijn plek. Dat gaf zoveel rust in mijn hoofd.",
  "Ik functioneerde nog wel, maar alles kostte me zoveel energie. De scan liet me zien wat er écht speelde.",
  "Door dit inzicht kon ik eindelijk stoppen met mezelf pushen.",
];

const SCAN_VOORWIE = [
  "een gedreven moeder bent die werkt in een kennisintensieve organisatie of onderneming",
  "veel verantwoordelijkheid draagt, op je werk én thuis",
  "dingen graag goed wilt doen en snel een stapje verder gaat",
  "niet meer continu “aan” wilt staan, maar niet weet hoe je dat stopt",
  "gewend bent om door te gaan, ook als het eigenlijk te veel wordt",
  "steeds kortaf reageert en je je daar vervolgens schuldig over voelt",
  "het gevoel hebt dat je tekortschiet, terwijl je zo je best doet",
];

const SCAN_FAQ = [
  { q: "Is dit gratis?",
    a: "Ja, volledig gratis. Je vult je naam en e-mailadres in en krijgt direct toegang. De scan bestaat uit een korte vragenlijst. Na het berekenen van de score weet je waar jouw grootste lichamelijke, mentale of emotionele uitdagingen liggen – met handvatten om de eerste stappen te zetten." },
  { q: "Hoe lang duurt het?",
    a: "Een paar minuten. Kort en direct waardevol." },
  { q: "Is dit een standaard test?",
    a: "Nee. Je krijgt inzicht in wat er onder jouw klachten ligt, vanuit brein en lichaam. Geen generieke uitslag, maar iets wat echt bij jou past." },
  { q: "Wat als ik veel herken?",
    a: "Dan is dat juist waardevol. Het betekent dat je systeem al een tijdje signalen geeft – en dat je nu weet waar je moet beginnen." },
  { q: "Wat gebeurt er na de scan?",
    a: "Je ontvangt je resultaten direct. Wil je daarna meer weten over hoe je verder kunt? Dan vertel ik je graag meer." },
];

/* Opt-in kaart (hero + afsluiting) – de inschrijving zelf gebeurt op de
   externe checkout (plug&pay), dus dit is een CTA-kaart, geen formulier. */
function ScanOptin({ compact, onCheckout }) {
  return (
    <div className={"ewk-scanform" + (compact ? " ewk-scanform--compact" : "")}>
      <div className="ewk-scanform__head">
        <span className="ewk-scanform__badge"><Icon name="clipboard-list" />Gratis</span>
        <h3>Doe de gratis scan</h3>
        <p>Ontdek in 10 minuten wat er écht speelt – en wat jouw eerste stap is naar meer rust en energie.</p>
      </div>
      <ul className="ewk-scanform__list">
        <li><Icon name="check" />Een paar minuten</li>
        <li><Icon name="check" />Direct inzicht in je inbox</li>
        <li><Icon name="check" />Geen verplichtingen</li>
      </ul>
      <div style={{ marginTop: 20 }}>
        <Button variant="primary" block iconRight="arrow-right" onClick={onCheckout}>Doe de gratis scan</Button>
      </div>
      <p className="ewk-scanform__note">Je wordt doorgestuurd naar een korte, beveiligde aanmelding. Je kunt je altijd weer afmelden.</p>
    </div>
  );
}

function ScanPage({ onNav, onCheckout }) {
  return (
    <main>
      {/* Hero with opt-in */}
      <section className="ewk-hero ewk-hero--quote">
        <div className="ewk-wrap ewk-hero__grid ewk-scan-hero">
          <div>
            <Eyebrow>Gratis Stress &amp; Energiescan</Eyebrow>
            <h1 className="ewk-hero__quote">Ontdek wat er <em>écht speelt</em> in jouw brein en lichaam</h1>
            <p className="ewk-hero__lead">
              Je houdt alles draaiende. Maar je hoofd staat nooit stil en stoppen lukt niet meer. Doe de
              gratis Stress &amp; Energiescan en ontdek in <span className="ewk-key">10 minuten</span> wat
              er onder die vermoeidheid, onrust en prikkelbaarheid ligt.
            </p>
            <ul className="ewk-trj-signals">
              <li><Icon name="check" />Geen standaardtest, maar inzicht dat bij jóu past</li>
              <li><Icon name="check" />Stop met twijfelen aan jezelf</li>
              <li><Icon name="check" />Weet wat je nodig hebt</li>
            </ul>
          </div>
          <ScanOptin onCheckout={onCheckout} />
        </div>
      </section>

      {/* In 10 minuten */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-prose" style={{ margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>In 10 minuten meer rust, overzicht en regie</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 24px" }}>Het rare is: je functioneert nog. Maar het kost je alles.</h2>
          <p>
            Je bent gewend om veel te dragen. Op je werk wordt veel van je gevraagd, en thuis zie jij wat
            er moet gebeuren en pak jij het op. Maar de laatste tijd merk je dat het steeds meer energie
            kost. Je hoofd is nooit echt stil.
          </p>
          <p>
            En hoe harder je probeert om het onder controle te krijgen, hoe minder grip je lijkt te
            hebben. <span className="ewk-key">En ergens weet je: zo wil je je niet blijven voelen.</span>
            De scan laat je zien wat er onder die vermoeidheid ligt – zodat je stopt met twijfelen aan
            jezelf en weet wat je nodig hebt.
          </p>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat je krijgt" title="Concreet inzicht, geen vage uitslag" />
          <div className="ewk-gains">
            {SCAN_GAINS.map(([ic, accent, t, d]) => (
              <div className={"ewk-gain ewk-offer--" + accent} key={t}>
                <span className={"ewk-offer__ic ewk-offer__ic--" + accent}><Icon name={ic} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat andere vrouwen zeggen" title="“Door de uitleg viel alles op zijn plek”" />
          <div className="ewk-testgrid">
            {SCAN_REVIEWS.map((q, i) => (
              <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{[0,1,2,3,4].map((k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{q}</blockquote>
                <figcaption><span className="ewk-testcard__tag"><Icon name="quote" />Uit de Stress &amp; Energiescan</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Voor wie is deze scan?" title="Deze scan is voor jou als je…" />
          <ul className="ewk-trj-recog">
            {SCAN_VOORWIE.map((r) => (
              <li key={r}><span className="ewk-ic ewk-ic--sym"><Icon name="check" /></span>{r}</li>
            ))}
          </ul>
          <p className="ewk-list-note">Herken jij dit? Dan is de scan voor jou.</p>
        </div>
      </section>

      {/* Even voorstellen */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-about">
          <div className="ewk-about__photo"><Portrait size="100%" /></div>
          <div className="ewk-about__text">
            <Eyebrow>Even voorstellen</Eyebrow>
            <h2 className="ewk-h2">Ik ben Agathe, arbeids- en organisatiepsycholoog</h2>
            <p>
              Al meer dan 10 jaar help ik hoogopgeleide vrouwen die vastlopen in de combinatie van werk
              en gezin. Ik heb zelf ook ervaren hoe het is om jezelf daarin kwijt te raken.
            </p>
            <p>
              En wat ik elke dag zie: het gaat niet om harder je best doen. Het gaat om begrijpen wat er
              in je systeem gebeurt. <span className="ewk-key">Dat inzicht is de eerste stap naar rust,
              overzicht en energie.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList items={SCAN_FAQ} />
        </div>
      </section>

      {/* Afsluiting + opt-in */}
      <section className="ewk-finalcta ewk-finalcta--scan">
        <div className="ewk-wrap ewk-scan-close">
          <div className="ewk-scan-close__text">
            <Eyebrow>Tot slot</Eyebrow>
            <h2 className="ewk-h2">Je probeert al lang genoeg alleen</h2>
            <p>
              Als jij ergens voelt dat dit over jou gaat, dan is dit misschien precies wat je nu nodig
              hebt. Niet omdat je het niet alleen kunt – maar omdat je al lang genoeg alleen probeert.
            </p>
          </div>
          <ScanOptin compact onCheckout={onCheckout} />
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ScanPage, ScanOptin });
