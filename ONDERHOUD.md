# Onderhoud — 9 oktober 2026

De opruiming herstelt React/Lucide-iconen, contactformulierstatussen, mobiele breedtes, cookieconsent en oude fragmentroutes. Iconen zijn React-elementen, geen achteraf vervangen DOM. Het formulier blokkeert dubbele verzending tijdens de aanvraag en toont een toegankelijke succes- of foutmelding.

Tracking start pas na een nieuwe expliciete toestemming (versie 2). Functionele, verlopen of ongeldige keuzes starten geen tracking. Intrekken stopt de actieve tracker via een herlaadactie. De beleidsteksten beschrijven deze werking zonder onbevestigde garanties over anonimiseren of cookies van derden.

Netlify bouwt de JSX-bron automatisch en publiceert uitsluitend dist. React, ReactDOM en de gebruikte Lucide-iconen zitten in de production-bundel. De video heeft dezelfde duur, resolutie en inhoud, met een kleinere H.264/AAC-encoding en fast-start. Het origineel blijft beschikbaar in de Git-historie.

## Branchafhandeling

- `claude/peaceful-gates-oyd4pc`: al samengevoegd, mag weg.
- `claude/stress-energy-scan-checkout-n25quq`: wijziging via squash-merge van PR #8 verwerkt, mag weg.
- `claude/zen-einstein-my69tl`: PR #5 gesloten zonder merge; huidige checkout-links blijven behouden. Bewaard als `archive/2026-10-09/checkout-links`, commit `5574a40a18320a3d2c575f39b2aab2944aa6342d`.
- `claude/homepage-html-export-aw1142`: PR #6 gesloten zonder merge; export met placeholderlinks niet gepubliceerd. Bewaard als `archive/2026-10-09/homepage-export`, commit `68379274524cb9bce933c218a4359a9fbd618783`.

Archieftags bewaren alle oorspronkelijke commits voordat oude branches worden verwijderd. Ze starten geen actieve ontwikkelbranch en veranderen main niet.

## Validatie

De browsercontroles onderzoeken 14 publieke pagina's op 1440, 390 en 320 pixels, formuliersucces, server- en netwerkfouten zonder echte verzending, toestemming, intrekken en ongeldige voorkeuren, menu-iconen, reviewknoppen, focus/Escape van de video, legacy-redirects en een geneste 404. Het eerdere formulierprobleem werd eerst gereproduceerd met de ongewijzigde bundel. Alle 14 regressietests slagen lokaal; de automatische WCAG-controle op Home, Contact en Cookies meldt geen overtredingen. GitHub Actions voert dezelfde build- en browsercontroles bij iedere PR uit.

De daadwerkelijke website en externe checkout-, tracking- en maildiensten zijn vanuit de cloudomgeving beperkt bereikbaar. Netlify bevestigt de publicatie via zijn API; lokale tests gebruiken de volledige gebouwde website en gesimuleerde antwoorden voor tracking en mail. Externe beheerpunten staan in TODO.md.
