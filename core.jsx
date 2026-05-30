/* Expeditie Werkplezier — core components
   Icon, Button, Header, EbookModal, VideoLightbox, Footer. Exported to window. */
const { useState, useEffect, useRef } = React;

function Icon({ name, style }) {
  return <i data-lucide={name} style={style}></i>;
}

function Button({ variant = "primary", size, block, icon, iconRight, children, onClick, type }) {
  const cls = [
    "ewk-btn",
    `ewk-btn--${variant}`,
    size === "lg" ? "ewk-btn--lg" : "",
    size === "sm" ? "ewk-btn--sm" : "",
    block ? "ewk-btn--block" : "",
  ].filter(Boolean).join(" ");
  return (
    <button className={cls} onClick={onClick} type={type || "button"}>
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

const NAV = ["Home", "Over Agathe", "Aanbod", "Ervaringen", "Blog", "Contact"];

function Header({ scrolled, active, onNav, onEbook, onMenu, menuOpen }) {
  return (
    <header className={"ewk-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="ewk-wrap ewk-header__inner">
        <a className="ewk-header__logo" href="#" onClick={(e) => { e.preventDefault(); onNav("Home"); }}>
          <img src="assets/logo-full.svg" alt="Expeditie Werkplezier" />
        </a>

        <nav className="ewk-nav">
          {NAV.map((n) => (
            <a key={n} href="#" className={active === n ? "is-active" : ""}
               onClick={(e) => { e.preventDefault(); onNav(n); }}>{n}</a>
          ))}
        </nav>

        <div className="ewk-header__actions">
          <div className="ewk-social">
            <a className="ewk-iconbtn" title="LinkedIn" href="#" onClick={(e)=>e.preventDefault()}><Icon name="linkedin" /></a>
            <a className="ewk-iconbtn" title="Instagram" href="#" onClick={(e)=>e.preventDefault()}><Icon name="instagram" /></a>
          </div>
          <div className="ewk-show-desktop">
            <Button variant="primary" onClick={onEbook} icon="download">Gratis ebook</Button>
          </div>
          <button className="ewk-iconbtn ewk-hamb" onClick={onMenu} title="Menu">
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <div className={"ewk-mobile" + (menuOpen ? " is-open" : "")}>
        {NAV.map((n) => (
          <a key={n} href="#" className={active === n ? "is-active" : ""}
             onClick={(e) => { e.preventDefault(); onNav(n); }}>{n}</a>
        ))}
        <div style={{ marginTop: 18 }}>
          <Button variant="primary" block icon="download" onClick={onEbook}>Download gratis ebook</Button>
        </div>
      </div>
    </header>
  );
}

const MODAL_CONTENT = {
  ebook: {
    title: "In 7 stappen van werkdruk naar werkgeluk",
    desc: "Gratis en vooral praktisch ebook met de 7 stappen naar een energiek en comfortabel leven. Vul je gegevens in en je ontvangt hem direct in je inbox.",
    button: "Stuur mij het ebook",
    success: "Je ebook is onderweg naar",
  },
  scan: {
    title: "Doe de gratis Stress & Energiescan",
    desc: "Ontdek of jouw lichaam al signalen geeft dat het te veel wordt — en wat je kunt doen om weer rust en energie te krijgen. Je ontvangt de scan direct in je inbox.",
    button: "Stuur mij de scan",
    success: "Je Stress & Energiescan is onderweg naar",
  },
};

function EbookModal({ open, kind = "ebook", onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const c = MODAL_CONTENT[kind] || MODAL_CONTENT.ebook;

  useEffect(() => {
    if (open) { setSubmitted(false); setName(""); setEmail(""); }
  }, [open]);

  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <div className={"ewk-modal__scrim" + (open ? " is-open" : "")} onClick={onClose}>
      <div className="ewk-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ewk-modal__close" onClick={onClose}><Icon name="x" /></button>
        {!submitted ? (
          <React.Fragment>
            <img className="ewk-modal__mark" src="assets/logo-mark.svg" alt="" />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <form onSubmit={submit}>
              <div className="ewk-field">
                <label>Je naam</label>
                <input className="ewk-input" placeholder="Sanne" value={name}
                       onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="ewk-field">
                <label>E-mailadres</label>
                <input className="ewk-input" type="email" placeholder="jij@voorbeeld.nl" value={email}
                       onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div style={{ marginTop: 22 }}>
                <Button variant="primary" block type="submit" iconRight="arrow-right">{c.button}</Button>
              </div>
              <p style={{ fontSize: 12, color: "var(--ew-ink-400)", margin: "14px 0 0", textAlign: "center" }}>
                Geen spam. Je kunt je altijd weer afmelden.
              </p>
            </form>
          </React.Fragment>
        ) : (
          <div className="ewk-success">
            <div className="ewk-success__ring"><Icon name="check" /></div>
            <h3>Check je inbox{ name ? `, ${name}` : "" }!</h3>
            <p>{c.success} <b style={{ color: "var(--ew-pine-600)" }}>{email}</b>. En zet vooral die eerste stap.</p>
            <Button variant="outline" block onClick={onClose}>Sluiten</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoLightbox({ open, onClose }) {
  return (
    <div className={"ewk-modal__scrim" + (open ? " is-open" : "")} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
           style={{ width: "min(760px,100%)", aspectRatio: "16/9", background: "#1f3d3d",
             borderRadius: 20, boxShadow: "var(--ew-shadow-lg)", position: "relative",
             display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <button className="ewk-modal__close" onClick={onClose}><Icon name="x" /></button>
        <div style={{ textAlign: "center", color: "#cfe4e0" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--ew-grad-warm)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "#fff" }}>
            <Icon name="play" style={{ width: 28, height: 28 }} />
          </div>
          <p style={{ fontFamily: "var(--ew-font-serif)", fontStyle: "italic", fontSize: 18, margin: 0 }}>
            Agathe vertelt haar verhaal
          </p>
          <p style={{ fontSize: 13, opacity: .7, marginTop: 6 }}>Videoplaceholder — koppel hier je YouTube-fragment.</p>
        </div>
      </div>
    </div>
  );
}

function Footer({ onEbook, onNav }) {
  return (
    <footer className="ewk-footer">
      <div className="ewk-wrap">
        <div className="ewk-footer__grid">
          <div>
            <img className="foot-logo" src="assets/logo-full-contra.svg" alt="Expeditie Werkplezier" />
            <p>Speciaal voor werkende moeders die meer grip willen op hun overvolle agenda én hoofd — zodat ze weer kunnen genieten van wat echt belangrijk is.</p>
            <div className="ewk-footer__social">
              <a href="#" title="LinkedIn" onClick={(e)=>e.preventDefault()}><Icon name="linkedin" /></a>
              <a href="#" title="Instagram" onClick={(e)=>e.preventDefault()}><Icon name="instagram" /></a>
              <a href="#" title="Facebook" onClick={(e)=>e.preventDefault()}><Icon name="facebook" /></a>
              <a href="#" title="Mail" onClick={(e)=>e.preventDefault()}><Icon name="mail" /></a>
            </div>
          </div>
          <div>
            <h4>Menu</h4>
            <ul className="ewk-footer__links">
              {NAV.map((n) => (
                <li key={n}><a href="#" onClick={(e) => { e.preventDefault(); onNav(n); }}>{n}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Gratis <b>ebook</b></h4>
            <p>De 7 stappen naar een energiek en comfortabel leven waarin jouw prioriteiten glashelder zijn.</p>
            <Button variant="solid" onClick={onEbook} icon="download">Download gratis</Button>
          </div>
        </div>
        <div className="ewk-footer__bottom">
          <span>© Agathe Hania · Expeditie Werkplezier · Waddinxveen · KVK ·· · BTW NL···B01</span>
          <span>Algemene Voorwaarden · Privacyverklaring · Cookiebeleid</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Button, Header, EbookModal, VideoLightbox, Footer, NAV });
