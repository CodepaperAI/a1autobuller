/**
 * PROGRAMMATIC SEO DATA LAYER
 * -----------------------------------------------------------------------------
 * One substantial landing page is generated for each core service at the
 * business's real Burnaby location. We deliberately avoid thin city-swapped
 * doorway pages; surrounding cities remain accurately described as service
 * areas in the LocalBusiness data.
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
    duration: "1–4 days",
    intro: (loc) =>
      `From parking-lot dings to major collision damage, A1 Buller Auto restores ${loc} vehicles to pre-accident condition with precision panel work and a lifetime workmanship warranty.`,
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
];

export const serviceFaqs = {
  "tesla-aluminum-repair": [
    {
      q: "Why does aluminum vehicle repair need dedicated equipment?",
      a: "Aluminum reacts differently from steel and can be contaminated by steel dust. Dedicated tools and a separated work area help technicians follow the correct joining, measuring, and corrosion-protection procedures.",
    },
    {
      q: "Can you inspect an EV safely after a collision?",
      a: "Yes. Collision inspection for an electric vehicle includes checking structural damage around high-voltage components and following model-specific safety procedures before repair work begins.",
    },
  ],
  "frame-racking": [
    {
      q: "How do you know whether a vehicle frame is straight?",
      a: "Computerized measuring compares structural reference points with the vehicle manufacturer's dimensions. The measurements guide correction and provide a post-repair check against specification.",
    },
    {
      q: "What are common signs of structural collision damage?",
      a: "Uneven panel gaps, doors that bind, an off-centre steering wheel, pulling, and unusual tire wear can indicate structural movement. Measuring is required to confirm it.",
    },
  ],
  "icbc-collision-repair": [
    {
      q: "What should I bring for an ICBC collision repair assessment?",
      a: "Bring your claim number, vehicle registration details, and any photos or information about the incident. The shop can then inspect the damage and explain the repair process.",
    },
    {
      q: "Can I choose the repair shop for my ICBC claim?",
      a: "Drivers can generally choose an eligible repair facility. Confirm the current claim requirements with ICBC and provide the shop with your claim information before repairs begin.",
    },
  ],
  "auto-body-repair": [
    {
      q: "Can dents and damaged panels always be repaired?",
      a: "Many dents and panels can be repaired, but replacement may be safer or more economical when metal is stretched, torn, heavily creased, or structurally compromised. An in-person inspection determines the correct approach.",
    },
    {
      q: "Do you provide an estimate before auto body work starts?",
      a: "Yes. The visible damage is documented first, then the shop explains the repair plan and estimate. Additional hidden damage may only become apparent after disassembly.",
    },
  ],
  "wheel-alignment": [
    {
      q: "What are the signs that a wheel alignment is needed?",
      a: "Common signs include pulling to one side, an off-centre steering wheel, uneven tire wear, or a recent impact with a pothole or curb.",
    },
    {
      q: "Should alignment be checked after collision repair?",
      a: "It is often appropriate when a collision affects wheels, suspension, steering, or structural mounting points. The inspection determines whether alignment measurements are needed.",
    },
  ],
  "ac-repair": [
    {
      q: "Why is my vehicle air conditioner blowing warm air?",
      a: "Possible causes include low refrigerant from a leak, compressor or electrical faults, a blocked component, or an airflow problem. Testing identifies the cause before recharge or repair.",
    },
    {
      q: "Is an A/C recharge enough to fix the problem?",
      a: "Not when refrigerant has escaped through a leak or another component has failed. A proper diagnosis helps prevent a temporary refill from becoming a repeat visit.",
    },
  ],
  "brake-repair": [
    {
      q: "What brake symptoms need prompt inspection?",
      a: "Grinding, squealing, vibration, a soft pedal, increased stopping distance, pulling, or a brake warning light should be inspected promptly.",
    },
    {
      q: "Does every brake service require new rotors?",
      a: "No. Rotor condition, thickness, runout, heat damage, and manufacturer specifications determine whether rotors can remain in service or need replacement.",
    },
  ],
  "tire-services": [
    {
      q: "Can every punctured tire be repaired?",
      a: "No. Repairability depends on puncture location and size, remaining tread, internal damage, and whether the tire was driven while flat. Sidewall damage generally cannot be safely repaired.",
    },
    {
      q: "Why does a vehicle still vibrate after basic balancing?",
      a: "Vibration can come from tire variation, wheel damage, mounting issues, suspension wear, or alignment. Road-force measurement can help identify problems that ordinary balancing may miss.",
    },
  ],
};

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
    title: `${service.name} in ${location.name}, BC | A1 Buller Auto`,
    metaDescription: `${service.name} at our ${area} auto repair facility. Clear estimates, documented repairs, and direct help from A1 Buller Auto Collision.`,
    heading: `${service.name} in ${location.name}, BC`,
    subheading: `Professional ${service.category.toLowerCase()} service at 7055 Buller Ave, with clear estimates and a documented repair process.`,
    canonical: `/services/${service.slug}/${location.slug}`,
  };
}
