/**
 * PROGRAMMATIC SEO DATA LAYER
 * -----------------------------------------------------------------------------
 * The "Uplift AI" SEO engine multiplies SERVICES × LOCATIONS to generate a
 * fully unique local landing page for every combination, e.g.:
 *
 *   /services/tesla-aluminum-repair/burnaby
 *   /services/frame-racking/vancouver
 *   /services/icbc-collision-repair/new-westminster
 *
 * Each page receives custom <title>, meta description, H1 heading, and body
 * copy assembled from the dictionaries below. Keeping this in one module means
 * marketing can add a service or a neighborhood and instantly mint new pages.
 */

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------
export const services = [
  {
    slug: "tesla-aluminum-repair",
    name: "Tesla & Aluminum Repair",
    short: "Aluminum & EV structural repair",
    category: "Collision & Structural",
    // Keyword-rich, human-readable descriptors reused across generated copy.
    highlights: [
      "OEM-approved aluminum welding & riveting",
      "Dedicated clean aluminum repair bay",
      "EV high-voltage safe handling",
    ],
    priceFrom: "$450",
    duration: "2–5 days",
    // Templated copy generators (kept as functions so we can weave in location).
    intro: (loc) =>
      `Aluminum-bodied and electric vehicles demand isolated repair environments and OEM-specific tooling. Our ${loc} customers rely on A1 Buller Auto for structural aluminum work that meets factory specifications the first time.`,
  },
  {
    slug: "frame-racking",
    name: "Frame Racking & Straightening",
    short: "Computerized frame straightening",
    category: "Collision & Structural",
    highlights: [
      "Computerized laser measuring system",
      "Full unibody & full-frame pulling",
      "Pre- and post-repair measurement reports",
    ],
    priceFrom: "$600",
    duration: "3–6 days",
    intro: (loc) =>
      `A bent frame compromises safety long after the visible damage is fixed. Drivers across ${loc} bring their vehicles to A1 Buller Auto for computerized frame racking that restores factory dimensions to the millimeter.`,
  },
  {
    slug: "icbc-collision-repair",
    name: "ICBC Collision Repair",
    short: "ICBC-accredited collision repair",
    category: "Collision & Structural",
    highlights: [
      "ICBC Repair Network facility",
      "Direct claim support",
      "Documented repair process",
    ],
    priceFrom: "Free estimate",
    duration: "Confirmed after inspection",
    intro: (loc) =>
      `Drivers from ${loc} can bring their ICBC collision claim to our Burnaby repair facility. Our team documents the damage, explains the repair plan, and helps keep the claim and repair process moving clearly.`,
  },
  {
    slug: "auto-body-repair",
    name: "Auto Body Repair",
    short: "Collision & dent repair",
    category: "Collision & Structural",
    highlights: [
      "Dent, scratch & panel repair",
      "Insurance claim assistance",
      "Lifetime workmanship warranty",
    ],
    priceFrom: "$250",
    duration: "1–4 days",
    intro: (loc) =>
      `From parking-lot dings to major collision damage, A1 Buller Auto restores ${loc} vehicles to pre-accident condition with precision panel work and a lifetime workmanship warranty.`,
  },
  {
    slug: "auto-painting",
    name: "Auto Painting & Refinishing",
    short: "Color-matched refinishing",
    category: "Refinishing",
    highlights: [
      "Computerized color matching",
      "Downdraft spray booth finish",
      "Factory-grade clear coat",
    ],
    priceFrom: "$300",
    duration: "2–5 days",
    intro: (loc) =>
      `Our downdraft booth and computerized color matching deliver a factory-flawless finish. ${loc} drivers choose A1 Buller Auto when the paint has to be invisible against the original.`,
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment",
    short: "Precision 4-wheel alignment",
    category: "Mechanical",
    highlights: [
      "Laser 4-wheel alignment",
      "Camber, caster & toe correction",
      "Printed alignment report",
    ],
    priceFrom: "$89",
    duration: "1–2 hours",
    intro: (loc) =>
      `Uneven tire wear and a pulling steering wheel cost ${loc} drivers real money. Our laser four-wheel alignment brings camber, caster, and toe back to manufacturer spec.`,
  },
  {
    slug: "ac-repair",
    name: "A/C Repair & Recharge",
    short: "Air conditioning service",
    category: "Mechanical",
    highlights: [
      "Full A/C diagnostics",
      "Leak detection & repair",
      "Refrigerant recharge",
    ],
    priceFrom: "$120",
    duration: "1–3 hours",
    intro: (loc) =>
      `When the cabin won't cool, our technicians diagnose the whole system rather than just topping off refrigerant. ${loc} customers get a lasting A/C fix, not a temporary one.`,
  },
  {
    slug: "brake-repair",
    name: "Brake Repair",
    short: "Pads, rotors & brake service",
    category: "Mechanical",
    highlights: [
      "Pad & rotor replacement",
      "Brake fluid flush",
      "ABS diagnostics",
    ],
    priceFrom: "$150",
    duration: "2–4 hours",
    intro: (loc) =>
      `Braking is not the place to cut corners. A1 Buller Auto services brakes for ${loc} drivers with OEM-grade pads, rotors, and a full safety inspection on every job.`,
  },
  {
    slug: "tire-services",
    name: "Tire Services",
    short: "Mounting, balancing & sales",
    category: "Mechanical",
    highlights: [
      "New tire sales & fitting",
      "Road-force balancing",
      "Flat repair & rotation",
    ],
    priceFrom: "$25",
    duration: "30–90 minutes",
    intro: (loc) =>
      `From a single flat repair to a full set with road-force balancing, ${loc} drivers keep rolling with A1 Buller Auto's tire department.`,
  },
];

