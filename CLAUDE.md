# CLAUDE.md — werkafspraken voor deze repo

Statische multi-page site (zie `README-deploy.md`). Elke pagina is een eigen
HTML-bestand in de repo-root en deelt één bundel `app.bundle.js`. Geen build-stap.

## Tracking-script: ALTIJD op elke pagina

Op **elke publieke HTML-pagina** moet het externe tracking-script staan, vlak
vóór de afsluitende `</body>`-tag:

```html
<!-- Externe tracking -->
<script src="https://link.agathehania.nl/js/external-tracking.js" data-tracking-id="tk_a5ec1a710f0349d4ac299a98b8b31b94"></script>
```

**Regels:**

- Voeg dit toe bij **elke nieuwe pagina** die je aanmaakt.
- Controleer bij **elke wijziging** aan een bestaande pagina dat het er (nog) staat.
- Plaats het als laatste regel(s) vóór `</body>`, ná `app.bundle.js`.
- Precies **één** keer per pagina — niet dubbel.

**Geldt voor** alle content-pagina's + de 404:
`index.html`, `aanbod.html`, `bedankt-scan.html`, `contact.html`, `cookies.html`,
`deep-dive.html`, `ervaringen.html`, `gratis-scan.html`, `over-agathe.html`,
`privacy.html`, `traject.html`, `voorwaarden.html`, `404.html`.

**Bewust NIET op** (zou dubbeltellen / heeft geen zin):
- `Expeditie Werkplezier.html` — directe redirect naar `index.html`.
- `Mobiele preview.html` — dev-tool die `index.html` in een iframe toont.

**Snelle controle** dat alle pagina's het hebben (verwacht: `1` per content-pagina):

```bash
for f in *.html; do echo "$(grep -c external-tracking.js "$f")  $f"; done
```

> Let op (AVG/cookies): dit script laadt nu onvoorwaardelijk op elke pageview.
> Als de site cookie-consent moet respecteren, koppel het dan aan de bestaande
> consent-flow (`cookies.jsx`) i.p.v. het direct te laden.
