# Werkafspraken voor deze repository

Statische multi-page website. Elke publieke pagina is een HTML-bestand met een gedeelde React-bundel. De JSX-bestanden zijn de bron; bewerk app.bundle.js nooit handmatig. Bouw met `npm ci` en `npm run build`. Netlify publiceert uitsluitend `dist/` en bouwt bij iedere deploy opnieuw.

## Iconen

`Icon` rendert Lucide-SVG's via React. Roep geen `lucide.createIcons()` aan: dat vervangt door React beheerde DOM-elementen en veroorzaakt crashes bij updates. Gebruik een letterlijk benoemde icoonnaam, ook in contentarrays; de build neemt de gebruikte iconen op in de bundel.

## Tracking en toestemming

Elke publieke pagina, inclusief de 404 en sitemap, laadt precies één keer de lokale `assets/tracking.js` met `defer`, na de applicatiebundel. De 404 gebruikt rootrelatieve asset-URL's om ook op onbekende geneste paden te werken.

Plaats het externe tracking-script nooit rechtstreeks in HTML. De lokale loader laadt `link.agathehania.nl/js/external-tracking.js` uitsluitend na een actuele, expliciete keuze voor alle cookies. Functioneel-only, oude, verlopen of ongeldige keuzes geven geen toestemming. Intrekken herlaadt de pagina om het actieve script te stoppen. Eerdere externe cookies verdwijnen daarmee niet automatisch.

De legacy-redirect en Mobiele preview laden geen tracking. De preview is een ontwikkelbestand en wordt niet gepubliceerd.

## Controles

`npm run build` maakt de bundel en publicatiemap. `npm test` controleert de contactformulierafhandeling met gesimuleerde antwoorden, tracking en intrekken, mobiele breedtes, dynamische iconen, videodialoog en oude redirects. Installeer Chromium met `npx playwright install chromium`, of stel `CHROMIUM_PATH` in op een geïnstalleerde browser. Verstuur bij tests geen echte contactberichten.
