/* Expeditie Werkplezier — page sections & reusable blocks */
const { useState: useSt, useEffect: useEf, useRef: useRf } = React;

/* ---------- Reusable portrait in the gradient ring ---------- */
function Portrait({ size, label, play, onPlay, src }) {
  return (
    <div className="ewk-portrait" style={size ? { width: size } : null}>
      <div className="ewk-portrait__inner">
        <img src={src || "assets/agathe-portrait.png"} alt={label || "Agathe Hania"} />
      </div>
      {play && (
        <button className="ewk-play" onClick={onPlay}>
          <span className="ewk-play__dot"><Icon name="play" /></span>
          <span>Bekijk mijn verhaal</span>
        </button>
      )}
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="ewk-eyebrow">{children}</span>;
}

function SectionHead({ eyebrow, title, sub, align }) {
  return (
    <div className={"ewk-section__head" + (align === "left" ? " is-left" : "")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="ewk-h2" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="ewk-section__sub">{sub}</p>}
    </div>
  );
}

/* =========================================================================
   HERO — three variants: quote · statement · split
   ========================================================================= */
function Hero({ variant, onEbook, onNav, onPlay }) {
  if (variant === "statement") return <HeroStatement onEbook={onEbook} onNav={onNav} onPlay={onPlay} />;
  if (variant === "split") return <HeroSplit onEbook={onEbook} onNav={onNav} onPlay={onPlay} />;
  return <HeroQuote onEbook={onEbook} onNav={onNav} onPlay={onPlay} />;
}

/* Variant A — empathetic quote + ringed portrait (the original brand device) */
function HeroQuote({ onEbook, onNav, onPlay }) {
  return (
    <section className="ewk-hero ewk-hero--quote">
      <div className="ewk-wrap ewk-hero__grid">
        <div>
          <Eyebrow>Van werkdruk naar werkgeluk</Eyebrow>
          <h1 className="ewk-hero__quote">“Het lukt me maar niet om rust te vinden en tijd voor mezelf te plannen.”</h1>
          <p className="ewk-hero__lead">
            Expeditie Werkplezier is er voor <span className="ewk-key">werkende moeders</span> die meer{" "}
            <span className="ewk-key">grip</span> willen op hun <span className="ewk-key">overvolle agenda én hoofd</span> —
            zodat je weer met een ontspannen gevoel kunt genieten van wat écht belangrijk is.
          </p>
          <div className="ewk-hero__cta">
            <Button variant="primary" size="lg" icon="download" onClick={onEbook}>Download gratis ebook</Button>
            <Button variant="ghost" iconRight="arrow-right" onClick={() => onNav("Over Agathe")}>Lees het verhaal over Agathe</Button>
          </div>
        </div>
        <Portrait play onPlay={onPlay} />
      </div>
    </section>
  );
}

/* Variant B — centered bold positioning statement + trust row underneath */
function HeroStatement({ onEbook, onNav }) {
  return (
    <section className="ewk-hero ewk-hero--statement">
      <div className="ewk-wrap ewk-hero__center">
        <Eyebrow>Voor ambitieuze, werkende moeders</Eyebrow>
        <h1 className="ewk-hero__big">
          Van <em>werkdruk</em><br />naar <em>werkgeluk</em>
        </h1>
        <p className="ewk-hero__lead is-center">
          Meer rust in je hoofd én lijf, meer energie en weer kunnen genieten van wat echt
          belangrijk is. Zonder dat je jezelf voorbijloopt.
        </p>
        <div className="ewk-hero__cta is-center">
          <Button variant="primary" size="lg" icon="download" onClick={onEbook}>Download gratis ebook</Button>
          <Button variant="outline" size="lg" onClick={() => onNav("Aanbod")}>Bekijk hoe ik je help</Button>
        </div>
        <div className="ewk-trust ewk-trust--hero">
          {TRUST.map(([n, l]) => (
            <div className="ewk-trust__item" key={l}>
              <span className="ewk-trust__num">{n}</span>
              <span className="ewk-trust__lbl">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Variant C — content left on cream, full-bleed photo right with floating chips */
function HeroSplit({ onEbook, onNav, onPlay }) {
  return (
    <section className="ewk-hero ewk-hero--split">
      <div className="ewk-hero__split-grid">
        <div className="ewk-hero__split-content">
          <div className="ewk-hero__split-inner">
            <Eyebrow>Van werkdruk naar werkgeluk</Eyebrow>
            <h1 className="ewk-hero__quote">Weer rust in je hoofd, energie in je lijf en tijd voor wat telt.</h1>
            <p className="ewk-hero__lead">
              Ik help <span className="ewk-key">werkende moeders</span> die hun baan en gezin combineren
              om grip te krijgen op hun overvolle agenda én hoofd — voordat het emmertje overloopt.
            </p>
            <div className="ewk-hero__cta">
              <Button variant="primary" size="lg" icon="download" onClick={onEbook}>Download gratis ebook</Button>
              <Button variant="ghost" iconRight="arrow-right" onClick={() => onNav("Over Agathe")}>Maak kennis met Agathe</Button>
            </div>
          </div>
        </div>
        <div className="ewk-hero__split-photo">
          <img src="assets/cover-photo.png" alt="Agathe Hania" />
          <button className="ewk-play ewk-play--float" onClick={onPlay}>
            <span className="ewk-play__dot"><Icon name="play" /></span>
            <span>Bekijk mijn verhaal</span>
          </button>
          <div className="ewk-floatcard">
            <div className="ewk-stars">{[0,1,2,3,4].map(i => <Icon key={i} name="star" />)}</div>
            <p>“Ik heb meer energie dan ooit.”</p>
            <span>— Marleen, consultant</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TRUST BAR (standalone, for non-statement heroes)
   ========================================================================= */
function TrustBar() {
  return (
    <section className="ewk-trustbar">
      <div className="ewk-wrap ewk-trust">
        {TRUST.map(([n, l]) => (
          <div className="ewk-trust__item" key={l}>
            <span className="ewk-trust__num">{n}</span>
            <span className="ewk-trust__lbl">{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   RECOGNITION + BENEFITS
   ========================================================================= */
const SYMPTOMS = [
  ["zap", "Ik ben ", "continu moe", " en heb weinig energie."],
  ["flame", "Ik heb een ", "kort lontje", "."],
  ["briefcase", "Ik kan mijn werk ", "moeilijk loslaten", "."],
  ["waves", "Ik heb moeite om me ", "volledig te ontspannen", "."],
  ["cloud-rain", "Ik voel me ", "onrustig en pieker", " veel."],
  ["brain", "Mijn hoofd is ", "overprikkeld", ", ik concentreer me slecht."],
];

const BENEFITS = [
  ["Je ", "meer rust", " hebt in je hoofd en lijf."],
  ["Je meer energie hebt en ", "beter slaapt", "."],
  ["Je af en toe ", "de boel de boel", " kunt laten."],
  ["Je veel meer kunt ", "genieten", " van het moment."],
  ["Meer zou kunnen toegeven aan je ", "eigen behoeftes", "."],
  ["Je je ", "werk beter zou kunnen loslaten", "."],
];

function Recognition() {
  return (
    <section className="ewk-section">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Je bent niet de enige"
          title="Ben jij een <em>ambitieuze moeder</em> en herken jij je hierin?" />
        <ul className="ewk-list">
          {SYMPTOMS.map(([ic, a, b, c], i) => (
            <li key={i}>
              <span className="ewk-ic ewk-ic--sym"><Icon name={ic} /></span>
              <span>{a}<span className="ewk-key">{b}</span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="ewk-list-note">Dit kan echt anders!</p>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="ewk-section ewk-section--wash">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Stel je eens voor" title="Hoe zou jij je voelen als.." />
        <ul className="ewk-list">
          {BENEFITS.map(([a, b, c], i) => (
            <li key={i}>
              <span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>
              <span>{a}<span className="ewk-key">{b}</span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================================================================
   AANBOD — three variants: cards · tiers · spotlight
   ========================================================================= */
function Aanbod({ variant, onNav, sand }) {
  const Inner = variant === "tiers" ? AanbodTiers : variant === "spotlight" ? AanbodSpotlight : AanbodCards;
  return (
    <section className={"ewk-section" + (sand ? " ewk-section--sand" : "")}>
      <div className="ewk-wrap">
        <SectionHead eyebrow="Werk samen met mij"
          title="Hoe ik je kan helpen"
          sub="Of je nu liever 1-op-1 werkt, de kracht van een groep zoekt of binnen je organisatie iets wilt veranderen — er is een vorm die bij je past." />
        <Inner onNav={onNav} />
      </div>
    </section>
  );
}

/* A — three even cards */
function AanbodCards({ onNav }) {
  return (
    <div className="ewk-cards">
      {TRAJECTEN.map((o) => (
        <div className={"ewk-offer ewk-offer--" + o.accent} key={o.key}>
          <div className={"ewk-offer__ic ewk-offer__ic--" + o.accent}><Icon name={o.icon} /></div>
          <span className="ewk-offer__kicker">{o.kicker}</span>
          <h3>{o.title}</h3>
          <p>{o.body}</p>
          <a className="ewk-offer__link" href="#" onClick={(e) => { e.preventDefault(); onNav(o.key === "coaching" ? "Traject" : "Aanbod"); }}>
            Meer weten <Icon name="arrow-right" />
          </a>
        </div>
      ))}
    </div>
  );
}

/* B — numbered horizontal tiers with included-points */
function AanbodTiers({ onNav }) {
  return (
    <div className="ewk-tiers">
      {TRAJECTEN.map((o, i) => (
        <div className={"ewk-tier ewk-tier--" + o.accent} key={o.key}>
          <div className="ewk-tier__num"><span>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="ewk-tier__main">
            <span className="ewk-offer__kicker">{o.kicker}</span>
            <h3>{o.title}</h3>
            <p className="ewk-tier__tag">{o.tagline}</p>
            <p>{o.body}</p>
          </div>
          <div className="ewk-tier__side">
            <ul className="ewk-checks">
              {o.points.map((p) => (
                <li key={p}><Icon name="check" />{p}</li>
              ))}
            </ul>
            <div className="ewk-tier__foot">
              <span className="ewk-tier__meta"><Icon name="clock" />{o.meta}</span>
              <Button variant="outline" size="sm" iconRight="arrow-right" onClick={() => onNav(o.key === "coaching" ? "Traject" : "Contact")}>{o.cta}</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* C — one spotlight offer + two compact */
function AanbodSpotlight({ onNav }) {
  const [main, ...rest] = TRAJECTEN;
  return (
    <div className="ewk-spotlight">
      <div className={"ewk-spot ewk-spot--main ewk-offer--" + main.accent}>
        <div className="ewk-spot__badge">Meest gekozen</div>
        <div className={"ewk-offer__ic ewk-offer__ic--" + main.accent}><Icon name={main.icon} /></div>
        <span className="ewk-offer__kicker">{main.kicker}</span>
        <h3>{main.title}</h3>
        <p className="ewk-tier__tag">{main.tagline}</p>
        <p>{main.body}</p>
        <ul className="ewk-checks ewk-checks--2col">
          {main.points.map((p) => (<li key={p}><Icon name="check" />{p}</li>))}
        </ul>
        <div className="ewk-spot__foot">
          <span className="ewk-tier__meta"><Icon name="clock" />{main.meta}</span>
          <Button variant="primary" iconRight="arrow-right" onClick={() => onNav("Traject")}>{main.cta}</Button>
        </div>
      </div>
      <div className="ewk-spot__col">
        {rest.map((o) => (
          <div className={"ewk-spot ewk-spot--mini ewk-offer--" + o.accent} key={o.key}>
            <div className={"ewk-offer__ic ewk-offer__ic--" + o.accent}><Icon name={o.icon} /></div>
            <div>
              <span className="ewk-offer__kicker">{o.kicker}</span>
              <h3>{o.title}</h3>
              <p>{o.tagline}</p>
              <a className="ewk-offer__link" href="#" onClick={(e) => { e.preventDefault(); onNav("Aanbod"); }}>
                Meer weten <Icon name="arrow-right" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   ABOUT TEASER (home) — split photo + story intro
   ========================================================================= */
function AboutTeaser({ onNav }) {
  return (
    <section className="ewk-section ewk-section--wash">
      <div className="ewk-wrap ewk-about">
        <div className="ewk-about__photo">
          <Portrait size="100%" />
        </div>
        <div className="ewk-about__text">
          <Eyebrow>Over Agathe</Eyebrow>
          <h2 className="ewk-h2">Ik heb het zelf meegemaakt — daarom snap ik je.</h2>
          <p>
            Ik ben Agathe, psycholoog en stresscoach, vrouw van Bas en moeder van twee meiden. Jaren
            werkte ik als HR-manager, vol energie en drive. Tot na de geboorte van mijn eerste dochter
            <span className="ewk-key"> zo maar, pats boem, het licht uitging</span>.
          </p>
          <p>
            Die burn-out leerde me hoe het anders kan. Nu help ik andere moeders om diezelfde weg te
            vinden — no-nonsense, gebaseerd op feiten en super praktisch.
          </p>
          <Button variant="solid" iconRight="arrow-right" onClick={() => onNav("Over Agathe")}>Lees mijn verhaal</Button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   MISSION band
   ========================================================================= */
function Mission() {
  return (
    <section className="ewk-mission">
      <img className="ewk-mission__mark" src="assets/logo-mark.svg" alt="" />
      <div className="ewk-wrap ewk-mission__inner">
        <span className="ewk-mission__eyebrow">Missie</span>
        <p className="ewk-mission__quote">
          “Ik geloof in een wereld waarin <b>vrouwelijke professionals met jonge kinderen</b> zich
          krachtig staande kunnen houden. Een wereld waarin zij een uitdagende baan kan combineren
          met haar gezin <b>zonder dat zij zichzelf voorbij loopt.</b>”
        </p>
        <div className="ewk-aristotle">
          <p>“Alles wat je aandacht geeft groeit”</p>
          <span>~ Aristoteles · Filosoof</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TESTIMONIALS carousel
   ========================================================================= */
function Testimonials({ wash }) {
  const [i, setI] = useSt(0);
  const n = TESTIMONIALS.length;
  const go = (d) => setI((p) => (p + d + n) % n);
  useEf(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n]);
  const t = TESTIMONIALS[i];
  return (
    <section className={"ewk-section" + (wash ? " ewk-section--wash" : "")}>
      <div className="ewk-wrap">
        <SectionHead eyebrow="Ervaringen"
          title="Wat moeders vóór jou ervoeren"
          sub="Echte verhalen van vrouwen die de stap zetten — van overleven naar weer genieten." />
        <div className="ewk-carousel">
          <button className="ewk-carousel__arrow" onClick={() => go(-1)} aria-label="Vorige"><Icon name="chevron-left" /></button>
          <div className="ewk-quotebig">
            <Icon name="quote" style={{ width: 40, height: 40 }} />
            <div className="ewk-stars">{Array.from({length: t.rating}).map((_, k) => <Icon key={k} name="star" />)}</div>
            <p className="ewk-quotebig__q">{t.quote}</p>
            <div className="ewk-quotebig__who">
              <span className="ewk-avatar">{t.name[0]}</span>
              <span><b>{t.name}</b><br />{t.role}</span>
            </div>
          </div>
          <button className="ewk-carousel__arrow" onClick={() => go(1)} aria-label="Volgende"><Icon name="chevron-right" /></button>
        </div>
        <div className="ewk-dots">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} className={"ewk-dot" + (k === i ? " is-active" : "")} onClick={() => setI(k)} aria-label={"Ga naar " + (k+1)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   EBOOK split (lead magnet)
   ========================================================================= */
function EbookSplit({ onEbook }) {
  return (
    <section className="ewk-section ewk-section--sand">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Van “overleven” naar “gelukkig leven”"
          title="Begin vandaag — met de gratis 7 stappen"
          sub="Veel vrouwen lopen op een bepaald moment tegen hun grenzen aan. Ik maakte een analyse van alle redenen waardoor het emmertje (bijna) overliep — en schreef er een ebook over." />
        <div className="ewk-split">
          <div className="ewk-ebook">
            <div className="ewk-ebook__cover"><img src="assets/logo-mark.svg" alt="" /><span>ebook</span></div>
            <div>
              <h3>In 7 stappen van werkdruk naar werkgeluk</h3>
              <p>
                7 unieke stappen die helpen om uit je burn-out te komen — of, liever nog, om er één te
                voorkomen. <span className="ewk-key">No-nonsense</span>, gebaseerd op feiten en super praktisch.
              </p>
              <Button variant="primary" size="lg" icon="download" onClick={onEbook}>Download gratis ebook</Button>
            </div>
          </div>
          <div className="ewk-quotecard">
            <div className="ewk-stars">{[0,1,2,3,4].map(i => <Icon key={i} name="star" />)}</div>
            <p className="ewk-quotecard__q">
              “Je hebt mij in staat gesteld mijn uitdagingen aan te pakken. Dit heeft me veel rust
              opgeleverd — ik heb meer energie dan ooit.”
            </p>
            <div className="ewk-quotecard__who">Marleen · Consultant</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   BLOG teaser (3 latest)
   ========================================================================= */
function BlogTeaser({ onNav }) {
  return (
    <section className="ewk-section">
      <div className="ewk-wrap">
        <div className="ewk-section__head is-left ewk-blog__head">
          <div>
            <Eyebrow>Van het blog</Eyebrow>
            <h2 className="ewk-h2">Lees, herken, en zet de eerste stap</h2>
          </div>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => onNav("Blog")}>Alle artikelen</Button>
        </div>
        <div className="ewk-cards">
          {POSTS.slice(0, 3).map((p) => <PostCard key={p.title} p={p} onNav={onNav} />)}
        </div>
      </div>
    </section>
  );
}

function PostCard({ p, onNav }) {
  return (
    <article className="ewk-post" onClick={() => onNav("Blog")}>
      <div className={"ewk-post__img ewk-post__img--" + p.accent}>
        <span className={"ewk-chip ewk-chip--" + p.accent}>{p.cat}</span>
      </div>
      <div className="ewk-post__body">
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <div className="ewk-post__meta">
          <span><Icon name="calendar" />{p.date}</span>
          <span><Icon name="clock" />{p.read}</span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================================
   FINAL CTA
   ========================================================================= */
function FinalCTA({ onNav, onScan, onEbook }) {
  const goScan = onScan || onEbook;
  return (
    <section className="ewk-finalcta">
      <div className="ewk-wrap ewk-finalcta__inner">
        <Eyebrow>Klaar voor de eerste stap?</Eyebrow>
        <h2 className="ewk-h2">Het kan écht anders. Laten we kennismaken.</h2>
        <p>Geen verplichtingen — gewoon een eerlijk gesprek over waar jij tegenaan loopt en wat je nodig hebt.</p>
        <div className="ewk-hero__cta is-center">
          <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Plan een kennismaking</Button>
          <Button variant="outline" size="lg" icon="clipboard-list" onClick={goScan}>Doe de gratis scan</Button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SCAN CTA band (free lead magnet) — replaces the old ebook split
   ========================================================================= */
function ScanCTA({ onScan }) {
  return (
    <section className="ewk-section ewk-section--sand">
      <div className="ewk-wrap">
        <SectionHead eyebrow="Gratis eerste stap"
          title="Begin vandaag — met de gratis Stress &amp; Energiescan"
          sub="Je hoofd staat nooit stil en stoppen lukt niet meer? Ontdek in 10 minuten wat er écht speelt in jouw brein en lichaam — en wat jouw eerste stap is naar meer rust en energie." />
        <div className="ewk-split">
          <div className="ewk-ebook">
            <div className="ewk-ebook__cover"><img src="assets/logo-mark.svg" alt="" /><span>scan</span></div>
            <div>
              <h3>Stress &amp; Energiescan</h3>
              <p>
                Geen standaardtest, maar concreet inzicht in jouw stressprofiel. Je stopt met twijfelen
                aan jezelf en weet wat je nodig hebt. <span className="ewk-key">Gratis</span>, in een paar
                minuten, met direct inzicht.
              </p>
              <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Doe de gratis scan</Button>
            </div>
          </div>
          <div className="ewk-quotecard">
            <div className="ewk-stars">{[0,1,2,3,4].map(i => <Icon key={i} name="star" />)}</div>
            <p className="ewk-quotecard__q">
              “Ik dacht echt dat het aan mij lag. Maar door de uitleg viel alles op zijn plek. Dat gaf
              zoveel rust in mijn hoofd.”
            </p>
            <div className="ewk-quotecard__who">Uit de Stress &amp; Energiescan</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FAQ accordion (used on Aanbod & Contact)
   ========================================================================= */
function FaqList({ items }) {
  const list = items || FAQ;
  const [open, setOpen] = useSt(0);
  return (
    <div className="ewk-faq">
      {list.map((f, i) => (
        <div className={"ewk-faq__item" + (open === i ? " is-open" : "")} key={i}>
          <button className="ewk-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <Icon name={open === i ? "minus" : "plus"} />
          </button>
          <div className="ewk-faq__a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Portrait, Eyebrow, SectionHead, Hero, TrustBar, Recognition, Benefits,
  Aanbod, AboutTeaser, Mission, Testimonials, EbookSplit, ScanCTA, BlogTeaser, PostCard, FinalCTA, FaqList,
});
