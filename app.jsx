/* Expeditie Werkplezier – App shell voor de statische multi-page build.
   Welke pagina getoond wordt, zet elke HTML-pagina via window.__PAGE__.
   Navigatie gebruikt echte pagina-URL's, zodat elk onderdeel een eigen
   deploybaar HTML-bestand is (geschikt voor GitHub + Netlify). */
const { useState: useA, useEffect: useAE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeHero": "portret",
  "showTrust": true,
  "portret": "lachend"
}/*EDITMODE-END*/;

const PORTRETTEN = {
  lachend: "assets/photos/portrait-9295.jpg",
  zacht: "assets/photos/portrait-9314.jpg",
};

// Paginanaam -> deploybaar HTML-bestand
const PAGE_FILES = {
  "Home": "index.html",
  "Over Agathe": "over-agathe.html",
  "Aanbod": "aanbod.html",
  "Ervaringen": "ervaringen.html",
  "Contact": "contact.html",
  "Traject": "traject.html",
  "Deep Dive": "deep-dive.html",
  "Gratis scan": "gratis-scan.html",
  "Bedankt scan": "bedankt-scan.html",
  "Privacy": "privacy.html",
  "Cookies": "cookies.html",
  "Voorwaarden": "voorwaarden.html",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useA(false);
  const [menuOpen, setMenuOpen] = useA(false);
  const [videoOpen, setVideoOpen] = useA(false);
  const [cookieOpen, setCookieOpen] = useA(false);

  // Huidige pagina komt uit window.__PAGE__ (per HTML-bestand gezet)
  const page = (typeof window !== "undefined" && window.__PAGE__) || "Home";

  // toon de cookiebanner bij een eerste bezoek (nog geen keuze opgeslagen)
  useAE(() => { if (!readConsent()) setCookieOpen(true); }, []);
  function chooseCookies(val) { writeConsent(val); setCookieOpen(false); }
  function openCookiePrefs() { setCookieOpen(true); }

  useAE(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (her)teken lucide-iconen na elke betekenisvolle render
  useAE(() => { if (window.lucide) window.lucide.createIcons(); });

  // Navigatie tussen losse pagina's via echte URL's
  function nav(n) {
    setMenuOpen(false);
    const target = PAGE_FILES[n] || "index.html";
    const here = (window.location.pathname.split("/").pop() || "index.html") || "index.html";
    if (target === here || (target === "index.html" && here === "")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.href = target;
  }

  // Gratis Stress & Energiescan – CTA's openen de salespagina; de opt-in op die
  // pagina handelt de inschrijving extern af (plug&pay).
  const SCAN_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/gratis-stress-energiescan";
  const goCheckout = () => { window.location.href = SCAN_CHECKOUT; };
  const openScan = () => { nav("Gratis scan"); };
  const openVideo = () => setVideoOpen(true);

  const common = { onScan: openScan, onEbook: openScan, onNav: nav, onPlay: openVideo, onCheckout: goCheckout, portret: PORTRETTEN[t.portret] || PORTRETTEN.lachend };

  let body;
  if (page === "Over Agathe") body = <OverAgathe {...common} />;
  else if (page === "Aanbod") body = <AanbodPage {...common} />;
  else if (page === "Deep Dive") body = <DeepDivePage {...common} />;
  else if (page === "Gratis scan") body = <ScanPage {...common} />;
  else if (page === "Bedankt scan") body = <ScanBedankt {...common} />;
  else if (page === "Ervaringen") body = <ErvaringenPage {...common} />;
  else if (page === "Traject") body = <TrajectPage {...common} />;
  else if (page === "Contact") body = <ContactPage {...common} />;
  else if (page === "Privacy") body = <PrivacyPage {...common} />;
  else if (page === "Cookies") body = <CookiesPage {...common} />;
  else if (page === "Voorwaarden") body = <VoorwaardenPage {...common} />;
  else body = <Home homeHero={t.homeHero} showTrust={t.showTrust} {...common} />;
  const active = (page === "Traject" || page === "Deep Dive" || page === "Gratis scan") ? "Aanbod" : page;

  return (
    <React.Fragment>
      <Header scrolled={scrolled} active={active} onNav={nav} onScan={openScan}
              onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      {body}
      <Footer onScan={openScan} onNav={nav} onCookiePrefs={openCookiePrefs} />
      <VideoLightbox open={videoOpen} onClose={() => setVideoOpen(false)} />
      <CookieBanner open={cookieOpen} onChoice={chooseCookies} onNav={nav} />

      <TweaksPanel>
        <TweakSection label="Home – hero" />
        <TweakRadio label="Hero-stijl" value={t.homeHero}
          options={["portret", "statement"]}
          onChange={(v) => setTweak("homeHero", v)} />
        <TweakToggle label="Toon vertrouwensbalk" value={t.showTrust}
          onChange={(v) => setTweak("showTrust", v)} />
        <TweakSection label="Portret van Agathe" />
        <TweakRadio label="Foto" value={t.portret}
          options={["lachend", "zacht"]}
          onChange={(v) => setTweak("portret", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
