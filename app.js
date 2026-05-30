/* Expeditie Werkplezier — App: routing, interactions, tweaks */
const { useState: useA, useEffect: useAE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "quote",
  "aanbodVariant": "tiers"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useA(false);
  const [menuOpen, setMenuOpen] = useA(false);
  const [modalOpen, setModalOpen] = useA(false);
  const [modalKind, setModalKind] = useA("ebook");
  const [videoOpen, setVideoOpen] = useA(false);
  const [page, setPage] = useA("Home");

  useAE(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (re)render lucide icons after each meaningful render
  useAE(() => { if (window.lucide) window.lucide.createIcons(); });

  const PAGES = [...NAV, "Traject"];
  function nav(n) {
    setMenuOpen(false);
    setPage(PAGES.includes(n) ? n : "Home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const openEbook = () => { setMenuOpen(false); setModalKind("ebook"); setModalOpen(true); };
  const openScan = () => { setMenuOpen(false); setModalKind("scan"); setModalOpen(true); };
  const openVideo = () => setVideoOpen(true);

  const common = { onEbook: openEbook, onScan: openScan, onNav: nav, onPlay: openVideo };

  let body;
  if (page === "Over Agathe") body = <OverAgathe {...common} />;
  else if (page === "Aanbod") body = <AanbodPage aanbodVariant={t.aanbodVariant} {...common} />;
  else if (page === "Ervaringen") body = <ErvaringenPage {...common} />;
  else if (page === "Blog") body = <BlogPage {...common} />;
  else if (page === "Traject") body = <TrajectPage {...common} />;
  else if (page === "Contact") body = <ContactPage {...common} />;
  else body = <Home heroVariant={t.heroVariant} aanbodVariant={t.aanbodVariant} {...common} />;

  return (
    <React.Fragment>
      <Header scrolled={scrolled} active={page === "Traject" ? "Aanbod" : page} onNav={nav} onEbook={openEbook}
              onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      {body}
      <Footer onEbook={openEbook} onNav={nav} />
      <EbookModal open={modalOpen} kind={modalKind} onClose={() => setModalOpen(false)} />
      <VideoLightbox open={videoOpen} onClose={() => setVideoOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Home — hero" />
        <TweakRadio label="Hero-stijl" value={t.heroVariant}
          options={["quote", "statement", "split"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakSection label="Aanbod-blok" />
        <TweakRadio label="Lay-out" value={t.aanbodVariant}
          options={["cards", "tiers", "spotlight"]}
          onChange={(v) => setTweak("aanbodVariant", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
