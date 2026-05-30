/* Expeditie Werkplezier — 1-op-1 Deep Dive salespagina (€147) */

const DD_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive";

const DD_GAINS = [
  ["lightbulb", "sky", "Helderheid in 60 minuten",
    "Je ziet wat er bij jou speelt — niet in losse stukjes, maar als één geheel."],
  ["repeat", "rose", "Doorbraak van patronen",
    "Je ontdekt welk onbewust patroon jou hier heeft gebracht en waarom je blijft doorgaan terwijl het te veel is."],
  ["target", "gold", "Eén concrete focus",
    "Je weet precies waar je mee begint, in plaats van alles tegelijk te willen oplossen."],
  ["clipboard-list", "sage", "Een persoonlijk plan",
    "Afgestemd op jouw situatie, jouw leven en wat voor jou werkt."],
  ["wind", "sky", "Rust in je hoofd",
    "Vaak al direct na de sessie voelbaar."],
];

const DD_PAIN = [
  "steeds maar door te gaan terwijl je voelt dat het eigenlijk te veel is",
  "van alles te proberen, maar niet echt verschil te merken",
  "een vol hoofd te hebben dat maar blijft doorgaan",
  "te twijfelen wat nu écht de juiste stap is",
  "alles tegelijk te willen oplossen en daardoor vast te blijven zitten",
  "de dag moe af te sluiten, zonder het gevoel dat je echt verder komt",
];

const DD_GAIN = [
  "je weer overzicht voelt in je hoofd, in plaats van chaos",
  "je precies weet waar je moet beginnen, zonder te blijven twijfelen",
  "je niet meer alles tegelijk hoeft op te lossen, maar stap voor stap vooruitgaat",
  "je meer rust ervaart in je lichaam, ook op drukke dagen",
  "je weer met aandacht aanwezig bent thuis, zonder dat je hoofd ergens anders zit",
  "je de dag afsluit met het gevoel dat het genoeg is geweest",
];

const DD_VOORWIE = [
  "een drukke vrouw bent met een verantwoordelijke rol en veel op je bord",
  "snel schakelt, vooruitdenkt en verantwoordelijkheid pakt — op je werk én thuis",
  "blijft doorgaan terwijl je voelt dat het eigenlijk te veel is",
  "de lat hoog legt, ook als je allang over je grens zit",
  "thuis bent, maar je werk niet los kunt laten",
  "blijft zoeken naar hoe het anders moet, maar geen grip krijgt",
];

const DD_REVIEWS = [
  { name: "K.M.", role: "Senior Sales- & Business Development Manager", rating: 5,
    quote: "Ik bleef maar rondjes draaien in mijn hoofd en zag zelf niet meer wat er echt speelde. In dit gesprek werd het ineens helder en wist ik precies waar ik moest beginnen." },
  { name: "Sema", role: "Communicatieadviseur", rating: 5,
    quote: "Het voelde alsof iemand precies zag wat ik zelf al zo lang probeerde te begrijpen. Dat gaf zoveel rust en richting." },
  { name: "Shalini Siwpersad", role: "Adviseur/manager projectbeheersing", rating: 5,
    quote: "Mijn hoofd zat zó vol en ik probeerde alles tegelijk op te lossen. Na deze sessie had ik eindelijk overzicht en een plan dat bij mij past." },
];

