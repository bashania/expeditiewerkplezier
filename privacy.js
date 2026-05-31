/* Expeditie Werkplezier – Privacyverklaring
   Calm, readable legal page: sticky TOC + prose, on-brand. */
const { useState: useStPv, useEffect: useEffPv } = React;

const PV_SECTIONS = [
  { id: "wie", n: "1", title: "Wie ben ik?" },
  { id: "gegevens", n: "2", title: "Welke gegevens verzamel ik?" },
  { id: "doelen", n: "3", title: "Waarvoor gebruik ik jouw gegevens?" },
  { id: "bewaren", n: "4", title: "Hoe lang bewaar ik jouw gegevens?" },
  { id: "delen", n: "5", title: "Deel ik gegevens met anderen?" },
  { id: "beveiliging", n: "6", title: "Beveiliging" },
  { id: "rechten", n: "7", title: "Jouw rechten" },
  { id: "wijzigingen", n: "8", title: "Wijzigingen" },
  { id: "contact", n: "9", title: "Contact" },
];

const PV_DOELEN = [
  ["Beantwoorden van jouw bericht of vraag", "Gerechtvaardigd belang / uitvoering overeenkomst"],
  ["Uitvoeren van een coachtraject", "Uitvoering overeenkomst"],
  ["Facturatie en administratie", "Wettelijke verplichting"],
  ["Verbetering van de website", "Gerechtvaardigd belang"],
  ["Versturen van een nieuwsbrief (indien aangemeld)", "Toestemming"],
];

const PV_BEWAREN = [
  ["Contactberichten", "maximaal 1 jaar na het laatste contact"],
  ["Coachingsdossiers", "2 jaar na afronding van het traject"],
  ["Financiële administratie", "7 jaar (wettelijke bewaarplicht Belastingdienst)"],
  ["Nieuwsbriefabonnees", "zolang je ingeschreven blijft; na afmelding direct verwijderd"],
];

const PV_RECHTEN = [
  ["Inzage", "je kunt opvragen welke gegevens ik van je verwerk"],
  ["Rectificatie", "je kunt onjuiste gegevens laten corrigeren"],
  ["Verwijdering", "je kunt verzoeken om verwijdering van jouw gegevens (“recht om vergeten te worden”)"],
  ["Beperking", "je kunt vragen de verwerking tijdelijk te beperken"],
  ["Bezwaar", "je kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang"],
  ["Overdraagbaarheid", "je kunt jouw gegevens in een gangbaar formaat opvragen"],
];

function PvH({ s }) {
  return (
    <h2 className="ewk-legal__h" id={s.id}>
      <span className="ewk-legal__hn">{s.n}</span>{s.title}
    </h2>
  );
}

