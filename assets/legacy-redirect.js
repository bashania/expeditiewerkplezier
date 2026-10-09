(function () {
  var routes = {
    home: "index.html",
    "over-agathe": "over-agathe.html",
    aanbod: "aanbod.html",
    ervaringen: "ervaringen.html",
    contact: "contact.html",
    traject: "traject.html",
    "deep-dive": "deep-dive.html",
    scan: "gratis-scan.html",
    "gratis-scan": "gratis-scan.html",
    "bedankt-scan": "bedankt-scan.html",
    privacy: "privacy.html",
    cookies: "cookies.html",
    voorwaarden: "voorwaarden.html",
    sitemap: "sitemap.html"
  };
  var route = window.location.hash.slice(1).toLowerCase();
  var file = Object.prototype.hasOwnProperty.call(routes, route) ? routes[route] : "index.html";
  window.location.replace(file + window.location.search);
})();