const DD_FAQ = [
  { q: "Wat levert één sessie me op?",
    a: "Helderheid, richting en een concreet plan waar je direct mee verder kunt. De meeste vrouwen gaan naar huis met een inzicht dat alles op z'n plek laat vallen. Vaak ervaar je al tijdens de sessie meer rust in je hoofd." },
  { q: "Moet ik alles al goed kunnen uitleggen?",
    a: "Nee. Kom zoals je bent. Je hoeft je situatie niet perfect te verwoorden — dat is precies waar ik je bij help. We zoeken het samen uit." },
  { q: "Is één sessie genoeg?",
    a: "Veel vrouwen ervaren na één sessie een duidelijk inzicht en weten welke eerste stap ze kunnen zetten. Verandering vasthouden is iets anders. Als je merkt dat je daarin begeleiding wilt, bespreken we dat aan het einde van de sessie." },
  { q: "Hoe plan ik een sessie?",
    a: "Via de knop boek je de 1-op-1 sessie. Na boeking ontvang je direct een uitnodiging om een moment te kiezen dat jou uitkomt. De beschikbare dagen zijn maandag t/m vrijdag tussen 13.00 en 17.00 uur." },
  { q: "Wat als ik het spannend vind om mijn verhaal te delen?",
    a: "Dat is heel normaal. De sessie is volledig vertrouwelijk en afgestemd op jou. Er is geen goed of fout antwoord. Veel vrouwen merken dat het al opluchting geeft om hun verhaal hardop te zeggen." },
  { q: "Hoe snel kan ik terecht?",
    a: "Na je boeking ontvang je direct een bevestiging en een link om een moment te kiezen. Meestal kun je binnen een week terecht." },
  { q: "Wat als ik twijfel of dit iets voor mij is?",
    a: "Dan is dat juist een teken dat je er klaar voor bent. Twijfel betekent dat je voelt dat er iets moet veranderen, maar nog niet weet hoe. Dat is precies waar we in de sessie mee beginnen." },
];

