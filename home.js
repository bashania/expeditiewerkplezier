/* Expeditie Werkplezier — Home (rewritten copy)
   "Van altijd 'aan' naar rust, energie en regie" */

const HOME_SYMPTOMS = [
  ["zap", "Ik ben ", "continu moe", " en heb weinig energie."],
  ["flame", "Ik heb een ", "kort lontje", "."],
  ["briefcase", "Ik kan mijn werk ", "moeilijk loslaten", "."],
  ["waves", "Ik heb moeite om me ", "volledig te ontspannen", "."],
  ["cloud-rain", "Ik voel me ", "onrustig en pieker", " veel."],
  ["brain", "Mijn hoofd is ", "overprikkeld", ", ik concentreer me slecht."],
];

const HOME_BENEFITS = [
  ["Je ", "meer rust", " hebt in je hoofd en lijf."],
  ["Je weer ", "energie voelt", " en beter slaapt."],
  ["Je af en toe ", "de boel de boel", " kunt laten, zonder schuldgevoel."],
  ["Je veel meer kunt ", "genieten", " van het moment."],
  ["Je beter voelt ", "wat je nodig hebt", " — en daar ook naar handelt."],
  ["Je je ", "werk weer loslaat", ", zodat je écht aanwezig bent thuis."],
];

