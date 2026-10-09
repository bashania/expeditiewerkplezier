/* Expeditie Werkplezier – Cookiebeleid
   Reuses the .ewk-legal layout (sticky TOC + prose) from privacy.jsx / styles.css. */
const { useState: useStCk, useEffect: useEffCk } = React;

const CK_SECTIONS = [
  { id: "ck-wat", n: "1", title: "Wat zijn cookies?" },
  { id: "ck-welke", n: "2", title: "Welke cookies gebruik ik?" },
  { id: "ck-derden", n: "3", title: "Cookies van derden" },
  { id: "ck-toestemming", n: "4", title: "Toestemming en cookievoorkeur" },
  { id: "ck-verwijderen", n: "5", title: "Hoe verwijder ik cookies?" },
  { id: "ck-wijzigingen", n: "6", title: "Wijzigingen" },
  { id: "ck-contact", n: "7", title: "Contact" },
];

const CK_FUNCTIONEEL = [
  ["ewk-cookie-consent (localStorage)", "Onthoudt jouw keuze voor functionele opslag en optionele tracking", "Max. 1 jaar geldig; je kunt de keuze eerder wissen"],
];

const CK_BROWSERS = [
  ["Chrome", "Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens"],
  ["Firefox", "Instellingen → Privacy & Beveiliging → Cookies en sitegegevens"],
  ["Safari", "Voorkeuren → Privacy → Beheer websitegegevens"],
  ["Edge", "Instellingen → Privacy, zoeken en services → Browsing-gegevens wissen"],
];

function CkH({ s }) {
  return (
    <h2 className="ewk-legal__h" id={s.id}>
      <span className="ewk-legal__hn">{s.n}</span>{s.title}
    </h2>
  );
}

function CkTable({ rows }) {
  return (
    <div className="ewk-legal__table ewk-legal__table--3" role="table">
      <div className="ewk-legal__tr ewk-legal__tr--head" role="row">
        <span role="columnheader">Opslag</span>
        <span role="columnheader">Doel</span>
        <span role="columnheader">Bewaartermijn</span>
      </div>
      {rows.map(([c, d, b]) => (
        <div className="ewk-legal__tr" role="row" key={c}>
          <span role="cell">{c}</span>
          <span role="cell" className="ewk-legal__td-muted">{d}</span>
          <span role="cell"><span className="ewk-legal__pill">{b}</span></span>
        </div>
      ))}
    </div>
  );
}

