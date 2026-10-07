/**
 * First-party conversion event bridge.
 *
 * No analytics vendor is loaded today. These events are still pushed to the
 * conventional dataLayer so GA4 or another consent-aware analytics tool can be
 * connected later without revisiting every form and CTA.
 */
export function trackConversion(event, parameters = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
  window.dispatchEvent(
    new CustomEvent("a1buller:conversion", { detail: { event, ...parameters } })
  );
}

export function conversionHandler(event, parameters = {}) {
  return () => trackConversion(event, parameters);
}
