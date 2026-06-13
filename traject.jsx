/* Expeditie Werkplezier – 1-op-1 traject salespagina */

const TRJ_RECOG = [
"Je hebt een groot verantwoordelijkheidsgevoel en vindt het moeilijk om dingen los te laten.",
"Je legt de lat hoog voor jezelf, op je werk, thuis en in alles wat je doet.",
"Je bent gewend om door te gaan, ook als je eigenlijk al over je grens heen bent.",
"Je voelt je regelmatig opgejaagd, overprikkeld of moe.",
"Je slaapt minder diep, herstelt minder goed en hebt minder geduld dan je zou willen.",
"Je weet ergens wel dat het anders moet, maar het lukt niet om dat vast te houden in je dagelijks leven."];


const TRJ_KRIJG = [
"Een uitgebreide intake, zodat we helder in kaart brengen wat er speelt, waar je vastloopt en wat je nodig hebt.",
"Persoonlijke coachingsessies, volledig afgestemd op jouw situatie.",
"1-op-1 begeleiding op maat – geen standaardaanpak, maar passend bij jouw leven en persoonlijkheid.",
"Een duidelijk en uitgewerkt stappenplan, zodat je niet blijft hangen in losse inzichten.",
"De juiste stappen in de juiste volgorde, zodat je niet hoeft te gokken wat je wanneer doet.",
"Een concreet persoonlijk plan voor je dagelijkse leven, om rust, energie en balans vast te houden.",
"Handvatten om terugval te voorkomen, zodat je niet alleen herstelt maar duurzaam anders gaat leven."];


const TRJ_WERK = ["meer focus", "meer overzicht", "meer mentale scherpte", "beter prioriteren", "helderder nadenken", "efficiënter werken"];

const TRJ_STAPPEN = [
["Inzicht in jouw persoonlijkheid in relatie tot stress",
"Je hebt vast mooie eigenschappen zoals zorgzaamheid, perfectionisme en doorzettingsvermogen. Alleen: als je die altijd automatisch inzet, werken ze tegen je. Je ontdekt welke patronen jou gevoeliger maken voor stress en wat je écht nodig hebt. Want zelfkennis is de eerste stap naar meer regie."],
["Ontspanning, herstel & energie",
"Even bijkomen. Dat klinkt misschien te  simpel, maar is echt de basis van alles. Je leert hoe je ontspanning inbouwt zodat lichaam en hoofd kunnen herstellen. Met meer energie kun je helder denken en pas dan kun je bewuste keuzes maken."],
["Mindset",
"Soms weet je precies wat je wilt veranderen, maar lukt het toch niet. Dat komt vaak door overtuigingen die je onbewust tegenhouden. Je maakt ze zichtbaar en leert vanuit een positievere blik naar jezelf te kijken, zodat verandering beklijft."],
["Omgeving",
"Jij staat nu steviger. Maar de wereld om je heen verandert niet zomaar mee. Je ontdekt hoe je omgaat met veeleisende situaties en verwachtingen van anderen, zónder jezelf te verliezen, zelfs in drukke tijden."],
["Plan van aanpak",
"Alle inzichten en nieuwe gewoontes leg je vast in een persoonlijk plan. Concreet, overzichtelijk en gemaakt om op terug te vallen. Zo weet je altijd waar je naartoe werkt en val je niet terug in oude patronen."]];


const TRJ_FAQ = [
{ q: "Hoe weet ik of dit traject bij mij past?",
  a: "Daar is het kennismakingsgesprek voor. We kijken samen waar je nu staat, waar je in vastloopt en of dit traject past bij wat jij nodig hebt." },
{ q: "Ik functioneer nog wel. Is dit traject dan wel voor mij?",
  a: "Ja, juist ook dan. Veel vrouwen die bij mij komen, functioneren aan de buitenkant nog best goed, terwijl het van binnen steeds meer energie kost. Juist dan is het waardevol om op tijd in te grijpen." },
{ q: "Is dit traject ook geschikt als ik al in een burn-out zit?",
  a: "Ja. Het liefst begeleid ik je natuurlijk al vóórdat je echt uitvalt, maar dit traject helpt je om op tijd bij te sturen én om te herstellen als je al bent vastgelopen." },
{ q: "Ik heb al veel geprobeerd. Wat maakt dit anders?",
  a: "Je krijgt geen losse tips of standaardadviezen, maar een helder stappenplan in de juiste volgorde. Juist die structuur en de combinatie van wetenschap, praktijk en persoonlijke afstemming maakt het verschil." },
{ q: "Mijn werk blijft druk. Heeft het dan wel zin?",
  a: "Ja. Het doel is niet altijd dat je leven ineens minder druk wordt, maar dat jij er anders mee leert omgaan. Een eerdere cliënt verwoordde het mooi: de werkdruk was niet veranderd, maar zij kon er veel beter sturing aan geven en hield meer ruimte over voor haar privéleven." },
{ q: "Krijg ik vooral inzicht, of ook concrete handvatten?",
  a: "Allebei. Je begrijpt beter wat er met je gebeurt én je krijgt concrete stappen en een persoonlijk plan voor je dagelijks leven. Theorie en praktijk verbinden – dat is precies waar ik voor sta." },
{ q: "Kan ik dit combineren met een druk gezin en werk?",
  a: "Ja, juist daarvoor is het bedoeld. Het traject is afgestemd op vrouwen die werk en gezin combineren en behoefte hebben aan een haalbare, realistische aanpak." }];


function TrajectPage({ onNav, onPlay, portret }) {
  return (
    <main>
      {/* Hero */}
      <section className="ewk-hero ewk-hero--quote">
        <div className="ewk-wrap ewk-hero__grid">
          <div className="ewk-trj-herotext">
            <Eyebrow>Rust Ruimte Regie · 1-op-1 traject</Eyebrow>
            <h1 className="ewk-hero__quote">Voor ambitieuze moeders die verlangen naar rust, energie en grip</h1>
            <p className="ewk-hero__lead">
              Je bent gedreven, slim, betrokken en verantwoordelijk. En toch merk je dat het steeds
              meer energie kost om alles draaiende te houden. Je wilt het goed doen op je werk, er zijn
              voor je kinderen, een fijne partner zijn – en ergens tussendoor ook nog ruimte houden
              voor jezelf.
            </p>
            <div className="ewk-trj-signals">
              {["Je hoofd staat altijd aan.", "Je energie raakt langzaam op.", "Je verliest het overzicht.",
              "Je bent alleen nog aan het rennen en regelen.", "Echt tot rust komen lukt niet meer."].map((s) =>
              <span key={s}><Icon name="check" />{s}</span>
              )}
            </div>
            <p className="ewk-hero__lead ewk-trj-lead2" style={{ marginTop: 22 }}>
              Misschien functioneer je nog. Misschien ziet de buitenwereld niet eens hoeveel het van je
              vraagt. <span className="ewk-key">Maar jij voelt het wel. Zo wil je niet doorgaan.</span>
            </p>
            <div className="ewk-hero__cta">
              <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Vrijblijvend kennismaken</Button>
              <Button variant="ghost" iconRight="play" onClick={onPlay}>Bekijk mijn verhaal</Button>
            </div>
          </div>
          <Portrait play onPlay={onPlay} src={portret} />
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Herken je dit?" title="Misschien voelt het in de praktijk vaak anders" />
          <ul className="ewk-trj-recog">
            {TRJ_RECOG.map((r) =>
            <li key={r}><span className="ewk-ic ewk-ic--sym"><Icon name="check" /></span>{r}</li>
            )}
          </ul>
          <p className="ewk-list-note">Dan is dit traject er voor jou.</p>
        </div>
      </section>

      {/* Over het traject */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-prose" style={{ textAlign: "center", margin: "0 auto" }}>
          <Eyebrow>Het traject</Eyebrow>
          <h2 className="ewk-h2" style={{ margin: "12px auto 24px" }}>In 3 maanden stap voor stap naar rust, energie en grip</h2>
          <p>In het 1 op 1 traject werken we in drie maanden stap voor stap toe naar meer <span className="ewk-key">rust, ruimte en regie</span>. Het traject is speciaal voor gedreven, hoogopgeleide moeders zoals jij – met een verantwoordelijke baan of onderneming, die merken dat ze zichzelf onderweg zijn kwijtgeraakt. Je hebt een groot verantwoordelijkheidsgevoel, bent gewend om door te gaan en voelt dat het zo niet langer werkt.</p>
          <p>Maar verandering gaat niet zomaar. Het vraagt de bereidheid om eerlijk te kijken naar jouw patronen. <span className="ewk-key">Juist daar ligt vaak de sleutel naar echte, duurzame verandering.</span></p>
        </div>
      </section>

      {/* Dit krijg je */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Dit krijg je in het traject" title="Begeleiding op maat, met een helder plan" />
          <div className="ewk-krijg-card">
            <ul className="ewk-checks ewk-checks--2col">
              {TRJ_KRIJG.map((k) => <li key={k}><Icon name="check" />{k}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Wat het oplevert */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Wat dit traject jou oplevert"
          title="Weer rust in je hoofd en ruimte in je lijf"
          sub="Je leeft niet langer op de automatische piloot, maar krijgt weer grip op je energie, je grenzen en je dagelijks leven. Niet omdat je harder werkt maar omdat je niet meer continu in de overlevingsstand staat." />
          <div className="ewk-oplevert">
            <div className="ewk-oplevert__block">
              <h4><Icon name="briefcase" />Op je werk</h4>
              <ul className="ewk-checks ewk-checks--2col">
                {TRJ_WERK.map((w) => <li key={w}><Icon name="check" />{w}</li>)}
              </ul>
              <p>Daardoor kost werken je minder energie en houd je aan het einde van de dag meer over voor jezelf en voor thuis.</p>
            </div>
            <div className="ewk-oplevert__row">
              <div className="ewk-oplevert__block">
                <h4><Icon name="home" />Thuis</h4>
                <p>Meer geduld, meer aanwezigheid en meer verbinding met de mensen van wie je houdt. Minder kortaf, minder prikkelbaar en minder met je hoofd nog half op je werk.</p>
              </div>
              <div className="ewk-oplevert__block">
                <h4><Icon name="heart" />Voor jezelf</h4>
                <p>Je vindt jezelf weer terug. Je begrijpt waarom je vastliep en leert hoe je perfectionisme, altijd maar doorgaan,
verantwoordelijkheidsgevoel en andere patronen duurzaam doorbreekt. Je leert meer vertrouwen op jezelf en laat je minder leiden door anderen.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Ja, ik wil kennismaken</Button>
          </div>
        </div>
      </section>

      {/* Waarom het werkt */}
      <section className="ewk-section">
        <div className="ewk-wrap ewk-story">
          <div className="ewk-prose">
            <Eyebrow>Waarom dit traject werkt</Eyebrow>
            <h2 className="ewk-h2" style={{ margin: "12px 0 24px" }}>De juiste stappen in de juiste volgorde</h2>
            <p>Omdat jij geen losse tips nodig hebt, maar de juiste stappen in de juiste volgorde. Als je hoofd overvol is en je lichaam al te lang in de overlevingsstand staat, kun je vaak best bedenken wat je anders zou moeten doen maar lukt het niet om het vol te houden.



            </p>
            <p>
              Daarom beginnen we niet bij nóg harder proberen, maar bij rust, herstel en ruimte in je
              systeem. Van daaruit kijken we stap voor stap naar de patronen, overtuigingen en
              omgevingsfactoren die jou uit balans hebben gebracht. Geen standaardaanpak, maar een helder
              en persoonlijk stappenplan.
            </p>
            <p>
              Juist de combinatie van mijn wetenschappelijke achtergrond, praktijkervaring en
              ervaringsdeskundigheid maakt het verschil. Ik help je niet alleen begrijpen wát er met je
              gebeurt, maar ook hóe je daar – op een manier die bij jou past – duurzaam uitkomt.
            </p>
          </div>
          <figure className="ewk-photofig ewk-story__media">
            <img src="assets/photos/work-9331.jpg" alt="Agathe geconcentreerd aan het werk" loading="lazy" />
            <figcaption>Geen standaardaanpak, maar de juiste stappen in de juiste volgorde.</figcaption>
          </figure>
        </div>
      </section>

      {/* 5 stappen + prijs */}
      <section className="ewk-section ewk-section--sand">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Dit is wat we gaan doen" title="Het traject in 5 stappen" />
          <div className="ewk-tsteps">
            {TRJ_STAPPEN.map(([t, d], i) => <div className="ewk-tstep" key={t}>
                <div className="ewk-tstep__num">{i + 1}</div>
                <div className="ewk-tstep__body">
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            )}
          </div>
          <div className="ewk-pricebox">
            <div>
              <span className="ewk-offer__kicker">Jouw investering</span>
              <div className="ewk-pricebox__price">€ 1.997<span>incl. btw</span></div>
              <div className="ewk-pricebox__meta">
                <span><Icon name="clock" />Duur: 3 maanden</span>
                <span><Icon name="messages-square" />Intake + persoonlijke sessies</span>
                <span><Icon name="file-check" />Concreet plan van aanpak</span>
              </div>
            </div>
            <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Ja, dit wil ik</Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Ervaringen" title="Wat eerdere cliënten ervoeren" />
          <div className="ewk-testgrid">
            {TRAJECT_REVIEWS.map((t, i) =>
            <figure className="ewk-testcard" key={i}>
                <div className="ewk-stars">{[0, 1, 2, 3, 4].map((k) => <Icon key={k} name="star" />)}</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <ReviewAvatar r={t} />
                  <span><b>{t.name}</b><br />{t.role}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Kennismaken */}
      <section className="ewk-finalcta">
        <div className="ewk-wrap ewk-finalcta__inner">
          <Eyebrow>Kennismaken?</Eyebrow>
          <h2 className="ewk-h2">Denk je: “Dit gaat over mij” maar ook: “help, wat komt er op me af?”</h2>
          <p>
            Wees gerust. Je hoeft het niet alleen uit te zoeken. Verlang je naar meer rust, energie en
            grip en voel je dat het tijd is om het écht anders te doen? Dan ben je welkom voor een
            kennismakingsgesprek, zodat jij helder kunt voelen of dit de juiste volgende stap is.
          </p>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Ja, ik wil kennismaken</Button>
          </div>
        </div>
      </section>

      {/* Voor wie wel / niet */}
      <section className="ewk-section">
        <div className="ewk-wrap">
          <SectionHead eyebrow="Voor wie" title="Is dit traject iets voor jou?" />
          <div className="ewk-forwho">
            <div className="ewk-forwho__col ewk-forwho__col--ben">
              <h4>Dit traject is voor jou als…</h4>
              <ul>
                <li><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>je een sterke, hoogopgeleide moeder bent met een verantwoordelijke baan of onderneming.</li>
                <li><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>je het goed wilt doen op je werk én thuis, met een groot verantwoordelijkheidsgevoel.</li>
                <li><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>je hoofd altijd aanstaat, je energie opraakt en je verlangt naar rust, overzicht en grip.</li>
                <li><span className="ewk-ic ewk-ic--ben"><Icon name="check" /></span>je bereid bent eerlijk naar je eigen patronen te kijken.</li>
              </ul>
            </div>
            <div className="ewk-forwho__col ewk-forwho__col--niet">
              <h4>Dit traject is niet voor jou als…</h4>
              <ul>
                <li><span className="ewk-ic ewk-ic--niet"><Icon name="x" /></span>je alleen op zoek bent naar een snelle tip of oppervlakkige quick fix.</li>
                <li><span className="ewk-ic ewk-ic--niet"><Icon name="x" /></span>je een standaard lijstje verwacht dat voor iedereen werkt.</li>
                <li><span className="ewk-ic ewk-ic--niet"><Icon name="x" /></span>je nog volledig in ontkenning zit en geen verantwoordelijkheid wilt nemen voor je eigen proces.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ewk-section ewk-section--wash">
        <div className="ewk-wrap ewk-faqwrap">
          <SectionHead eyebrow="Veelgestelde vragen" title="Misschien vraag je je af.." />
          <FaqList items={TRJ_FAQ} />
        </div>
      </section>

      {/* Slot-CTA */}
      <section className="ewk-finalcta">
        <div className="ewk-wrap ewk-finalcta__inner">
          <Eyebrow>Klaar voor de volgende stap?</Eyebrow>
          <h2 className="ewk-h2">Begin met meer rust, ruimte en regie, het start met één gesprek</h2>
          <p>
            Geen verplichtingen, gewoon even kennismaken. We kijken samen waar jij nu staat en of dit
            traject past bij wat jij nodig hebt.
          </p>
          <div className="ewk-hero__cta is-center">
            <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav("Contact")}>Plan een kennismaking</Button>
          </div>
        </div>
      </section>
    </main>);

}

Object.assign(window, { TrajectPage });