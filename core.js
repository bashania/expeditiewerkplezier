/* Expeditie Werkplezier — core components
   Icon, Button, Header, EbookModal, VideoLightbox, Footer. Exported to window. */
const { useState, useEffect, useRef } = React;

function Icon({ name, style }) {
  return <i data-lucide={name} style={style}></i>;
}

function Button({ variant = "primary", size, block, icon, iconRight, children, onClick, type, href, target }) {
  const cls = [
    "ewk-btn",
    `ewk-btn--${variant}`,
    size === "lg" ? "ewk-btn--lg" : "",
    size === "sm" ? "ewk-btn--sm" : "",
    block ? "ewk-btn--block" : "",
  ].filter(Boolean).join(" ");
  const inner = (
    <React.Fragment>
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </React.Fragment>
  );
  if (href) {
    return (
      <a className={cls} href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} onClick={onClick}>{inner}</a>
    );
  }
  return (
    <button className={cls} onClick={onClick} type={type || "button"}>{inner}</button>
  );
}

const NAV = ["Home", "Over Agathe", "Aanbod", "Ervaringen", "Blog", "Contact"];

function Header({ scrolled, active, onNav, onScan, onMenu, menuOpen }) {
  return (
    <React.Fragment>
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
              <a className="ewk-iconbtn" title="LinkedIn" href="https://www.linkedin.com/in/agathe-hania-893577338/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" /></a>
              <a className="ewk-iconbtn" title="Instagram" href="https://www.instagram.com/agathehania/" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></a>
            </div>
            <div className="ewk-show-desktop">
              <Button variant="primary" onClick={onScan} icon="clipboard-list">Gratis scan</Button>
            </div>
            <button className="ewk-iconbtn ewk-hamb" onClick={onMenu} title="Menu">
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div className={"ewk-mobile" + (menuOpen ? " is-open" : "")}>
        {NAV.map((n) => (
          <a key={n} href="#" className={active === n ? "is-active" : ""}
             onClick={(e) => { e.preventDefault(); onNav(n); }}>{n}</a>
        ))}
        <div style={{ marginTop: 18 }}>
          <Button variant="primary" block icon="clipboard-list" onClick={onScan}>Doe de gratis scan</Button>
        </div>
      </div>
    </React.Fragment>
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
           style={{ width: "min(880px,100%)", aspectRatio: "16/9", background: "#1f3d3d",
             borderRadius: 20, boxShadow: "var(--ew-shadow-lg)", position: "relative", overflow: "hidden" }}>
        <button className="ewk-modal__close" onClick={onClose}><Icon name="x" /></button>
        {open && (
          <video
            src="https://bashania.github.io/expeditiewerkplezier/assets/bedrijfsvideo.mp4"
            controls autoPlay playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "#1f3d3d" }}
          />
        )}
      </div>
    </div>
  );
}

function Footer({ onScan, onNav }) {
  return (
    <footer className="ewk-footer">
      <div className="ewk-wrap">
        <div className="ewk-footer__grid">
          <div>
            <img className="foot-logo" src="assets/logo-full-contra.svg" alt="Expeditie Werkplezier" />
            <p>Speciaal voor werkende moeders die meer grip willen op hun overvolle agenda én hoofd — zodat ze weer kunnen genieten van wat echt belangrijk is.</p>
            <div className="ewk-footer__social">
              <a href="https://www.linkedin.com/in/agathe-hania-893577338/" title="LinkedIn" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" /></a>
              <a href="https://www.instagram.com/agathehania/" title="Instagram" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></a>
              <a href="mailto:agathe@agathehania.nl" title="Mail"><Icon name="mail" /></a>
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
            <h4>Gratis <b>scan</b></h4>
            <p>Ontdek in 10 minuten wat er écht speelt in jouw brein en lichaam — en wat jouw eerste stap is naar meer rust en energie.</p>
            <Button variant="solid" onClick={onScan} icon="clipboard-list">Doe de gratis scan</Button>
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
