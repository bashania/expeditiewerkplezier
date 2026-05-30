/* Expeditie Werkplezier — pages */
const { useState: useStP } = React;

/* Reusable inner-page header band */
function PageHeader({ eyebrow, title, sub, children }) {
  return (
    <section className="ewk-pagehead">
      <div className="ewk-wrap ewk-pagehead__inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="ewk-pagehead__title" dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="ewk-pagehead__sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

/* ===================== HOME lives in home.jsx ===================== */

/* ===================== OVER AGATHE ===================== */
const OA_REASONS = [
  ["heart-handshake", "rose", "Psycholoog én ervaringsdeskundige",
    "Ik combineer wetenschappelijke kennis met persoonlijke ervaring. Daardoor begrijp ik zowel de theorie als de realiteit van ambitieuze moeders. Je voelt je gezien en gehoord — en dat is, verrassend genoeg, een hele belangrijke stap naar herstel."],
  ["search", "sky", "Snel inzicht in patronen",
    "Ik help je patronen herkennen die onder je stress liggen: perfectionisme, pleasegedrag, gewoon doorgaan en een groot verantwoordelijkheidsgevoel. Herkennen is de eerste stap. Daarna verkennen we samen wat er voor jou mogelijk is — opties die je zelf niet zo snel had bedacht."],
  ["activity", "sage", "Hoofd én lichaam aanpak",
    "Stress zit niet alleen in je hoofd. Daarom werk ik ook met technieken die je zenuwstelsel helpen herstellen: lichaamsgerichte oefeningen waarbij je leert signalen van ‘veiligheid’ tussen brein en lichaam te sturen, zodat je blijvend rust voelt in je hele systeem."],
  ["compass", "gold", "Inzicht én praktische stappen",
    "Je krijgt niet alleen helderheid, maar ook concrete handvatten om weer grip te krijgen op je energie en je leven. We maken het samen glashelder, zodat je een duidelijk plan hebt — voor nu en voor de toekomst."],
];

const OA_OPLEIDINGEN = [
  "Universitaire opleiding Arbeids- & Organisatiepsychologie",
  "NLP",
  "Oplossingsgericht coachen",
  "Vitaliteitsmanagement",
  "EMDR",
  "NEI (Neuro Emotionele Integratie)",
  "EFT (Emotional Freedom Technique)",
  "ACT (Acceptance & Commitment Therapy)",
];

const OA_ORGS = ["TNO", "Yacht", "Randstad", "Capgemini", "Sogeti", "Belastingdienst", "RWV advocaten"];

const OA_PATROON = [
  "een groot verantwoordelijkheidsgevoel",
  "perfectionisme en hoge verwachtingen van jezelf",
  "altijd doorgaan, ook wanneer het eigenlijk te veel wordt",
  "moeite met grenzen aangeven",
  "gevoelig zijn voor erkenning en waardering",
  "hard werken als vanzelfsprekende norm",
];

const OA_HELP = [
  "weer grip te krijgen op je leven",
  "een gezonde balans te ervaren tussen een uitdagende baan en een fijn gezinsleven",
  "je eigen verlangens en grenzen haarscherp in beeld te krijgen — en ernaar te handelen",
  "meer rust, ontspanning en oprechte flow te ervaren in plaats van constante druk",
];

const OA_TESTIMONIALS = [
  { name: "Sema", role: "Communicatieadviseur",
    quote: "Door het traject met Agathe begon ik weer in mezelf te geloven en durfde ik keuzes te maken die echt bij mij passen. Ze helpt je dieper naar jezelf te kijken en houdt je op een prettige manier een spiegel voor. Warm en betrokken, en tegelijk eerlijk en kritisch. Daardoor voelde ik me vanaf het begin veilig en serieus genomen." },
  { name: "K.M.", role: "Senior Sales & Business Development Manager",
    quote: "Voordat ik bij Agathe kwam was ik moe, gespannen en had ik moeite alle ballen in de lucht te houden. Ze stelde precies de juiste vragen en hield me op een fijne, eerlijke manier een spiegel voor. Dankzij het traject kan ik weer beter focussen, keuzes maken en voel ik me rustiger en energieker — op werk én thuis." },
  { name: "Annet", role: "Consultant",
    quote: "Agathe heeft mij geholpen bewuster te worden van mijn gedachten, reacties en gedrag. Daardoor kon ik mijn vraagstukken echt aanpakken en ervaar ik veel meer rust. Bijzonder vind ik dat het effect een half jaar na het traject nog steeds merkbaar is. Toegankelijk, betrokken en met een natuurlijke, brede kennis." },
  { name: "Shalini", role: "Adviseur/manager projectbeheersing",
    quote: "Ik ben zo dankbaar dat ik jou heb leren kennen, en voor alle inzichten. Zonder jou was ik niet de persoon die ik vandaag ben." },
];

function OverAgathe({ onScan, onNav, onPlay }) {
  return (
    <main>
      {/* Opening hook */}
      <section className="ewk-hero ewk-hero--quote">
        <div className="ewk-wrap ewk-hero__grid">
          <div>
            <Eyebrow>Over Agathe</Eyebrow>
            <h1 className="ewk-hero__quote">Je probeert alles goed te doen. Voor je werk, je gezin, voor iedereen.</h1>
            <p className="ewk-oa-hook">Maar ergens onderweg ben je jezelf kwijtgeraakt.</p>
            <p className="ewk-hero__lead">
              Je houdt van je werk. Je houdt van je gezin. En meestal lukt het ook om alles draaiende
              te houden — totdat je merkt dat het steeds meer energie kost. <span className="ewk-key">Ik
              weet hoe dat voelt.</span> Want ik stond ooit precies daar waar jij nu staat.
            </p>
            <div className="ewk-hero__cta">
              <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Doe de gratis scan</Button>
              <Button variant="ghost" iconRight="play" onClick={onPlay}>Bekijk mijn verhaal</Button>
            </div>
          </div>
          <Portrait play onPlay={onPlay} />
        </div>
      </section>

      {/* The story */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-prose">
          <Eyebrow>Mijn verhaal</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 26px" }}>Toen mijn lichaam op de rem trapte</h2>
          <p>
            Na mijn zwangerschapsverlof ging ik weer aan het werk. Parttime — dat leek een goede keuze.
            Alleen mijn takenpakket was niet minder geworden. Ik wilde alles goed doen, voor mijn werk
            én voor mijn gezin. Dus ik ging door. Steeds harder. Totdat het niet meer ging.
          </p>
          <blockquote className="ewk-pullquote">
            Van de ene op de andere dag moest ik alles loslaten. Mijn lichaam trok de stekker eruit.
          </blockquote>
          <p>
            Achteraf was het eigenlijk heel logisch. Ik probeerde alles tegelijk te zijn: een betrokken
            professional, een liefdevolle moeder en iemand die overal verantwoordelijkheid voor nam.
            Maar ergens onderweg raakte ik mezelf kwijt. Tijdens mijn herstel begon ik te begrijpen wat
            er werkelijk speelde.
          </p>
          <div className="ewk-oa-patterns">
            {[["sparkles", "Perfectionisme"], ["shield", "Een groot verantwoordelijkheidsgevoel"], ["repeat", "Altijd doorgaan"]].map(([ic, t]) => (
              <div className="ewk-oa-pattern" key={t}><Icon name={ic} /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* What I noticed */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-prose">
          <Eyebrow>Wat mij daarna opviel</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 26px" }}>Mijn verhaal stond niet op zichzelf</h2>
          <p>
            Toen ik later vrouwen begon te begeleiden, viel mij iets op. Ik zag dezelfde patronen steeds
            opnieuw terug bij ambitieuze vrouwen die hun werk combineren met een gezin. Hun hoofd staat
            altijd al bij de volgende taak — zelfs wanneer ze met hun kinderen zijn.
          </p>
          <blockquote className="ewk-pullquote">
            Ze zijn er wel. Maar niet écht aanwezig. En dat doet pijn.
          </blockquote>
          <p>
            Op dat moment besefte ik dat dit geen individueel probleem is. Hier worstelen heel veel
            vrouwen mee. Daaruit ontstond mijn missie.
          </p>
        </div>
      </section>

      {/* Mission band — new copy + Gabor Maté */}
      <section className="ewk-mission">
        <img className="ewk-mission__mark" src="assets/logo-mark.svg" alt="" />
        <div className="ewk-wrap ewk-mission__inner">
          <span className="ewk-mission__eyebrow">Mijn missie</span>
          <p className="ewk-mission__quote">
            Een wereld creëren waarin <b>vrouwelijke professionals hun carrière en gezin kunnen
            combineren zonder zichzelf te verliezen</b>. Ik help gedreven moeders hun eigen behoeften
            weer helder te krijgen — zodat ze leven vanuit <b>rust, energie en plezier</b> in plaats
            van overleven en wilskracht.
          </p>
          <div className="ewk-aristotle">
            <p>“When we have been prevented from learning how to say no, our bodies may end up saying it for us.”</p>
            <span>~ Gabor Maté</span>
          </div>
        </div>
      </section>

      {/* Why women choose me */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Waarom vrouwen voor mij kiezen"
            title="Geen quick fix, maar blijvende verandering" />
          <div className="ewk-reasons">
            {OA_REASONS.map(([ic, accent, t, d]) => (
              <div className={"ewk-reason ewk-offer--" + accent} key={t}>
                <span className={"ewk-offer__ic ewk-offer__ic--" + accent}><Icon name={ic} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background + education */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-bg">
          <div className="ewk-bg__text">
            <Eyebrow>Mijn achtergrond</Eyebrow>
            <h2 className="ewk-h2">Meer dan 10 jaar ervaring met gedreven vrouwen</h2>
            <p>
              Ik begeleid al meer dan tien jaar hoogopgeleide vrouwen die werken in kennisintensieve
              organisaties. In mijn begeleiding combineer ik psychologie, wetenschappelijke inzichten en
              lichaamsgerichte technieken met praktische stappen die je direct kunt toepassen.
            </p>
            <div className="ewk-orgs">
              {OA_ORGS.map((o) => <span className="ewk-org" key={o}>{o}</span>)}
            </div>
          </div>
          <div className="ewk-bg__card">
            <h4><Icon name="graduation-cap" />Opleidingen & trainingen</h4>
            <ul className="ewk-checks">
              {OA_OPLEIDINGEN.map((o) => <li key={o}><Icon name="check" />{o}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Voor wie"
            title="Werk jij hard, maar raakt de rek eruit?"
            sub="Ik werk met hoogopgeleide vrouwen met jonge kinderen die een verantwoordelijke functie hebben — of een eigen onderneming runnen. Veel van hen functioneren lang op hoog niveau, tot ze merken dat het te veel wordt." />
          <div className="ewk-forwho">
            <div className="ewk-forwho__col ewk-forwho__col--sym">
              <h4>Herken je je hierin?</h4>
              <ul>
                {OA_PATROON.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--sym"><Icon name="dot" /></span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="ewk-forwho__col ewk-forwho__col--ben">
              <h4>Dit gaan we samen bereiken</h4>
              <ul>
                {OA_HELP.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Client testimonials */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat klanten zeggen" title="Verhalen van vrouwen die je voorgingen" />
          <div className="ewk-testgrid">
            {OA_TESTIMONIALS.map((t, i) => (
              <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{[0,1,2,3,4].map((k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="ewk-avatar">{t.name[0]}</span>
                  <span><b>{t.name}</b><br />{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="ewk-list-note" style={{ marginTop: 40 }}>
            “Ik ben blijer, energieker en meer gefocust — en dat straalt direct door naar mijn gezin. WIN-WIN-WIN!”
          </p>
        </div>
      </section>

      {/* Recognition + scan CTA */}
      <section className="ewk-finalcta ewk-finalcta--scan">
        <div className="ewk-wrap ewk-finalcta__inner">
          <Eyebrow>Misschien herken je jezelf hierin</Eyebrow>
          <h2 className="ewk-h2">Uitputting verdwijnt zelden vanzelf</h2>
          <p>
            Veel vrouwen wachten te lang. “Het gaat vanzelf wel weer over”, “ik moet gewoon even
            doorzetten.” Maar het begint met het herkennen van de signalen. Daarom maakte ik een scan
            met signalen die vaak voorafgaan aan overbelasting of een burn-out.
          </p>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" icon="clipboard-list" onClick={onScan}>Download de Stress & Energiescan</Button>
            <Button variant="outline" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Plan een kennismaking</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===================== AANBOD ===================== */
function AanbodPage({ onScan, onEbook, onNav }) {
  const goScan = onScan || onEbook;
  return (
    <main>
      <PageHeader eyebrow="Aanbod"
        title="Zo werken we samen aan jouw <em>werkgeluk</em>"
        sub="Van een gratis eerste stap tot een compleet 1-op-1 traject. Kies waar je instapt — twijfel je? Dan denk ik graag met je mee." />

      <section className="ewk-section">
        <div className="ewk-wrap">
          <WerkLadder onScan={goScan} onNav={onNav} />
        </div>
      </section>
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Hoe het werkt" title="Van eerste contact tot blijvende verandering" />
          <div className="ewk-steps">
            {[
              ["Kennismaken", "Een vrijblijvend gesprek waarin we kijken of het klikt en wat je nodig hebt."],
              ["Jouw plan", "We brengen je situatie in kaart en stellen samen een aanpak op die bij jóu past."],
              ["Aan de slag", "Sessies, praktische opdrachten en app-contact — in jouw tempo."],
              ["Blijvend resultaat", "Je houdt de tools in handen om zelf grip te houden, ook daarna."],
            ].map(([t, d], i) => (
              <div className="ewk-step" key={t}>
                <span className="ewk-step__num">{i + 1}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList />
        </div>
      </section>
      <FinalCTA onNav={onNav} onScan={goScan} />
    </main>
  );
}

/* ===================== ERVARINGEN ===================== */
function ErvaringenPage({ onScan, onNav, onPlay }) {
  return (
    <main>
      <PageHeader eyebrow="Ervaringen"
        title="Van overleven naar weer <em>genieten</em>"
        sub="De mooiste graadmeter zijn de verhalen van moeders die je voorgingen. Lees hoe zij hun rust, energie en plezier terugvonden." />
      <section className="ewk-section">
        <div className="ewk-wrap">
          <div className="ewk-testgrid">
            {TESTIMONIALS.map((t, i) => (
              <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{Array.from({length: t.rating}).map((_, k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="ewk-avatar">{t.name[0]}</span>
                  <span><b>{t.name}</b><br />{t.role}</span>
                </figcaption>
              </figure>
            ))}
            <div className="ewk-testcard ewk-testcard--video" onClick={onPlay}>
              <span className="ewk-play__dot ewk-play__dot--big"><Icon name="play" /></span>
              <p>Bekijk het verhaal van Agathe</p>
              <span className="ewk-testcard__sub">Video · 2 min</span>
            </div>
          </div>
        </div>
      </section>
      <Mission />
      <ScanCTA onScan={onScan} />
      <FinalCTA onNav={onNav} onScan={onScan} />
    </main>
  );
}

/* ===================== BLOG ===================== */
function BlogPage({ onNav, onScan }) {
  const [cat, setCat] = useStP("Alles");
  const cats = ["Alles", ...Array.from(new Set(POSTS.map((p) => p.cat)))];
  const list = cat === "Alles" ? POSTS : POSTS.filter((p) => p.cat === cat);
  return (
    <main>
      <PageHeader eyebrow="Blog"
        title="Praktische inzichten voor <em>meer rust</em>"
        sub="No-nonsense artikelen over werkdruk, energie, grenzen en genieten — om te lezen, te herkennen en mee aan de slag te gaan." />
      <section className="ewk-section">
        <div className="ewk-wrap">
          <div className="ewk-filters">
            {cats.map((c) => (
              <button key={c} className={"ewk-filter" + (c === cat ? " is-active" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="ewk-cards">
            {list.map((p) => <PostCard key={p.title} p={p} onNav={onNav} />)}
          </div>
        </div>
      </section>
      <FinalCTA onNav={onNav} onScan={onScan} />
    </main>
  );
}

/* ===================== CONTACT ===================== */
function ContactPage({ onNav }) {
  const [sent, setSent] = useStP(false);
  const [form, setForm] = useStP({ naam: "", email: "", bericht: "", onderwerp: "Stress & Energiescan" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  function submit(e) { e.preventDefault(); if (!form.email || !form.naam) return; setSent(true); }
  return (
    <main>
      <PageHeader eyebrow="Contact"
        title="Laten we <em>kennismaken</em>"
        sub="Heb je een vraag, of wil je een vrijblijvende kennismaking plannen? Stuur me een bericht — ik reageer meestal binnen twee werkdagen." />
      <section className="ewk-section">
        <div className="ewk-wrap ewk-contact">
          <div className="ewk-contact__form">
            {!sent ? (
              <form onSubmit={submit}>
                <div className="ewk-field">
                  <label>Je naam</label>
                  <input className="ewk-input" placeholder="Sanne de Vries" value={form.naam} onChange={set("naam")} required />
                </div>
                <div className="ewk-field">
                  <label>E-mailadres</label>
                  <input className="ewk-input" type="email" placeholder="jij@voorbeeld.nl" value={form.email} onChange={set("email")} required />
                </div>
                <div className="ewk-field">
                  <label>Waar gaat het over?</label>
                  <select className="ewk-input" value={form.onderwerp} onChange={set("onderwerp")}>
                    <option>Stress &amp; Energiescan</option>
                    <option>1-op-1 Deep Dive</option>
                    <option>Rust Ruimte Regie (traject)</option>
                    <option>Iets anders</option>
                  </select>
                </div>
                <div className="ewk-field">
                  <label>Je bericht</label>
                  <textarea className="ewk-input" rows="5" placeholder="Vertel me kort waar je tegenaan loopt.." value={form.bericht} onChange={set("bericht")} />
                </div>
                <Button variant="primary" size="lg" block type="submit" iconRight="arrow-right">Verstuur bericht</Button>
                <p style={{ fontSize: 12, color: "var(--ew-ink-400)", margin: "14px 0 0", textAlign: "center" }}>
                  Je gegevens gebruik ik alleen om te reageren op je bericht.
                </p>
              </form>
            ) : (
              <div className="ewk-success">
                <div className="ewk-success__ring"><Icon name="check" /></div>
                <h3>Dankjewel, {form.naam}!</h3>
                <p>Je bericht is verstuurd. Ik neem snel contact met je op via <b style={{ color: "var(--ew-pine-600)" }}>{form.email}</b>.</p>
                <Button variant="outline" onClick={() => onNav("Home")}>Terug naar home</Button>
              </div>
            )}
          </div>
          <aside className="ewk-contact__side">
            <div className="ewk-contact__card">
              <h4>Direct contact</h4>
              <ul>
                <li><Icon name="mail" /><a href="#" onClick={(e)=>e.preventDefault()}>agathe@expeditiewerkplezier.nl</a></li>
                <li><Icon name="map-pin" />Waddinxveen, Nederland</li>
                <li><Icon name="clock" />Reactie binnen 2 werkdagen</li>
              </ul>
              <div className="ewk-contact__social">
                <a href="#" onClick={(e)=>e.preventDefault()} title="LinkedIn"><Icon name="linkedin" /></a>
                <a href="#" onClick={(e)=>e.preventDefault()} title="Instagram"><Icon name="instagram" /></a>
                <a href="#" onClick={(e)=>e.preventDefault()} title="Facebook"><Icon name="facebook" /></a>
              </div>
            </div>
            <div className="ewk-contact__portrait">
              <Portrait size="100%" />
            </div>
          </aside>
        </div>
      </section>
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList />
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PageHeader, OverAgathe, AanbodPage, ErvaringenPage, BlogPage, ContactPage });