function DeepDivePage({ onNav, onPlay }) {
  return (
    <main>
      {/* Hero */}
      <section className="ewk-hero ewk-hero--quote">
        <div className="ewk-wrap ewk-hero__grid">
          <div>
            <Eyebrow>1-op-1 Deep Dive</Eyebrow>
            <h1 className="ewk-hero__quote">In 60 minuten meer rust door <em>helderheid en richting</em></h1>
            <p className="ewk-hero__lead">
              Voor werkende moeders die zich weer ontspannen en energiek willen voelen. Met deze Deep
              Dive weet jij binnen een uur wat jouw ineffectieve patronen zijn — en heb je een
              <span className="ewk-key"> persoonlijk plan</span> om mee aan de slag te gaan.
            </p>
            <div className="ewk-hero__cta">
              <Button variant="primary" size="lg" iconRight="arrow-right" href={DD_CHECKOUT}>Boek een Deep Dive sessie</Button>
              <Button variant="ghost" iconRight="play" onClick={onPlay}>Bekijk mijn verhaal</Button>
            </div>
            <p className="ewk-dd-meta"><Icon name="user" />1-op-1 &nbsp;·&nbsp; <Icon name="clock" />60–90 minuten &nbsp;·&nbsp; <Icon name="sparkles" />volledig afgestemd op jou</p>
          </div>
          <Portrait play onPlay={onPlay} />
        </div>
      </section>

      {/* Herkenbaar */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-prose" style={{ margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>Misschien herken je dit</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px 0 24px" }}>Je weet dat er iets moet veranderen. Maar wat precies — en waar begin je?</h2>
          <p>
            Veel vrouwen herkennen zichzelf volledig in de signalen en zien precies waar het schuurt. Ze
            voelen dat het zo niet langer kan, maar het lukt ze niet om iets aan de situatie te
            veranderen.
          </p>
          <p>
            Niet omdat ze de vaardigheden niet hebben, maar omdat ze niet goed weten waar ze moeten
            beginnen. Ze blijven nadenken en twijfelen, of proberen van alles tegelijk — waardoor het
            overzicht juist weer verdwijnt. <span className="ewk-key">Als je eerlijk bent, herken je dat
            misschien ook wel.</span>
          </p>
        </div>
      </section>

      {/* Wat het oplevert */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat deze sessie je oplevert"
            title="In één sessie van stilstand naar een concrete eerste stap"
            sub="We kijken samen naar jouw situatie — niet in losse stukjes, maar als geheel. We maken scherp wat er onder je klachten zit en wat jou nu het meest helpt." />
          <div className="ewk-gains">
            {DD_GAINS.map(([ic, accent, t, d]) => (
              <div className={"ewk-gain ewk-offer--" + accent} key={t}>
                <span className={"ewk-offer__ic ewk-offer__ic--" + accent}><Icon name={ic} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain / Gain */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Ben je het zat?" title="Van blijven doorgaan naar weer ruimte voelen" />
          <div className="ewk-forwho">
            <div className="ewk-forwho__col ewk-forwho__col--niet">
              <h4>Ben je het zat om…</h4>
              <ul>
                {DD_PAIN.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--niet"><Icon name="x" /></span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="ewk-forwho__col ewk-forwho__col--ben">
              <h4>Stel je eens voor dat…</h4>
              <ul>
                {DD_GAIN.map((p) => (
                  <li key={p}><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="ewk-list-note">Je hoeft het niet alleen uit te zoeken.</p>
        </div>
      </section>

      {/* Voor wie */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Voor wie is dit?" title="Deze sessie is voor jou als je…" />
          <ul className="ewk-trj-recog">
            {DD_VOORWIE.map((r) => (
              <li key={r}><span className="ewk-ic ewk-ic--sym"><Icon name="check" /></span>{r}</li>
            ))}
          </ul>
          <p className="ewk-list-note">En ergens weet je: zo wil je je niet blijven voelen.</p>
        </div>
      </section>

      {/* Even voorstellen */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-about">
          <div className="ewk-about__photo"><Portrait size="100%" /></div>
          <div className="ewk-about__text">
            <Eyebrow>Even voorstellen</Eyebrow>
            <h2 className="ewk-h2">Ik ben Agathe, arbeids- en organisatiepsycholoog</h2>
            <p>
              Al meer dan 10 jaar help ik drukke vrouwen die vastlopen in de combinatie van werk en
              gezin. Ik heb zelf ook ervaren hoe het is om jezelf daarin kwijt te raken.
            </p>
            <p>
              En wat ik elke dag zie: het gaat niet om harder je best doen. Het gaat om begrijpen wat er
              in je systeem gebeurt. <span className="ewk-key">Dat inzicht is de eerste stap naar rust,
              overzicht en energie</span> — en daar helpt deze sessie bij.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat andere vrouwen zeggen" title="Eén gesprek, dat alles op z'n plek laat vallen" />
          <div className="ewk-testgrid">
            {DD_REVIEWS.map((t, i) => (
              <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{Array.from({ length: t.rating }).map((_, k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="ewk-avatar">{t.name[0]}</span>
                  <span><b>{t.name}</b><br />{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <div className="ewk-pricebox">
            <div>
              <span className="ewk-offer__kicker">Jouw investering</span>
              <div className="ewk-pricebox__price">€ 147<span>incl. btw</span></div>
              <div className="ewk-pricebox__meta">
                <span><Icon name="clock" />Eén sessie van 60 minuten</span>
                <span><Icon name="video" />Online, op een moment dat jou uitkomt</span>
                <span><Icon name="file-check" />Persoonlijk plan om mee verder te gaan</span>
              </div>
            </div>
            <Button variant="primary" size="lg" iconRight="arrow-right" href={DD_CHECKOUT}>Ja, ik boek een sessie</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList items={DD_FAQ} />
        </div>
      </section>

      {/* Afsluiting */}
      <section className="ewk-finalcta">
        <div className="ewk-wrap ewk-finalcta__inner">
          <Eyebrow>Tot slot</Eyebrow>
          <h2 className="ewk-h2">Voel je dat dit over jou gaat?</h2>
          <p>Dan is dit misschien precies wat je nu nodig hebt. Je hoeft het niet alleen uit te zoeken.</p>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" iconRight="arrow-right" href={DD_CHECKOUT}>Plan je Deep Dive sessie</Button>
            <Button variant="outline" size="lg" onClick={() => onNav("Contact")}>Eerst een vraag stellen</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { DeepDivePage });
