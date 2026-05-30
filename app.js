/* Expeditie Werkplezier — App: routing, interactions, tweaks */
const { useState: useA, useEffect: useAE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeHero": "portret",
  "showTrust": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useA(false);
  const [menuOpen, setMenuOpen] = useA(false);
  const [videoOpen, setVideoOpen] = useA(false);
  const [page, setPage] = useA("Home");

  useAE(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (re)render lucide icons after each meaningful render
  useAE(() => { if (window.lucide) window.lucide.createIcons(); });

  // always start a freshly-opened page at the top
  useAE(() => { window.scrollTo(0, 0); }, [page]);

  const PAGES = [...NAV, "Traject", "Deep Dive", "Gratis scan", "Privacy"];
  function nav(n) {
    setMenuOpen(false);
    setPage(PAGES.includes(n) ? n : "Home");
  }
  const openScan = () => nav("Gratis scan");
  const openVideo = () => setVideoOpen(true);

  // onEbook kept as an alias to the scan so any legacy CTA still routes correctly
  const common = { onScan: openScan, onEbook: openScan, onNav: nav, onPlay: openVideo };

  let body;
  if (page === "Over Agathe") body = <OverAgathe {...common} />;
  else if (page === "Aanbod") body = <AanbodPage {...common} />;
  else if (page === "Deep Dive") body = <DeepDivePage {...common} />;
  else if (page === "Gratis scan") body = <ScanPage {...common} />;
  else if (page === "Ervaringen") body = <ErvaringenPage {...common} />;
  else if (page === "Blog") body = <BlogPage {...common} />;
  else if (page === "Traject") body = <TrajectPage {...common} />;
  else if (page === "Contact") body = <ContactPage {...common} />;
  else if (page === "Privacy") body = <PrivacyPage />;
  else body = <Home homeHero={t.homeHero} showTrust={t.showTrust} {...common} />;

  const active = (page === "Traject" || page === "Deep Dive" || page === "Gratis scan") ? "Aanbod" : page;

  return (
    <React.Fragment>
      <Header scrolled={scrolled} active={active} onNav={nav} onScan={openScan}
              onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      {body}
      <Footer onScan={openScan} onNav={nav} />
      <VideoLightbox open={videoOpen} onClose={() => setVideoOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Home — hero" />
        <TweakRadio label="Hero-stijl" value={t.homeHero}
          options={["portret", "statement"]}
          onChange={(v) => setTweak("homeHero", v)} />
        <TweakToggle label="Toon vertrouwensbalk" value={t.showTrust}
          onChange={(v) => setTweak("showTrust", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
