/* Expeditie Werkplezier – core components
   Icon, Button, Header, EbookModal, VideoLightbox, Footer. Exported to window. */
const { useState, useEffect, useRef } = React;

function Icon({ name, style }) {
  const key = name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
  const definition = lucideIcons[key];
  if (!definition) return null;
  function renderNode([tag, attributes, children = []], index) {
    const props = Object.fromEntries(Object.entries(attributes).map(([attribute, value]) =>
      [attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value]));
    if (tag === "svg") Object.assign(props, {
      className: `lucide lucide-${name}`, style, "aria-hidden": true, focusable: "false",
    });
    return React.createElement(tag, { ...props, key: index }, children.map(renderNode));
  }
  return renderNode(definition, 0);
}

function Button({ variant = "primary", size, block, icon, iconRight, children, onClick, type, href, target, disabled }) {
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
    <button className={cls} onClick={onClick} type={type || "button"} disabled={disabled}>{inner}</button>
  );
}

const PAGE_FILES = {
  "Home": "index.html", "Over Agathe": "over-agathe.html", "Aanbod": "aanbod.html",
  "Ervaringen": "ervaringen.html", "Contact": "contact.html", "Traject": "traject.html",
  "Deep Dive": "deep-dive.html", "Gratis scan": "gratis-scan.html", "Bedankt scan": "bedankt-scan.html",
  "Privacy": "privacy.html", "Cookies": "cookies.html", "Voorwaarden": "voorwaarden.html",
  "Sitemap": "sitemap.html",
};
const NAV = ["Home", "Over Agathe", "Aanbod", "Ervaringen", "Contact"];

function followPage(event, name, onNav) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNav(name);
}

