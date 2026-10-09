# Expeditie Werkplezier — bouwen en publiceren

Een statische multi-page website met React. De bron staat in de JSX-bestanden; alle pagina's gebruiken één production-bundel met React en de gebruikte iconen. Er zijn geen externe CDN-scripts meer nodig om de pagina's te renderen.

## Lokaal

Gebruik Node.js 22 of nieuwer:

```bash
npm ci
npm run build
npx playwright install chromium
npm test
```

Als Chromium al aanwezig is: `CHROMIUM_PATH=/pad/naar/chromium npm test`.
`node scripts/serve.cjs` serveert de gebouwde site op http://127.0.0.1:8765.

`npm run build` genereert app.bundle.js en `dist/`. Bewerk de JSX-bron en bouw opnieuw; commit ook de bundel. De vaste bronvolgorde staat in scripts/build.cjs. package-lock.json legt de dependencyversies vast.

## Netlify

Koppel de GitHub-repository aan Netlify. netlify.toml stelt de buildopdracht `npm run build` en publicatiemap `dist` in. Broncode, uploads, screenshots en ontwikkelbestanden worden niet gepubliceerd. Netlify serveert 404.html voor onbekende paden. De bundel wordt opnieuw gevalideerd in de browsercache zodat bezoekers na een deploy geen oude paginalogica gebruiken.

## Pagina's

- Hoofdmenu: index.html, over-agathe.html, aanbod.html, ervaringen.html, contact.html.
- Aanbod: traject.html, deep-dive.html, gratis-scan.html.
- Overig: bedankt-scan.html, privacy.html, cookies.html, voorwaarden.html.
- Sitemap: sitemap.html is een intern, publiek bereikbaar overzicht met noindex.
- Expeditie Werkplezier.html ondersteunt de oude fragmentroutes, waaronder #bedankt-scan, en behoudt queryparameters.

## Formulieren en cookies

De actuele scan-link is `https://checkout.agathehania.nl/gratis-stress-scan`. De externe aanbieder moet na inschrijving doorsturen naar `/bedankt-scan.html`. Controleer die instelling bij de aanbieder.

Contactberichten worden via FormSubmit naar agathe@agathehania.nl gestuurd. Daadwerkelijke mailbezorging en eventuele eenmalige activatie vereisen een controle door de eigenaar. De regressietests simuleren de API-antwoorden en verzenden geen e-mail.

assets/tracking.js laadt de externe tracker uitsluitend met toestemming. Cookiekeuze versie 2 is maximaal een jaar geldig; oude keuzes vragen opnieuw toestemming omdat de melding is bijgewerkt. Intrekken herlaadt de pagina om actieve tracking te stoppen. Zie cookies.html voor uitleg over eerder geplaatste cookies.

## Bewaarde voorstellen

Gesloten, niet samengevoegde voorstellen voor andere checkout-links en een losse homepage-export blijven beschikbaar via archieftags. Ze veranderen de huidige website niet. Zie ONDERHOUD.md voor de exacte referenties en controles.
