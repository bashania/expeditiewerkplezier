/* Expeditie Werkplezier – Bedankpagina Stress & Energiescan (OTO: Deep Dive €97)
   Niet in de navigatie. Bereikbaar via #bedankt-scan – de redirect-bestemming
   na aankoop/aanvraag op plug&pay. */

/* Eigen aanbod-checkout voor de scan-bedankpagina (OTO €97). */
const BDK_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive-oto";
const BDK_VIDEO = "https://bashania.github.io/expeditiewerkplezier/assets/bedrijfsvideo.mp4";

const BDK_OPLEVERT = [
  "Helderheid over wat er bij jou speelt – niet in losse stukjes, maar als één geheel",
  "Inzicht in het patroon dat maakt dat je blijft doorgaan terwijl het te veel is",
  "Eén concrete focus om mee te starten, in plaats van alles tegelijk te willen oplossen",
  "Een persoonlijk plan dat past bij jouw situatie en jouw leven",
  "Rust in je hoofd – vaak al direct na de sessie voelbaar",
];

const BDK_PAIN = [
  "steeds maar door te gaan terwijl je voelt dat het eigenlijk te veel is",
  "van alles te proberen, maar niet echt verschil te merken",
  "een vol hoofd te hebben dat maar blijft doorgaan",
  "te twijfelen wat nu écht de juiste stap is",
  "alles tegelijk te willen oplossen en daardoor vast te blijven zitten",
  "aan het einde van de dag moe te zijn, zonder het gevoel dat je echt verder komt",
  "het idee te hebben dat je dit alleen moet uitzoeken",
];

const BDK_GAIN = [
  "je weer overzicht voelt in je hoofd, in plaats van chaos",
  "je precies weet waar je moet beginnen, zonder te blijven twijfelen",
  "je niet meer alles tegelijk hoeft op te lossen, maar stap voor stap vooruitgaat",
  "je meer rust ervaart in je lichaam, ook op drukke dagen",
  "je weer met aandacht aanwezig bent thuis, zonder dat je hoofd ergens anders zit",
  "je de dag afsluit met het gevoel dat het genoeg is geweest",
];

/* BEDANKT_REVIEWS komt uit data.jsx (echte reviews) */

const BDK_FAQ = [
  { q: "Wat levert één sessie me op?",
    a: "Helderheid, richting en een concreet plan waar je direct mee verder kunt. De meeste vrouwen gaan naar huis met een inzicht dat alles op z'n plek laat vallen. Vaak ervaar je al tijdens de sessie meer rust in je hoofd." },
  { q: "Moet ik alles al goed kunnen uitleggen?",
    a: "Nee. Kom zoals je bent. Je hoeft je situatie niet perfect te verwoorden – dat is precies waar ik je bij help. We zoeken het samen uit." },
  { q: "Is één sessie genoeg?",
    a: "Veel vrouwen ervaren na één sessie een duidelijk inzicht en weten welke eerste stap ze kunnen zetten. Verandering vasthouden is iets anders. Als je merkt dat je daarin begeleiding wilt, bespreken we dat aan het einde van de sessie." },
  { q: "Wat als ik het spannend vind om mijn verhaal te delen?",
    a: "Dat is heel normaal. De sessie is volledig vertrouwelijk en afgestemd op jou. Er is geen goed of fout antwoord. Veel vrouwen merken dat het al opluchting geeft om hun verhaal hardop te zeggen." },
  { q: "Hoe snel kan ik terecht?",
    a: "Na je boeking ontvang je direct een bevestiging en een link om een moment te kiezen dat jou uitkomt. Meestal kun je binnen een week terecht." },
  { q: "Hoe plan ik een sessie?",
    a: "Via de knop boek je de 1-op-1 sessie. Na boeking ontvang je direct een uitnodiging om een moment te kiezen dat jou uitkomt. De beschikbare dagen zijn maandag t/m vrijdag tussen 13.00 en 17.00 uur." },
  { q: "Wat als ik twijfel of dit iets voor mij is?",
    a: "Dan is dat juist een teken dat je er klaar voor bent. Twijfel betekent dat je voelt dat er iets moet veranderen, maar nog niet weet hoe. Dat is precies waar we in de sessie mee beginnen." },
];