function Header({ scrolled, active, onNav, onScan, onMenu, menuOpen }) {
  return (
    <React.Fragment>
      <header className={"ewk-header" + (scrolled ? " is-scrolled" : "")}>
        <div className="ewk-wrap ewk-header__inner">
          <a className="ewk-header__logo" href={PAGE_FILES.Home} onClick={(e) => followPage(e, "Home", onNav)}>
            <img src="assets/logo-full.svg" alt="Expeditie Werkplezier" />
          </a>

          <nav className="ewk-nav">
            {NAV.map((n) => (
              <a key={n} href={PAGE_FILES[n]} className={active === n ? "is-active" : ""}
                 aria-current={active === n ? "page" : undefined}
                 onClick={(e) => followPage(e, n, onNav)}>{n}</a>
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
            <button className="ewk-iconbtn ewk-hamb" onClick={onMenu} title="Menu"
                    aria-expanded={menuOpen} aria-controls="mobile-menu">
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={"ewk-mobile" + (menuOpen ? " is-open" : "")} hidden={!menuOpen}>
        {NAV.map((n) => (
          <a key={n} href={PAGE_FILES[n]} className={active === n ? "is-active" : ""}
             onClick={(e) => followPage(e, n, onNav)}>{n}</a>
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
    desc: "Ontdek of jouw lichaam al signalen geeft dat het te veel wordt – en wat je kunt doen om weer rust en energie te krijgen. Je ontvangt de scan direct in je inbox.",
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
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <dialog ref={dialogRef} className="ewk-modal__scrim is-open" aria-label="Het verhaal van Agathe"
            onCancel={(e) => { e.preventDefault(); onClose(); }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div onClick={(e) => e.stopPropagation()}
           style={{ width: "min(880px,100%)", aspectRatio: "16/9", background: "#1f3d3d",
             borderRadius: 20, boxShadow: "var(--ew-shadow-lg)", position: "relative", overflow: "hidden" }}>
        <button className="ewk-modal__close" aria-label="Video sluiten" onClick={onClose}><Icon name="x" /></button>
        {open && (
          <video
            src="assets/bedrijfsvideo.mp4"
            controls autoPlay playsInline preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "#1f3d3d" }}
          />
        )}
      </div>
    </dialog>
  );
}

function Footer({ onScan, onNav, onCookiePrefs }) {
  return (
    <footer className="ewk-footer">
      <div className="ewk-wrap">
        <div className="ewk-footer__grid">
          <div>
            <img className="foot-logo" src="assets/logo-full-contra.svg" alt="Expeditie Werkplezier" />
            <p>Speciaal voor werkende moeders die meer grip willen op hun overvolle agenda én hoofd – zodat ze weer kunnen genieten van wat echt belangrijk is.</p>
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
                <li key={n}><a href={PAGE_FILES[n]} onClick={(e) => followPage(e, n, onNav)}>{n}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Gratis <b>scan</b></h4>
            <p>Ontdek in 10 minuten wat er écht speelt in jouw brein en lichaam – en wat jouw eerste stap is naar meer rust en energie.</p>
            <Button variant="solid" onClick={onScan} icon="clipboard-list">Doe de gratis scan</Button>
          </div>
        </div>
        <div className="ewk-footer__bottom">
          <span>© Agathe Hania · Expeditie Werkplezier · Waddinxveen · KVK 57284946 · BTW NL001412727B96</span>
          <span><a href={PAGE_FILES.Voorwaarden} onClick={(e) => followPage(e, "Voorwaarden", onNav)}>Algemene Voorwaarden</a> · <a href={PAGE_FILES.Privacy} onClick={(e) => followPage(e, "Privacy", onNav)}>Privacyverklaring</a> · <a href={PAGE_FILES.Cookies} onClick={(e) => followPage(e, "Cookies", onNav)}>Cookiebeleid</a> · <button className="ewk-footer__cookieprefs" onClick={onCookiePrefs}>Cookievoorkeuren</button></span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Cookie consent ---------------- */
const EWK_CONSENT_KEY = "ewk-cookie-consent";
const EWK_CONSENT_VERSION = 2;
const EWK_CONSENT_MAX_AGE = 365 * 24 * 60 * 60 * 1000;

function readConsent() {
  try {
    const consent = JSON.parse(localStorage.getItem(EWK_CONSENT_KEY) || "null");
    return consent && consent.version === EWK_CONSENT_VERSION && typeof consent.analytics === "boolean" &&
      typeof consent.ts === "number" && Date.now() - consent.ts < EWK_CONSENT_MAX_AGE ? consent : null;
  }
  catch (e) { return null; }
}
function writeConsent(val) {
  const consent = { ...val, version: EWK_CONSENT_VERSION, ts: Date.now() };
  try { localStorage.setItem(EWK_CONSENT_KEY, JSON.stringify(consent)); } catch (e) {}
  window.dispatchEvent(new CustomEvent("ewk:consent", { detail: consent }));
}

function CookieBanner({ open, onChoice, onNav }) {
  if (!open) return null;
  return (
    <div className="ewk-cookie" role="dialog" aria-label="Cookievoorkeuren" aria-live="polite">
      <div className="ewk-cookie__card">
        <span className="ewk-cookie__ic"><Icon name="cookie" /></span>
        <div className="ewk-cookie__body">
          <h4>Even over cookies</h4>
          <p>
            Je keuze wordt op dit apparaat onthouden. Het externe script voor statistieken en tracking
            laad ik alleen als je <b>alle cookies accepteert</b>. Kies “Alleen functioneel” om dit uit te
            schakelen. Meer lezen? Zie mijn{" "}
            <a href={PAGE_FILES.Cookies} onClick={(e) => followPage(e, "Cookies", onNav)}>cookiebeleid</a>.
          </p>
          <div className="ewk-cookie__actions">
            <Button variant="primary" size="sm" onClick={() => onChoice({ functional: true, analytics: true })}>Alle cookies accepteren</Button>
            <Button variant="outline" size="sm" onClick={() => onChoice({ functional: true, analytics: false })}>Alleen functioneel</Button>
          </div>
        </div>
        <button className="ewk-cookie__close" title="Alleen functioneel" aria-label="Sluiten – alleen functionele cookies"
                onClick={() => onChoice({ functional: true, analytics: false })}><Icon name="x" /></button>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Button, Header, EbookModal, VideoLightbox, Footer, NAV, CookieBanner, readConsent, writeConsent });
