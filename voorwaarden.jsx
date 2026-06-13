/* Expeditie Werkplezier – Algemene Voorwaarden
   Same calm legal layout as privacy.jsx / cookies.jsx: sticky TOC + prose. */
const { useState: useStAv, useEffect: useEffAv } = React;

const AV_SECTIONS = [
  { id: "definities", n: "1", title: "Definities" },
  { id: "toepasselijkheid", n: "2", title: "Toepasselijkheid" },
  { id: "overeenkomst", n: "3", title: "Totstandkoming van de overeenkomst" },
  { id: "tarieven", n: "4", title: "Tarieven en betaling" },
  { id: "annulering", n: "5", title: "Annuleren en verzetten" },
  { id: "uitvoering", n: "6", title: "Uitvoering van het traject" },
  { id: "vertrouwelijkheid", n: "7", title: "Vertrouwelijkheid" },
  { id: "aansprakelijkheid", n: "8", title: "Aansprakelijkheid" },
  { id: "eigendom", n: "9", title: "Intellectueel eigendom" },
  { id: "klachten", n: "10", title: "Klachten" },
  { id: "recht", n: "11", title: "Toepasselijk recht" },
  { id: "contact", n: "12", title: "Contact" },
];

const AV_DEFINITIES = [
  ["Coach", "Agathe Hania, handelend onder de naam Expeditie Werkplezier, gevestigd in Waddinxveen en ingeschreven bij de Kamer van Koophandel onder nummer 57284946."],
  ["Klant", "de natuurlijke persoon die een sessie, traject of andere dienst bij de Coach afneemt of daarover een offerte ontvangt."],
  ["Diensten", "coaching, 1-op-1 sessies (waaronder de Deep Dive), trainingen en advies, in welke vorm dan ook aangeboden."],
  ["Overeenkomst", "elke afspraak tussen de Coach en de Klant over het leveren van Diensten, inclusief een boeking via de website."],
];

const AV_ANNULERING = [
  ["Kosteloos verzetten", "tot uiterlijk 48 uur vóór de afspraak"],
  ["Annuleren binnen 48 uur", "50% van het overeengekomen tarief is verschuldigd"],
  ["Niet verschijnen of niet annuleren", "het volledige tarief is verschuldigd"],
];

function AvH({ s }) {
  return (
    <h2 className="ewk-legal__h" id={s.id}>
      <span className="ewk-legal__hn">{s.n}</span>{s.title}
    </h2>
  );
}