// ---------------------------------------------------------------------------
// METRO VANCOUVER SERVICE AREAS
// These are service areas, not additional shop locations. Every page clearly
// identifies the physical repair facility at 7055 Buller Ave in Burnaby.
// ---------------------------------------------------------------------------
export const locations = [
  { slug: "burnaby", name: "Burnaby", region: "BC" },
  { slug: "vancouver", name: "Vancouver", region: "BC" },
  { slug: "new-westminster", name: "New Westminster", region: "BC" },
  { slug: "richmond", name: "Richmond", region: "BC" },
  { slug: "coquitlam", name: "Coquitlam", region: "BC" },
];

// ---------------------------------------------------------------------------
// LOOKUP HELPERS
// ---------------------------------------------------------------------------
export const getService = (slug) => services.find((s) => s.slug === slug) || null;
export const getLocation = (slug) => locations.find((l) => l.slug === slug) || null;

// Every valid service × location combination, used by getStaticPaths.
export const getAllPaths = () =>
  services.flatMap((s) =>
    locations.map((l) => ({ params: { service: s.slug, location: l.slug } }))
  );

// ---------------------------------------------------------------------------
// DYNAMIC SEO METADATA GENERATORS
// These build the unique per-page title / meta / headings the crawler sees.
// ---------------------------------------------------------------------------
export function buildSeo(service, location) {
  const area = `${location.name}, ${location.region}`;
  return {
    title: `${service.name} for ${location.name}, BC | A1 Buller Auto Collision`,
    metaDescription: `${service.name} for drivers in ${area}, completed at our Burnaby collision repair facility. Request an estimate from A1 Buller Auto Collision.`,
    heading: `${service.name} for ${location.name} drivers`,
    subheading: `Professional ${service.category.toLowerCase()} at our Burnaby facility, serving drivers across ${area}.`,
    keywords: [
      `${service.name} ${location.name}`,
      `${service.short} ${location.region}`,
      `auto repair ${location.name}`,
      `collision repair ${location.name}`,
      `A1 Buller Auto Collision ${location.name}`,
    ],
    canonical: `/services/${service.slug}/${location.slug}`,
  };
}