function CookiesPage({ onNav }) {
  const [active, setActive] = useStCk("ck-wat");

  useEffCk(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    CK_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  }

  return (
    <main>
      <section className="ewk-pagehead">
        <div className="ewk-wrap ewk-pagehead__inner">
          <Eyebrow>Cookies</Eyebrow>
          <h1 className="ewk-pagehead__title">Een <em>schone</em> website, zonder gevolg</h1>
          <p className="ewk-pagehead__sub">
            Ik houd mijn website zo licht en privacy-vriendelijk mogelijk. Hieronder lees je welke
            cookies ik gebruik, waarom, en hoe je zelf de regie houdt.
          </p>
          <span className="ewk-legal__updated"><Icon name="calendar-check" />Laatst bijgewerkt: 9 oktober 2026</span>
        </div>
      </section>

      <section className="ewk-section">
        <div className="ewk-wrap ewk-legal">
          <aside className="ewk-legal__toc">
            <span className="ewk-legal__toc-label">Op deze pagina</span>
            <nav>
              {CK_SECTIONS.map((s) => (
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
            <CkH s={CK_SECTIONS[0]} />
            <p>
              Cookies zijn kleine tekstbestanden die door een website op je apparaat worden opgeslagen
              wanneer je de site bezoekt. Ze helpen de website correct te functioneren en kunnen
              informatie onthouden over je bezoek. Deze site bewaart je cookievoorkeur in localStorage:
              lokale browseropslag die dezelfde keuze ook bij een volgend bezoek onthoudt.
            </p>

            {/* 2 */}
            <CkH s={CK_SECTIONS[1]} />

            <div className="ewk-legal__catrow">
              <span className="ewk-legal__cat-ic ewk-legal__cat-ic--sage"><Icon name="settings-2" /></span>
              <div>
                <h3 className="ewk-legal__cat-title">Functionele opslag <span className="ewk-legal__tag ewk-legal__tag--on">Altijd actief</span></h3>
                <p className="ewk-legal__cat-desc">
                  Ik onthoud je cookiekeuze op dit apparaat, zodat je deze niet bij iedere pagina
                  opnieuw hoeft te maken. Deze voorkeur wordt niet gebruikt om je te volgen of te profileren.
                </p>
              </div>
            </div>
            <CkTable rows={CK_FUNCTIONEEL} />

            <div className="ewk-legal__catrow">
              <span className="ewk-legal__cat-ic ewk-legal__cat-ic--sky"><Icon name="bar-chart-3" /></span>
              <div>
                <h3 className="ewk-legal__cat-title">Statistieken en tracking <span className="ewk-legal__tag ewk-legal__tag--opt">Alleen met toestemming</span></h3>
                <p className="ewk-legal__cat-desc">
                  Alleen als je “Alle cookies accepteren” kiest, laad ik een extern script via
                  link.agathehania.nl voor statistieken en tracking. Daarbij kunnen bezoekgegevens
                  worden verwerkt en cookies worden geplaatst. Bij “Alleen functioneel” wordt dit
                  script niet geladen.
                </p>
              </div>
            </div>

            <div className="ewk-legal__catrow">
              <span className="ewk-legal__cat-ic ewk-legal__cat-ic--rose"><Icon name="ban" /></span>
              <div>
                <h3 className="ewk-legal__cat-title">Marketing- en trackingcookies</h3>
                <p className="ewk-legal__cat-desc">
                  Ik plaats <span className="ewk-key">geen</span> marketing- of trackingcookies zonder
                  jouw uitdrukkelijke toestemming.
                </p>
              </div>
            </div>

            {/* 3 */}
            <CkH s={CK_SECTIONS[2]} />
            <p>
              Als je doorklikt naar een aanmeld- of betaalpagina, gelden ook de privacy- en
              cookievoorwaarden van die externe dienst. Het contactformulier verstuurt jouw ingevulde
              gegevens via FormSubmit. De video op deze site wordt vanaf de eigen website geladen.
            </p>

            {/* 4 */}
            <CkH s={CK_SECTIONS[3]} />
            <p>
              Bij je eerste bezoek aan de website verschijnt een cookiemelding. Hier kun je aangeven
              welke cookies je accepteert. Je kunt je voorkeur op elk moment wijzigen:
            </p>
            <ul className="ewk-legal__bullets">
              <li>
                <span className="ewk-legal__bdot"><Icon name="sliders-horizontal" /></span>
                <span><b>Via de cookiebanner</b> — klik op “Cookievoorkeuren” onderaan de website.</span>
              </li>
              <li>
                <span className="ewk-legal__bdot"><Icon name="globe" /></span>
                <span><b>Via je browser</b> — de meeste browsers bieden de mogelijkheid cookies te beheren, te blokkeren of te verwijderen.</span>
              </li>
            </ul>
            <p className="ewk-legal__note">
              <Icon name="info" />
              Trek je toestemming in via “Alleen functioneel”, dan wordt de pagina opnieuw geladen
              om de actieve tracking te stoppen. Dit verwijdert geen eerder geplaatste cookies van derden;
              die kun je via je browser wissen.
            </p>

            {/* 5 */}
            <CkH s={CK_SECTIONS[4]} />
            <p>
              Je kunt cookies verwijderen via de instellingen van je browser. Hieronder vind je het
              pad voor de meestgebruikte browsers:
            </p>
            <ul className="ewk-legal__deflist">
              {CK_BROWSERS.map(([b, path]) => (
                <li key={b}>
                  <span className="ewk-legal__defterm"><Icon name="chevron-right" />{b}</span>
                  <span className="ewk-legal__defdesc">{path}</span>
                </li>
              ))}
            </ul>

            {/* 6 */}
            <CkH s={CK_SECTIONS[5]} />
            <p>
              Ik behoud het recht dit cookiebeleid te wijzigen. De actuele versie staat altijd op deze
              pagina. Controleer deze pagina regelmatig voor de meest recente informatie.
            </p>

            {/* 7 */}
            <CkH s={CK_SECTIONS[6]} />
            <div className="ewk-legal__contact">
              <img className="ewk-legal__contact-mark" src="assets/logo-mark.svg" alt="" />
              <div>
                <p className="ewk-legal__contact-q">Heb je vragen over het gebruik van cookies op deze website? Neem gerust contact op.</p>
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

Object.assign(window, { CookiesPage });