function BdkPrijsCta({ label }) {
  return (
    <div className="ewk-bdk-offerbar">
      <div className="ewk-bdk-offerbar__price">
        <span className="ewk-bdk-offerbar__kicker">1-op-1 Deep Dive sessie · 60 minuten</span>
        <div className="ewk-bdk-offerbar__amount">
          <span className="ewk-bdk-now">€ 97</span>
          <span className="ewk-bdk-was">€ 147</span>
          <span className="ewk-bdk-save">je bespaart € 50</span>
        </div>
      </div>
      <Button variant="primary" size="lg" iconRight="arrow-right" href={BDK_CHECKOUT}>{label || "Boek een Deep Dive sessie"}</Button>
    </div>
  );
}

function ScanBedankt({ onNav }) {
  return (
    <main className="ewk-bdk">
      {/* 1 · Bevestiging + video */}
      <section className="ewk-bdk-hero">
        <div className="ewk-wrap ewk-bdk-hero__inner">
          <span className="ewk-bdk-badge"><Icon name="check" /> Gelukt – je scan is onderweg</span>
          <h1 className="ewk-bdk-hero__title">Hier is ie!</h1>
          <p className="ewk-bdk-hero__sub">
            De <span className="ewk-key">Stress &amp; Energiescan</span> om in 10 minuten meer
            <span className="ewk-key"> rust, overzicht en regie</span> te ervaren is onderweg naar je inbox.
          </p>
          <p className="ewk-bdk-hero__lead">
            Maar voordat je naar je mailbox snelt om alles te bekijken, wil ik eerst dit met je delen.
          </p>

          <div className="ewk-bdk-video">
            <video src={BDK_VIDEO} controls playsInline poster="assets/cover-photo.png" preload="metadata"></video>
          </div>

          <p className="ewk-bdk-hero__after">
            Yesss, superfijn dat je deze scan hebt aangevraagd. Deze scan gaat je heel veel inzichten
            geven. Je krijgt niet alleen kennis en algemene inzichten – je ontdekt <span className="ewk-key">jouw
            persoonlijke stressprofiel</span>, zodat je direct heel gericht weet wat er speelt.
          </p>
          <p className="ewk-bdk-hero__after">
            Wil je niet wachten en meteen doorpakken? Dan heb ik hier een toffe aanbieding voor je.
          </p>
        </div>
      </section>

      {/* 2 · Aanbod-intro */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-prose ewk-bdk-center">
          <Eyebrow>Eenmalige aanbieding</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 20px" }}>Ben je klaar met alles steeds <em>alleen</em> uitzoeken?</h2>
          <p>
            Deze Deep Dive is voor jou als je een sterke, hoogopgeleide moeder bent met een
            verantwoordelijke baan of onderneming en merkt dat je jezelf onderweg bent kwijtgeraakt.
          </p>
          <p>
            Je wilt het goed doen op je werk én thuis. Je hebt een groot verantwoordelijkheidsgevoel,
            bent gewend om door te gaan, maar voelt dat het zo niet langer gaat. <span className="ewk-key">Je
            weet dat er iets moet veranderen.</span> Maar wat precies – en waar begin je?
          </p>
          <p>
            In één sessie brengen we samen in kaart wat er bij jou speelt, welk patroon jou hier heeft
            gebracht en wat jou nu het meest helpt. Je gaat naar huis met scherpe inzichten en een
            concreet plan om anders te gaan leven en werken.
          </p>
          <div style={{ marginTop: 28 }}>
            <BdkPrijsCta label="Boek een 1-op-1 Deep Dive sessie" />
          </div>
        </div>
      </section>

      {/* 3 · Probleem + even voorstellen */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-about">
          <div className="ewk-about__photo"><Portrait size="100%" /></div>
          <div className="ewk-about__text">
            <Eyebrow>Waarom verandert er vaak niets?</Eyebrow>
            <h2 className="ewk-h2">Veel vrouwen weten niet waar te beginnen</h2>
            <p>
              Ze herkennen zichzelf volledig in de signalen en zien precies waar het schuurt. Ze voelen
              dat het zo niet langer kan, maar het lukt ze niet om iets aan de situatie te veranderen.
            </p>
            <p>
              Niet omdat ze de vaardigheden niet hebben, maar omdat ze niet goed weten waar ze moeten
              beginnen. Ze blijven nadenken en twijfelen, of proberen van alles tegelijk – waardoor het
              overzicht juist weer verdwijnt. <span className="ewk-key">Als je eerlijk bent, herken je dat
              misschien ook wel.</span> Daarom heb ik dit voor je ontwikkeld.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Wat de sessie oplevert */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat deze sessie je oplevert"
            title="In één sessie van stilstand naar een concrete eerste stap"
            sub="We kijken samen naar jouw situatie – niet in losse stukjes, maar als geheel. We maken inzichtelijk wat er onder jouw klachten zit, waar jij jezelf onbewust voorbij loopt en wat jou nu het meest helpt." />
          <ul className="ewk-bdk-checklist">
            {BDK_OPLEVERT.map((o) => (
              <li key={o}><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>{o}</li>
            ))}
          </ul>
          <div className="ewk-bdk-center" style={{ marginTop: 36 }}>
            <Button variant="primary" size="lg" iconRight="arrow-right" href={BDK_CHECKOUT}>Ja, ik wil direct aan de slag</Button>
          </div>
        </div>
      </section>

      {/* 5 · Reviews */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat andere vrouwen zeggen" title="Eén gesprek dat alles op z'n plek laat vallen" />
          <div className="ewk-testgrid">
            {BEDANKT_REVIEWS.map((t, i) => (
              <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{Array.from({ length: t.rating }).map((_, k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <ReviewAvatar r={t} />
                  <span><b>{t.name}</b><br />{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Pain / Gain */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Ben je het zat?" title="Van blijven doorgaan naar weer ruimte voelen" />
          <div className="ewk-forwho">
            <div className="ewk-forwho__col ewk-forwho__col--sym">
              <h4>Ben je het zat om…</h4>
              <ul>
                {BDK_PAIN.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--sym"><Icon name="x" /></span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="ewk-forwho__col ewk-forwho__col--ben">
              <h4>Stel je eens voor dat…</h4>
              <ul>
                {BDK_GAIN.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="ewk-list-note">Je hoeft het niet alleen uit te zoeken.</p>
          <div className="ewk-bdk-center" style={{ marginTop: 28 }}>
            <BdkPrijsCta label="Ja, dit wil ik" />
          </div>
        </div>
      </section>

      {/* 7 · Voor wie */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-prose ewk-bdk-center">
          <Eyebrow>Voor wie deze Deep Dive is</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 20px" }}>Herken jij jezelf hierin?</h2>
          <p>
            Deze Deep Dive is voor jou als je een sterke, hoogopgeleide moeder bent met een
            verantwoordelijke baan of onderneming, en merkt dat je jezelf onderweg bent kwijtgeraakt.
          </p>
          <p>
            Je wilt het goed doen op je werk én thuis. Je hebt een groot verantwoordelijkheidsgevoel,
            bent gewend om door te gaan en voelt dat het zo niet langer werkt. <span className="ewk-key">Je
            hoofd staat altijd aan, je energie raakt op</span> en je verlangt naar rust, overzicht en grip.
          </p>
          <div style={{ marginTop: 24 }}>
            <Button variant="primary" size="lg" iconRight="arrow-right" href={BDK_CHECKOUT}>Ja, ik wil dit</Button>
          </div>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList items={BDK_FAQ} />
        </div>
      </section>

      {/* 9 · Afsluiting */}
      <section className="ewk-finalcta ewk-finalcta--scan">
        <div className="ewk-wrap ewk-finalcta__inner">
          <Eyebrow>Tot slot</Eyebrow>
          <h2 className="ewk-h2">Voel je dat dit over jou gaat?</h2>
          <p>Dan is dit misschien precies wat je nu nodig hebt. Je hoeft het niet alleen uit te zoeken.</p>
          <div className="ewk-bdk-finalprice">
            <span className="ewk-bdk-now ewk-bdk-now--light">€ 97</span>
            <span className="ewk-bdk-was ewk-bdk-was--light">€ 147</span>
          </div>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" iconRight="arrow-right" href={BDK_CHECKOUT}>Plan je Deep Dive sessie – nu € 97</Button>
            <Button variant="outline" size="lg" onClick={() => onNav("Contact")}>Eerst een vraag stellen</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ScanBedankt });