/* ---- Hero, two layouts (tweakable) ---- */
function HomeHero({ homeHero, onScan, onNav, onPlay }) {
  if (homeHero === "statement") {
    return (
      <section className="ewk-hero ewk-hero--statement">
        <div className="ewk-wrap ewk-hero__center">
          <Eyebrow>Van werkdruk naar werkgeluk</Eyebrow>
          <h1 className="ewk-hero__big">
            Van altijd ‘aan’<br />naar <em>rust, energie en regie</em>
          </h1>
          <p className="ewk-hero__lead is-center">
            Ik help hoogopgeleide moeders die vastlopen in de combinatie van werk en gezin om hun
            stress te doorbreken en weer rust, energie en regie te ervaren.
          </p>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Start de gratis Stress &amp; Energiescan</Button>
            <Button variant="outline" size="lg" onClick={() => onNav("Over Agathe")}>Lees mijn verhaal</Button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="ewk-hero ewk-hero--quote">
      <div className="ewk-wrap ewk-hero__grid">
        <div>
          <Eyebrow>Van werkdruk naar werkgeluk</Eyebrow>
          <h1 className="ewk-hero__quote">Van altijd ‘aan’ naar <em>rust, energie en regie</em></h1>
          <p className="ewk-hero__lead">
            Ik help hoogopgeleide moeders die vastlopen in de combinatie van werk en gezin en continu
            <span className="ewk-key"> “aan” staan</span>, om hun stress te doorbreken en weer
            <span className="ewk-key"> rust, energie en regie</span> te ervaren.
          </p>
          <p className="ewk-hero__lead" style={{ marginTop: 16 }}>
            Met een heldere aanpak gericht op jouw brein, lichaam en patronen ontdek je wat je kunt
            doen om uit die overdrive te komen — zodat je weer keuzes maakt die echt bij je passen.
          </p>
          <div className="ewk-hero__cta">
            <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Start de gratis Stress &amp; Energiescan</Button>
            <Button variant="ghost" iconRight="arrow-right" onClick={() => onNav("Over Agathe")}>Lees mijn verhaal</Button>
          </div>
        </div>
        <Portrait play onPlay={onPlay} />
      </div>
    </section>
  );
}

/* ---- "Ben jij dit?" recognition ---- */
function HomeRecognition() {
  return (
    <section className="ewk-section">
      <div className="ewk-wrap">
        <div className="ewk-prose" style={{ margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>Ben jij dit?</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 22px" }}>Je houdt alles draaiende — maar het kost je steeds meer</h2>
          <p>
            Je draagt veel verantwoordelijkheid en werkt in een omgeving waar veel van je gevraagd
            wordt. Je zorgt voor anderen, ziet wat er moet gebeuren en wilt het graag goed doen. Op je
            werk én thuis. Dat maakt je betrouwbaar en loyaal.
          </p>
          <p>
            Maar het is ook precies waar het begint te wringen. Want ergens onderweg ben je jezelf
            voorbijgelopen. Je staat vaak <span className="ewk-key">“aan”</span> en de uitknop is niet
            altijd meer goed te vinden. Herkenbaar?
          </p>
        </div>
        <ul className="ewk-list" style={{ marginTop: 16 }}>
          {HOME_SYMPTOMS.map(([ic, a, b, c], i) => (
            <li key={i}>
              <span className="ewk-ic ewk-ic--sym"><Icon name={ic} /></span>
              <span>{a}<span className="ewk-key">{b}</span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="ewk-list-note">En hoe harder je probeert, hoe minder grip je lijkt te hebben.</p>
      </div>
    </section>
  );
}

/* ---- "Wat is er aan de hand?" ---- */
function HomeProblem({ onScan }) {
  return (
    <section className="ewk-section ewk-section--wash">
      <div className="ewk-wrap ewk-prose" style={{ margin: "0 auto" }}>
        <Eyebrow>Wat is er aan de hand?</Eyebrow>
        <h2 className="ewk-h2" style={{ margin: "12px 0 24px" }}>Het echte probleem is geen gebrek aan discipline</h2>
        <p>
          Je zit in een patroon dat zich langzaam heeft opgebouwd, waarin je gewend bent om door te
          gaan, verantwoordelijkheid te nemen en alles zo goed mogelijk te doen. Juist als het drukker
          wordt of zwaarder voelt, ga je automatisch een stapje harder lopen.
        </p>
        <p>
          Dat geeft op de korte termijn het gevoel dat je controle houdt. Maar ondertussen neem je
          steeds minder echte rust, blijf je vooral in je hoofd zitten en raak je verder verwijderd van
          wat je nodig hebt. <span className="ewk-key">Je doet zó je best, maar het levert niet meer op
          wat het vroeger deed.</span>
        </p>
        <p>
          De eerste stap is dan ook niet nóg harder je best doen, maar inzicht krijgen in wat er bij
          jou speelt. Waar zit jouw spanning? Welke signalen geeft je lichaam? En waarom blijf je doen
          wat je doet? Dat is precies waar de Stress &amp; Energiescan je bij helpt.
        </p>
        <div className="ewk-hero__cta" style={{ marginTop: 28 }}>
          <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Start de gratis Stress &amp; Energiescan</Button>
        </div>
      </div>
    </section>
  );
}

/* ---- "Het kan ook anders" benefits ---- */
function HomeBenefits() {
  return (
    <section className="ewk-section">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Het kan ook anders"
          title="Wat als je maar <em>één stap</em> verwijderd bent van een ander leven?"
          sub="Niet omdat alles om je heen verandert. Maar omdat jij anders leert omgaan met wat er speelt — op een manier die voor jou werkt." />
        <ul className="ewk-list">
          {HOME_BENEFITS.map(([a, b, c], i) => (
            <li key={i}>
              <span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>
              <span>{a}<span className="ewk-key">{b}</span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- Over mij teaser ---- */
function HomeAbout({ onNav }) {
  return (
    <section className="ewk-section ewk-section--wash">
      <div className="ewk-wrap ewk-about">
        <div className="ewk-about__photo">
          <Portrait size="100%" />
        </div>
        <div className="ewk-about__text">
          <Eyebrow>Over mij</Eyebrow>
          <h2 className="ewk-h2">Van overleven op wilskracht naar rust, energie en regie</h2>
          <p>
            Ik ben Agathe, psycholoog en moeder, en ik help al meer dan 10 jaar hoogopgeleide moeders
            die vastlopen in de combinatie van werk en gezin. Na mijn verlof bleef ik doorgaan, tot mijn
            lichaam op de rem trapte.
          </p>
          <p>
            Tijdens mijn herstel begon ik te begrijpen wat er werkelijk speelde — een patroon dat ik
            later steeds terugzag bij de vrouwen die ik begeleid. Ik combineer psychologie,
            wetenschappelijke inzichten en lichaamsgerichte technieken met <span className="ewk-key">praktische
            stappen die direct toepasbaar zijn</span>.
          </p>
          <Button variant="solid" iconRight="arrow-right" onClick={() => onNav("Over Agathe")}>Lees meer over mij</Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Shared offer ladder (also used on Aanbod page) ---- */
function WerkLadder({ onScan, onNav }) {
  return (
    <div className="ewk-ladder">
      <button className="ewk-rung ewk-rung--sky" onClick={onScan}>
        <span className="ewk-rung__step">Gratis</span>
        <h3>Stress &amp; Energiescan</h3>
        <p>Ontdek in 10 minuten wat er écht speelt in jouw brein en lichaam.</p>
        <span className="ewk-offer__link">Doe de gratis scan <Icon name="arrow-right" /></span>
      </button>
      <button className="ewk-rung ewk-rung--gold" onClick={() => onNav("Deep Dive")}>
        <span className="ewk-rung__step">Losse sessie · €&nbsp;147</span>
        <h3>1-op-1 Deep Dive</h3>
        <p>In één sessie van 60 minuten helderheid, richting en een concreet plan.</p>
        <span className="ewk-offer__link">Bekijk de Deep Dive <Icon name="arrow-right" /></span>
      </button>
      <button className="ewk-rung ewk-rung--rose" onClick={() => onNav("Traject")}>
        <span className="ewk-rung__step">Begeleidingstraject</span>
        <h3>{PROGRAMMA.naam}</h3>
        <p>{PROGRAMMA.sub} — in 3 maanden duurzaam naar rust, energie en regie.</p>
        <span className="ewk-offer__link">Bekijk het traject <Icon name="arrow-right" /></span>
      </button>
    </div>
  );
}

function HomeAanbod({ onScan, onNav }) {
  return (
    <section className="ewk-section ewk-section--sand">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Zo kun je met me werken"
          title="Klaar om het niet langer alleen te doen?"
          sub="Drie manieren om met me te werken — van een gratis scan tot een compleet 1-op-1 traject. Kies wat bij jou past." />
        <WerkLadder onScan={onScan} onNav={onNav} />
      </div>
    </section>
  );
}

/* ---- Ervaringen ---- */
function HomeErvaringen() {
  return (
    <section className="ewk-section">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Ervaringen" title="Verhalen van vrouwen die je voorgingen" />
        <div className="ewk-testgrid">
          {HOME_REVIEWS.map((t, i) => (
            <figure className="ewk-testcard" key={i}>
              <div className="ewk-stars">{Array.from({ length: t.rating }).map((_, k) => <Icon key={k} name="star" />)}</div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="ewk-avatar">{t.name[0]}</span>
                <span><b>{t.name}</b><br />{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Afsluiting ---- */
function HomeAfsluiting({ onScan, onNav }) {
  return (
    <section className="ewk-finalcta ewk-finalcta--scan">
      <div className="ewk-wrap ewk-finalcta__inner">
        <Eyebrow>Tot slot</Eyebrow>
        <h2 className="ewk-h2">Er is niets mis met jou</h2>
        <p>
          Misschien herken je jezelf in dit verhaal. Weet dan: je systeem is gewoon overbelast geraakt.
          En daar kun je iets aan doen. Begin met de Stress &amp; Energiescan.
        </p>
        <div className="ewk-hero__cta is-center">
          <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Doe de gratis scan</Button>
          <Button variant="outline" size="lg" iconRight="arrow-right" onClick={() => onNav("Traject")}>Maak kennis met {PROGRAMMA.naam}</Button>
        </div>
      </div>
    </section>
  );
}

function Home({ homeHero, showTrust, onScan, onNav, onPlay }) {
  return (
    <main>
      <HomeHero homeHero={homeHero} onScan={onScan} onNav={onNav} onPlay={onPlay} />
      {showTrust !== false && <TrustBar />}
      <HomeRecognition />
      <HomeProblem onScan={onScan} />
      <HomeBenefits />
      <HomeAbout onNav={onNav} />
      <HomeAanbod onScan={onScan} onNav={onNav} />
      <HomeErvaringen />
      <HomeAfsluiting onScan={onScan} onNav={onNav} />
    </main>
  );
}

Object.assign(window, { Home, WerkLadder });
