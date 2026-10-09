/* Tracking is optional. Never request the provider before explicit consent. */
(function () {
  var scriptId = "ewk-external-tracking";
  function applyConsent(consent) {
    var existing = document.getElementById(scriptId);
    if (!consent || consent.version !== 2 || typeof consent.ts !== "number" ||
        Date.now() - consent.ts >= 365 * 24 * 60 * 60 * 1000 || consent.analytics !== true) {
      // Reload after withdrawal so the provider's existing event listeners stop.
      // This cannot undo data already sent or delete third-party cookies.
      if (existing) window.location.reload();
      return;
    }
    if (existing) return;
    var script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://link.agathehania.nl/js/external-tracking.js";
    script.dataset.trackingId = "tk_a5ec1a710f0349d4ac299a98b8b31b94";
    script.async = true;
    script.addEventListener("error", function () { script.remove(); });
    document.body.appendChild(script);
  }
  window.addEventListener("ewk:consent", function (event) { applyConsent(event.detail); });
  window.addEventListener("storage", function (event) {
    if (event.key === "ewk-cookie-consent" || event.key === null) {
      try { applyConsent(JSON.parse(localStorage.getItem("ewk-cookie-consent"))); }
      catch (_) { applyConsent(null); }
    }
  });
  try { applyConsent(JSON.parse(localStorage.getItem("ewk-cookie-consent"))); }
  catch (_) { applyConsent(null); }
})();
