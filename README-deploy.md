# Expeditie Werkplezier — deployen op Netlify (via GitHub)

Deze site is een **statische multi-page website**. Elke pagina is een eigen
HTML-bestand en deelt één gecompileerde JavaScript-bundel. Er is **geen
build-stap** nodig: Netlify hoeft de bestanden alleen te serveren.

## Wat staat waar

| Bestand | Wat |
|---|---|
| `index.html` | Homepage |
| `over-agathe.html`, `aanbod.html`, `ervaringen.html`, `contact.html` | Hoofdpagina's |
| `traject.html`, `deep-dive.html`, `gratis-scan.html` | Aanbod-pagina's |
| `bedankt-scan.html` | Bedankpagina ná de scan (niet in de navigatie, `noindex`) |
| `privacy.html`, `cookies.html`, `voorwaarden.html` | Juridische pagina's |
| `404.html` | Vriendelijke "niet gevonden"-pagina |
| `app.bundle.js` | **Gegenereerde** JS-bundel met alle paginalogica |
| `styles.css`, `assets/` | Opmaak, lettertypes, logo's en foto's |
| `netlify.toml` | Netlify-config (publiceert de root, geen build) |
| `*.jsx` | **Broncode** van de bundel (zie "Wijzigingen") |

## Deployen

1. Zet deze map in een GitHub-repository (alles in de root laten staan).
2. Log in op [Netlify](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Kies de repository. Laat **Build command** leeg en zet **Publish directory** op `.` (staat al in `netlify.toml`).
4. **Deploy**. Klaar — je site is live. Koppel daarna je eigen domein onder **Domain settings**.

## Nog instellen vóór livegang

- **plug&pay-redirect**: stel in dat bezoekers ná het aanvragen van de gratis scan
  worden doorgestuurd naar `…/bedankt-scan.html`.
- **Contactformulier (FormSubmit)**: het eerste verzonden bericht activeert het
  formulier via een mail naar `agathe@agathehania.nl` — die link één keer aanklikken.

## Wijzigingen maken

De `.jsx`-bestanden zijn de **bron**; `app.bundle.js` wordt daaruit gegenereerd.
Pas je een `.jsx` aan, dan moet de bundel opnieuw gecompileerd worden (dat doet
Claude voor je). De losse HTML-pagina's hoef je daarbij niet aan te raken.
