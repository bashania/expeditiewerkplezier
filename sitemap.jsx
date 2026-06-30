/* Expeditie Werkplezier – Verborgen sitemap-overzicht.
   Staat zelf NIET in een menu en is noindex. Handig om in één oogopslag te
   zien welke pagina's er zijn – inclusief losse pagina's die nergens in de
   navigatie staan, zoals de bedankpagina na de scan. */

const SITEMAP_GROUPS = [
  {
    title: "In het hoofdmenu",
    icon: "menu",
    desc: "Pagina's die in de bovenbalk én in het footermenu staan.",
    pages: [
      { name: "Home", file: "index.html" },
      { name: "Over Agathe", file: "over-agathe.html" },
      { name: "Aanbod", file: "aanbod.html" },
      { name: "Ervaringen", file: "ervaringen.html" },
      { name: "Contact", file: "contact.html" },
    ],
  },
  {
    title: "Onder “Aanbod”",
    icon: "git-branch",
    desc: "Aanbod-pagina's waar je via knoppen naartoe gaat – niet apart in het menu.",
    pages: [
      { name: "Traject (Rust Ruimte Regie)", file: "traject.html" },
      { name: "1-op-1 Deep Dive", file: "deep-dive.html" },
      { name: "Gratis Stress & Energiescan", file: "gratis-scan.html" },
    ],
  },
  {
    title: "In de footer",
    icon: "scale",
    desc: "Juridische pagina's, gelinkt onderaan elke pagina.",
    pages: [
      { name: "Privacyverklaring", file: "privacy.html" },
      { name: "Cookiebeleid", file: "cookies.html" },
      { name: "Algemene Voorwaarden", file: "voorwaarden.html" },
    ],
  },
  {
    title: "Niet in een menu (verborgen)",
    icon: "eye-off",
    desc: "Losse pagina's die nergens in de navigatie staan. Bezoekers komen hier alleen via een directe link of een redirect.",
    pages: [
      { name: "Bedankt – je scan is onderweg", file: "bedankt-scan.html", note: "Na het aanvragen van de gratis scan", noindex: true },
      { name: "Sitemap (deze pagina)", file: "sitemap.html", note: "Intern overzicht", noindex: true },
    ],
  },
  {
    title: "Systeem",
    icon: "alert-triangle",
    desc: "Technische pagina's.",
    pages: [
      { name: "404 – pagina niet gevonden", file: "404.html", note: "Foutpagina", noindex: true },
    ],
  },
];

function SitemapItem({ p }) {
  return (
    <li className="ewk-sitemap__item">
      <a href={p.file} className="ewk-sitemap__link">
        <span className="ewk-sitemap__name">{p.name}</span>
        <span className="ewk-sitemap__file">{p.file}</span>
      </a>
      <span className="ewk-sitemap__meta">
        {p.note ? <span className="ewk-sitemap__note">{p.note}</span> : null}
        {p.noindex ? <span className="ewk-sitemap__badge">noindex</span> : null}
      </span>
    </li>
  );
}

function SitemapPage() {
  const total = SITEMAP_GROUPS.reduce((n, g) => n + g.pages.length, 0);
  return (
    <main>
      <section className="ewk-pagehead">
        <div className="ewk-wrap ewk-pagehead__inner">
          <Eyebrow>Intern · sitemap</Eyebrow>
          <h1 className="ewk-pagehead__title">Alle <em>pagina's</em> op een rij</h1>
          <p className="ewk-pagehead__sub">
            Een compleet overzicht van alle {total} pagina's van de site – inclusief de
            losse pagina's die nergens in een menu staan, zoals de bedankpagina. Deze pagina is
            zelf verborgen: niet in de navigatie en <code>noindex</code>.
          </p>
        </div>
      </section>

      <section className="ewk-section">
        <div className="ewk-wrap ewk-sitemap">
          {SITEMAP_GROUPS.map((g) => (
            <div className="ewk-sitemap__group" key={g.title}>
              <h2 className="ewk-sitemap__grouptitle">
                <Icon name={g.icon} />
                <span>{g.title}</span>
                <span className="ewk-sitemap__count">{g.pages.length}</span>
              </h2>
              <p className="ewk-sitemap__groupdesc">{g.desc}</p>
              <ul className="ewk-sitemap__list">
                {g.pages.map((p) => <SitemapItem key={p.file} p={p} />)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { SitemapPage });