function PrivacyPage({ onNav }) {
  const [active, setActive] = useStPv("wie");

  // highlight the TOC item for the section currently in view
  useEffPv(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    PV_SECTIONS.forEach((s) => {
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
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="ewk-pagehead__title">Jouw gegevens, in <em>vertrouwde</em> handen</h1>
          <p className="ewk-pagehead__sub">
            Ik ga zorgvuldig en eerlijk om met je persoonsgegevens. Hieronder leg ik zo helder
            mogelijk uit welke gegevens ik verwerk, waarvoor, en welke rechten je hebt.
          </p>
          <span className="ewk-legal__updated"><Icon name="calendar-check" />Laatst bijgewerkt: mei 2025</span>
        </div>
      </section>

      <section className="ewk-section">
        <div className="ewk-wrap ewk-legal">
          <aside className="ewk-legal__toc">
            <span className="ewk-legal__toc-label">Op deze pagina</span>
            <nav>
              {PV_SECTIONS.map((s) => (
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
            <PvH s={PV_SECTIONS[0]} />
            <p>
              Ik ben Agathe Hania, zelfstandig psycholoog en coach onder de naam
              <span className="ewk-key"> Expeditie Werkplezier</span>. Ik ben gevestigd in
              Waddinxveen en ingeschreven bij de Kamer van Koophandel.
            </p>
            <p>
              Als verwerkingsverantwoordelijke bepaal ik welke persoonsgegevens ik verzamel, hoe ik
              die gebruik en hoe lang ik ze bewaar. In deze privacyverklaring leg ik dat zo helder
              mogelijk uit.
            </p>

            {/* 2 */}
            <PvH s={PV_SECTIONS[1]} />
            <div className="ewk-legal__cards">
              <div className="ewk-legal__card">
                <span className="ewk-legal__card-ic ewk-legal__card-ic--rose"><Icon name="mail" /></span>
                <h4>Contactformulier en e-mail</h4>
                <p>Wanneer je contact met me opneemt, verwerk ik:</p>
                <ul className="ewk-legal__ticks">
                  <li><Icon name="check" />Naam</li>
                  <li><Icon name="check" />E-mailadres</li>
                  <li><Icon name="check" />De inhoud van je bericht</li>
                </ul>
              </div>
              <div className="ewk-legal__card">
                <span className="ewk-legal__card-ic ewk-legal__card-ic--sage"><Icon name="messages-square" /></span>
                <h4>Kennismaking en coaching</h4>
                <p>In een (gratis) kennismakingsgesprek of coachtraject verwerk ik:</p>
                <ul className="ewk-legal__ticks">
                  <li><Icon name="check" />Naam en contactgegevens</li>
                  <li><Icon name="check" />Wat je deelt over je werk- en privésituatie</li>
                  <li><Icon name="check" />Voortgang en aantekeningen (enkel intern, nooit gedeeld)</li>
                  <li><Icon name="check" />Facturatiegegevens (naam, adres, e-mail)</li>
                </ul>
              </div>
              <div className="ewk-legal__card">
                <span className="ewk-legal__card-ic ewk-legal__card-ic--sky"><Icon name="globe" /></span>
                <h4>Website en cookies</h4>
                <p>Bij een bezoek aan mijn website kunnen technische gegevens worden vastgelegd:</p>
                <ul className="ewk-legal__ticks">
                  <li><Icon name="check" />IP-adres (geanonimiseerd)</li>
                  <li><Icon name="check" />Browsertype en -versie</li>
                  <li><Icon name="check" />Bezochte pagina's en tijdstip</li>
                </ul>
              </div>
            </div>
            <p className="ewk-legal__note">
              <Icon name="cookie" />
              Ik gebruik uitsluitend functionele cookies die nodig zijn voor het correct werken van
              de website. Er worden geen tracking- of advertentiecookies geplaatst zonder jouw toestemming.
            </p>

            {/* 3 */}
            <PvH s={PV_SECTIONS[2]} />
            <p>Ik verwerk jouw gegevens alleen voor deze doelen, telkens op een wettelijke grondslag:</p>
            <div className="ewk-legal__table" role="table">
              <div className="ewk-legal__tr ewk-legal__tr--head" role="row">
                <span role="columnheader">Doel</span>
                <span role="columnheader">Grondslag</span>
              </div>
              {PV_DOELEN.map(([doel, grond]) => (
                <div className="ewk-legal__tr" role="row" key={doel}>
                  <span role="cell">{doel}</span>
                  <span role="cell"><span className="ewk-legal__pill">{grond}</span></span>
                </div>
              ))}
            </div>
            <p className="ewk-legal__lead">
              Ik gebruik jouw gegevens nooit voor andere doeleinden dan hierboven vermeld, en
              <span className="ewk-key"> verkoop ze nooit aan derden</span>.
            </p>

            {/* 4 */}
            <PvH s={PV_SECTIONS[3]} />
            <ul className="ewk-legal__deflist">
              {PV_BEWAREN.map(([t, d]) => (
                <li key={t}>
                  <span className="ewk-legal__defterm"><Icon name="clock" />{t}</span>
                  <span className="ewk-legal__defdesc">{d}</span>
                </li>
              ))}
            </ul>

            {/* 5 */}
            <PvH s={PV_SECTIONS[4]} />
            <p>
              Ik deel jouw gegevens in principe niet met derden. In een beperkt aantal gevallen is
              dat wel nodig:
            </p>
            <ul className="ewk-legal__bullets">
              <li>
                <span className="ewk-legal__bdot"><Icon name="calculator" /></span>
                <span><b>Boekhouder / accountant</b> — voor de financiële administratie, onder strikte geheimhoudingsplicht.</span>
              </li>
              <li>
                <span className="ewk-legal__bdot"><Icon name="server" /></span>
                <span><b>E-mailprovider / hostingpartij</b> — voor de technische verwerking van berichten en de website; zij mogen de gegevens uitsluitend gebruiken om hun dienst te leveren.</span>
              </li>
              <li>
                <span className="ewk-legal__bdot"><Icon name="scale" /></span>
                <span><b>Wettelijke verplichting</b> — indien een bevoegde instantie hierom vraagt.</span>
              </li>
            </ul>
            <p>
              Met alle verwerkers heb ik een verwerkersovereenkomst afgesloten of zijn passende
              contractuele afspraken gemaakt.
            </p>

            {/* 6 */}
            <PvH s={PV_SECTIONS[5]} />
            <p>
              Ik neem passende technische en organisatorische maatregelen om jouw persoonsgegevens te
              beschermen tegen verlies, misbruik of onbevoegde toegang. Denk aan:
            </p>
            <ul className="ewk-legal__ticks ewk-legal__ticks--inline">
              <li><Icon name="lock" />Versleutelde verbindingen (HTTPS)</li>
              <li><Icon name="user-check" />Toegang tot dossiers uitsluitend voor mijzelf</li>
              <li><Icon name="hard-drive" />Regelmatige back-ups</li>
            </ul>

            {/* 7 */}
            <PvH s={PV_SECTIONS[6]} />
            <p>
              Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je de volgende rechten:
            </p>
            <ul className="ewk-legal__deflist ewk-legal__deflist--rights">
              {PV_RECHTEN.map(([t, d]) => (
                <li key={t}>
                  <span className="ewk-legal__defterm">{t}</span>
                  <span className="ewk-legal__defdesc" dangerouslySetInnerHTML={{ __html: d }} />
                </li>
              ))}
            </ul>
            <p>
              Om een verzoek in te dienen, stuur een e-mail naar
              {" "}<a href="mailto:agathe@expeditiewerkplezier.nl">agathe@expeditiewerkplezier.nl</a>.
              Ik reageer binnen 4 weken.
            </p>
            <p className="ewk-legal__note">
              <Icon name="shield-alert" />
              Heb je een klacht over de manier waarop ik met jouw gegevens omga? Dan kun je een klacht
              indienen bij de <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.
            </p>

            {/* 8 */}
            <PvH s={PV_SECTIONS[7]} />
            <p>
              Ik behoud het recht deze privacyverklaring te wijzigen. De actuele versie staat altijd
              op deze pagina. Bij ingrijpende wijzigingen ontvangen actieve klanten en
              nieuwsbriefabonnees een bericht.
            </p>

            {/* 9 */}
            <PvH s={PV_SECTIONS[8]} />
            <div className="ewk-legal__contact">
              <img className="ewk-legal__contact-mark" src="assets/logo-mark.svg" alt="" />
              <div>
                <p className="ewk-legal__contact-q">Heb je vragen over deze privacyverklaring? Neem gerust contact op.</p>
                <div className="ewk-legal__contact-rows">
                  <span><Icon name="user" /><b>Agathe Hania</b> — Expeditie Werkplezier</span>
                  <span><Icon name="mail" /><a href="mailto:agathe@expeditiewerkplezier.nl">agathe@expeditiewerkplezier.nl</a></span>
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

Object.assign(window, { PrivacyPage });