function VoorwaardenPage({ onNav }) {
  const [active, setActive] = useStAv("definities");

  useEffAv(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    AV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <main>
      <section className="ewk-pagehead">
        <div className="ewk-wrap ewk-pagehead__inner">
          <Eyebrow>Algemene voorwaarden</Eyebrow>
          <h1 className="ewk-pagehead__title">Duidelijke <em>afspraken</em>, zodat we ontspannen kunnen werken</h1>
          <p className="ewk-pagehead__sub">
            Hieronder lees je de voorwaarden die gelden voor mijn sessies, trajecten en
            andere diensten. Helder en zonder kleine lettertjes — zodat je precies weet
            waar je aan toe bent.
          </p>
          <span className="ewk-legal__updated"><Icon name="calendar-check" />Laatst bijgewerkt: juni 2026</span>
        </div>
      </section>

      <section className="ewk-section">
        <div className="ewk-wrap ewk-legal">
          <aside className="ewk-legal__toc">
            <span className="ewk-legal__toc-label">Op deze pagina</span>
            <nav>
              {AV_SECTIONS.map((s) => (
                <a key={s.id} href={"#" + s.id}
                   className={"ewk-legal__toc-link" + (active === s.id ? " is-active" : "")}
                   onClick={(e) => jump(e, s.id)}>
                  <span className="ewk-legal__toc-n">{s.n}</span>{s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="ewk-legal__body">
            {/* 1 */}
            <AvH s={AV_SECTIONS[0]} />
            <p>In deze algemene voorwaarden bedoel ik met de volgende begrippen:</p>
            <ul className="ewk-legal__deflist">
              {AV_DEFINITIES.map(([t, d]) => (
                <li key={t}>
                  <span className="ewk-legal__defterm"><Icon name="bookmark" />{t}</span>
                  <span className="ewk-legal__defdesc">{d}</span>
                </li>
              ))}
            </ul>

            {/* 2 */}
            <AvH s={AV_SECTIONS[1]} />
            <p>
              Deze voorwaarden zijn van toepassing op elke offerte, aanbieding en Overeenkomst
              tussen de Coach en de Klant, en op alle Diensten die daaruit voortvloeien.
            </p>
            <p>
              Afwijkingen van deze voorwaarden gelden alleen wanneer die
              <span className="ewk-key"> vooraf en schriftelijk</span> zijn overeengekomen. Als een
              bepaling nietig of vernietigbaar blijkt, blijven de overige bepalingen onverkort gelden.
            </p>

            {/* 3 */}
            <AvH s={AV_SECTIONS[2]} />
            <p>
              Een Overeenkomst komt tot stand wanneer je een sessie of traject boekt via de website,
              een offerte schriftelijk akkoord geeft, of wanneer ik je opdracht bevestig per e-mail.
            </p>
            <ul className="ewk-legal__bullets">
              <li>
                <span className="ewk-legal__bdot"><Icon name="calendar-check" /></span>
                <span><b>Boeking</b> — bij een online boeking ontvang je direct een bevestiging en een uitnodiging om een moment te kiezen.</span>
              </li>
              <li>
                <span className="ewk-legal__bdot"><Icon name="file-text" /></span>
                <span><b>Offerte</b> — een offerte is vrijblijvend en 30 dagen geldig, tenzij anders vermeld.</span>
              </li>
            </ul>

            {/* 4 */}
            <AvH s={AV_SECTIONS[3]} />
            <p>
              De tarieven staan vermeld op de website of in de offerte en zijn voor
              consumenten <span className="ewk-key">inclusief btw</span>, tenzij anders aangegeven.
            </p>
            <ul className="ewk-legal__ticks ewk-legal__ticks--inline">
              <li><Icon name="check" />Online boekingen worden vooraf voldaan</li>
              <li><Icon name="check" />Facturen: betaling binnen 14 dagen</li>
              <li><Icon name="check" />Bij trajecten is betaling in termijnen bespreekbaar</li>
            </ul>
            <p className="ewk-legal__note">
              <Icon name="info" />
              Blijft betaling uit, dan stuur ik eerst een kosteloze herinnering. Pas daarna kunnen
              eventuele incassokosten in rekening worden gebracht conform de wettelijke regeling.
            </p>

            {/* 5 */}
            <AvH s={AV_SECTIONS[4]} />
            <p>
              Het kan gebeuren dat een afspraak niet uitkomt. Laat het me dan zo snel mogelijk weten,
              dan plannen we samen een nieuw moment. Voor het verzetten of annuleren geldt:
            </p>
            <div className="ewk-legal__table" role="table">
              <div className="ewk-legal__tr ewk-legal__tr--head" role="row">
                <span role="columnheader">Situatie</span>
                <span role="columnheader">Wat betekent dat</span>
              </div>
              {AV_ANNULERING.map(([t, d]) => (
                <div className="ewk-legal__tr" role="row" key={t}>
                  <span role="cell">{t}</span>
                  <span role="cell"><span className="ewk-legal__pill">{d}</span></span>
                </div>
              ))}
            </div>
            <p>
              Bij ziekte of overmacht zoeken we altijd samen naar een passende oplossing. Moet ik
              zelf een afspraak verzetten, dan bied ik je zo snel mogelijk een nieuw moment aan.
            </p>

            {/* 6 */}
            <AvH s={AV_SECTIONS[5]} />
            <p>
              Ik voer elke opdracht uit naar mijn beste inzicht en vermogen, op basis van een
              <span className="ewk-key"> inspanningsverplichting</span>. Coaching is maatwerk en
              persoonlijke ontwikkeling; ik kan daarom geen specifiek resultaat garanderen.
            </p>
            <p>
              Voor een goed verloop ga ik ervan uit dat je open en eerlijk deelt wat relevant is.
              Jouw eigen inzet is een belangrijke voorwaarde voor het effect van het traject.
            </p>

            {/* 7 */}
            <AvH s={AV_SECTIONS[6]} />
            <p>
              Alles wat je met me deelt, behandel ik <span className="ewk-key">strikt vertrouwelijk</span>.
              Ik bespreek jouw situatie niet met derden zonder jouw uitdrukkelijke toestemming, behalve
              wanneer een wettelijke verplichting mij daartoe dwingt.
            </p>
            <p>
              De manier waarop ik met je persoonsgegevens omga staat beschreven in mijn{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onNav("Privacy"); }}>privacyverklaring</a>.
            </p>

            {/* 8 */}
            <AvH s={AV_SECTIONS[7]} />
            <p>
              Coaching en advies zijn ondersteunend van aard. Je blijft te allen tijde zelf
              verantwoordelijk voor de keuzes die je maakt en het handelen op basis daarvan.
            </p>
            <ul className="ewk-legal__bullets">
              <li>
                <span className="ewk-legal__bdot"><Icon name="shield" /></span>
                <span>Mijn aansprakelijkheid is beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht.</span>
              </li>
              <li>
                <span className="ewk-legal__bdot"><Icon name="heart-pulse" /></span>
                <span>Coaching is geen vervanging van medische of psychologische behandeling. Bij ernstige klachten verwijs ik je door naar je huisarts of een passende behandelaar.</span>
              </li>
            </ul>

            {/* 9 */}
            <AvH s={AV_SECTIONS[8]} />
            <p>
              Alle materialen die ik ontwikkel — werkbladen, oefeningen, teksten en de inhoud van
              deze website — blijven mijn intellectueel eigendom. Je mag ze gebruiken binnen jouw
              eigen traject, maar niet zonder toestemming vermenigvuldigen of delen met derden.
            </p>

            {/* 10 */}
            <AvH s={AV_SECTIONS[9]} />
            <p>
              Ben je ergens niet tevreden over? Laat het me dan weten — ik los het graag samen met
              je op. Stuur je klacht naar{" "}
              <a href="mailto:agathe@agathehania.nl">agathe@agathehania.nl</a>; je ontvangt binnen
              5 werkdagen een reactie en we zoeken naar een passende oplossing.
            </p>

            {/* 11 */}
            <AvH s={AV_SECTIONS[10]} />
            <p>
              Op alle Overeenkomsten en deze voorwaarden is het <span className="ewk-key">Nederlands recht</span>
              {" "}van toepassing. Komen we er samen niet uit, dan leggen we het geschil voor aan de
              bevoegde rechter in het arrondissement waar ik gevestigd ben.
            </p>
            <p className="ewk-legal__note">
              <Icon name="info" />
              Ik behoud het recht deze voorwaarden te wijzigen. De actuele versie staat altijd op deze pagina.
            </p>

            {/* 12 */}
            <AvH s={AV_SECTIONS[11]} />
            <div className="ewk-legal__contact">
              <img className="ewk-legal__contact-mark" src="assets/logo-mark.svg" alt="" />
              <div>
                <p className="ewk-legal__contact-q">Heb je vragen over deze voorwaarden? Neem gerust contact op.</p>
                <div className="ewk-legal__contact-rows">
                  <span><Icon name="user" /><b>Agathe Hania</b> — Expeditie Werkplezier</span>
                  <span><Icon name="mail" /><a href="mailto:agathe@agathehania.nl">agathe@agathehania.nl</a></span>
                  <span><Icon name="map-pin" />Waddinxveen, Nederland</span>
                </div>
                <div style={{ marginTop: "var(--ew-space-5)" }}>
                  <Button variant="primary" iconRight="arrow-right" onClick={() => onNav("Contact")}>Stuur me een bericht</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { VoorwaardenPage });
