# Expeditie Werkplezier – nog te doen

_Bijgewerkt: 13 juni 2026_

## 🚀 Klaar voor deploy (13 juni)
De site is omgezet naar een **statische multi-page website** voor GitHub + Netlify:
- Elke pagina is nu een eigen HTML-bestand (`index.html`, `over-agathe.html`, `aanbod.html`, `ervaringen.html`, `contact.html`, `traject.html`, `deep-dive.html`, `gratis-scan.html`, `bedankt-scan.html`, `privacy.html`, `cookies.html`, `voorwaarden.html`).
- Alle JSX is gecompileerd naar één gecachte `app.bundle.js` (geen trage in-browser Babel meer, geen console-warning).
- Toegevoegd: `404.html`, `netlify.toml`, `README-deploy.md`. De oude `Expeditie Werkplezier.html` stuurt door naar `index.html`.
- Eigen `<title>` en meta-description per pagina (SEO); de bedankpagina staat op `noindex`.
- ⚠️ De `.jsx`-bestanden blijven de bron; na een wijziging moet `app.bundle.js` opnieuw gecompileerd worden.

## ✅ Link-check (30 mei) – geen kapotte links
Alle navigatie, knoppen en CTA's werken. De plug&pay-, social- en mailto-links kloppen. Onderstaande punten wérken wel, maar verdienen nog aandacht qua inhoud.

## ✅ Gedaan
- **Social-links bijgewerkt** op alle 3 de plekken (header, footer, contactpagina)
  - LinkedIn → https://www.linkedin.com/in/agathe-hania-893577338/ (nieuw tabblad)
  - Instagram → https://www.instagram.com/agathehania/ (nieuw tabblad)
  - Mail-icoon → werkende `mailto:agathe@agathehania.nl`
  - Facebook & YouTube weggelaten (geen link aangeleverd)

## 🔜 Nog te doen / te beslissen

### Formulieren echt laten werken
- [x] **Gratis Stress- & Energiescan** – alle scan-knoppen openen weer de **salespagina**; daar leidt één CTA-kaart (geen los naam/e-mailformulier meer) door naar de externe opt-in/checkout op plug&pay (`expeditiewerkplezier.plugandpay.com`), waar e-mail & gegevens worden afgehandeld. Geldt voor alle scan-knoppen (header, footer, home, Over Agathe, Aanbod, Ervaringen, Blog, "Stap 1"-kaart).
- [x] **Deep Dive** – boekt al via plug&pay-checkout.
- [x] **Bedankpagina scan (OTO Deep Dive €97)** – gebouwd; bereikbaar via `#bedankt-scan` (niet in de navigatie). Met scan-bevestiging, video van Agathe, het €97-aanbod, reviews, FAQ en afsluiting.
- [x] **Contactformulier** – gekoppeld aan FormSubmit.co (AJAX). Berichten gaan naar agathe@agathehania.nl, met laad- en foutmelding en een bevestiging in de pagina.
  - ⚠️ **Eenmalig activeren**: bij het allereerste verstuurde bericht stuurt FormSubmit een activatiemail naar agathe@agathehania.nl. Klik die link één keer; daarna komen alle berichten binnen.

### Bedankpagina – nog te bevestigen
- [ ] **Redirect instellen op plug&pay**: na aanvraag/aankoop van de scan doorsturen naar `…/Expeditie Werkplezier.html#bedankt-scan`.
- [x] **€97-checkoutlink** ingesteld: knoppen op de bedankpagina gaan naar `…/checkout/1-op-1-deep-dive-oto`.

### E-mailadres & domein
- [x] **E-mailadres overal gelijkgetrokken** naar `agathe@agathehania.nl` (privacyverklaring en cookiebeleid gebruikten nog `agathe@expeditiewerkplezier.nl`).

### Social (later)
- [x] Facebook & YouTube: **niet gebruikt** (op verzoek; geen pagina/video gekoppeld).

### Inhoud & beeld
- [x] **Beeldmateriaal van Agathe verwerkt** – 9 foto's web-geoptimaliseerd (`assets/photos/`) en geplaatst: nieuw lachend hero-portret (+ "zacht"-variant via Tweaks), reflectief portret bij "Mijn verhaal", expeditie-beeldband (wereldkaart), wijzende foto bij "Ben jij dit?", laptop-foto bij "Hoe het werkt", café-beeldband op Ervaringen, focus-werkfoto op Traject. Homepage gebruikt nu twee verschillende portretten (hero + "Over mij").
  - Niet gebruikt: kledingrek-foto (9523), op verzoek.
- [x] **Echte reviews verwerkt** – 16 echte ervaringen op de Ervaringen-pagina (reviewmuur met inklapbare verhalen) + selecties op Home, Aanbod, Over Agathe, Deep Dive, Traject en Bedankt; met anonieme illustratieve portretten.
- [ ] Overige teksten finaliseren per pagina

### Footer & juridisch (uit link-check)
- [x] **Privacyverklaring & Cookiebeleid**: eigen pagina's gemaakt en gekoppeld in de footer; cookiebanner werkt (keuze wordt onthouden, opnieuw te openen via "Cookievoorkeuren").
- [x] **Algemene Voorwaarden**: eigen pagina gemaakt (`voorwaarden.jsx`, bereikbaar via `#voorwaarden`) in dezelfde stijl als privacy/cookies en gekoppeld in de footer. ⚠️ Startversie — nog juridisch laten nakijken.
- [x] **KVK- en BTW-nummer ingevuld** in de footer (KVK 57284946 · BTW NL001412727B96).

### Blog (uit link-check)
- [x] **Blog tijdelijk verwijderd** uit de navigatie (header, mobiel menu, footer). De `BlogPage`-route en data blijven in de code staan, dus opnieuw activeren is een kwestie van "Blog" terugzetten in de `NAV`-array in `core.jsx`.

### Opschonen (geen zichtbaar effect)
- [x] Ongebruikte "Download gratis ebook"-knoppen opgeruimd: de oude hero-varianten (`Hero`/`HeroQuote`/`HeroStatement`/`HeroSplit`) en het ongebruikte `EbookSplit`-blok zijn uit `sections.jsx` verwijderd. De live pagina's gebruiken hun eigen hero's; geen ebook-knoppen meer in de code.

> Voeg hier nieuwe punten toe wanneer ze opkomen.
