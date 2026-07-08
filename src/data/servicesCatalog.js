/**
 * servicesCatalog.js
 * -----------------------------------------------------------------------------
 * Single source of truth for the customer-facing service catalog and the
 * booking scheduler's time options.
 *
 * `SERVICE_CATALOG` — the exact 10 core auto service categories (with their
 * sub-items) rendered on /services. Each entry also carries light presentation
 * metadata (icon key, priceFrom, duration) used by the catalog cards.
 *
 * `TIME_SLOTS` — strict 30-minute interval blocks from 9:00 AM to 4:30 PM,
 * generated programmatically so the range can never drift out of sync.
 *
 * Keeping this separate from the programmatic-SEO data in `seo.js` means the
 * marketing/pSEO engine and the transactional catalog can evolve independently.
 */

/** The 10 core service categories, in the exact order specified. */
export const SERVICE_CATALOG = [
  {
    id: "oil-fluid-maintenance",
    name: "Oil, Filter & Fluid Maintenance",
    icon: "droplet",
    priceFrom: 49,
    duration: "30–45 min",
    tagline: "Keep everything lubricated, cool, and running clean.",
    items: [
      "Conventional oil change",
      "Semi-synthetic oil change",
      "Full synthetic oil change",
      "Fluid flushes (coolant, transmission, brake)",
    ],
  },
  {
    id: "brake-system",
    name: "Brake System Services",
    icon: "disc",
    priceFrom: 89,
    duration: "1–2 hrs",
    tagline: "Confident, quiet stopping power you can trust.",
    items: [
      "Brake pad replacement",
      "Rotor resurfacing & replacement",
      "Caliper inspection",
      "Brake line bleeding",
    ],
  },
  {
    id: "tire-wheel",
    name: "Tire & Wheel Services",
    icon: "tire",
    priceFrom: 25,
    duration: "30–60 min",
    tagline: "Even wear, straight tracking, and a smooth ride.",
    items: [
      "Tire rotation",
      "Wheel balancing",
      "Wheel alignments",
      "Puncture repairs",
    ],
  },
  {
    id: "battery-electrical",
    name: "Battery & Electrical Diagnostics",
    icon: "bolt",
    priceFrom: 39,
    duration: "30–90 min",
    tagline: "Reliable starts and a healthy charging system.",
    items: [
      "Battery testing & replacement",
      "Starter diagnostics",
      "Alternator testing",
      "Fuse & wiring checks",
    ],
  },
  {
    id: "hvac",
    name: "Heating, Ventilation & A/C",
    icon: "snow",
    priceFrom: 79,
    duration: "1–2 hrs",
    tagline: "Dial in the cabin climate for any season.",
    items: [
      "A/C recharge",
      "HVAC diagnostics",
      "Compressor service",
      "Heater core & blower checks",
    ],
  },
  {
    id: "steering-suspension",
    name: "Steering & Suspension",
    icon: "spring",
    priceFrom: 119,
    duration: "1–3 hrs",
    tagline: "Tighten up handling and soak up the bumps.",
    items: [
      "Shock replacement",
      "Strut replacement",
      "Tie rod service",
      "Ball joint replacement",
    ],
  },
  {
    id: "engine-diagnostics",
    name: "Engine Diagnostics & Performance",
    icon: "engine",
    priceFrom: 99,
    duration: "1–2 hrs",
    tagline: "Decode the check-engine light and restore pep.",
    items: [
      "Fault code scanning",
      "Engine tune-ups",
      "Spark plug replacement",
      "Performance drivability checks",
    ],
  },
  {
    id: "exhaust-emission",
    name: "Exhaust & Emission Services",
    icon: "exhaust",
    priceFrom: 69,
    duration: "1–2 hrs",
    tagline: "Cleaner output and a quieter cruise.",
    items: [
      "Muffler service",
      "Catalytic converter service",
      "Emissions testing prep",
      "Exhaust leak repair",
    ],
  },
  {
    id: "belts-hoses-wipers",
    name: "Belts, Hoses & Wipers",
    icon: "belt",
    priceFrom: 45,
    duration: "30–90 min",
    tagline: "Replace the wear items before they strand you.",
    items: [
      "Timing belt service",
      "Serpentine belt replacement",
      "Radiator hose replacement",
      "Wiper blade replacement",
    ],
  },
  {
    id: "vehicle-inspections",
    name: "Comprehensive Vehicle Inspections",
    icon: "clipboard",
    priceFrom: 59,
    duration: "45–75 min",
    tagline: "Know exactly where your vehicle stands.",
    items: [
      "Pre-purchase inspection",
      "Seasonal readiness check",
      "Road-trip safety inspection",
      "Multi-point health report",
    ],
  },
];

/** Quick lookup by id. */
export function getCatalogService(id) {
  return SERVICE_CATALOG.find((s) => s.id === id) || null;
}

/**
 * Build strict 30-minute interval slots between two clock times (24h minutes).
 * Returns 12h labels like "9:00 AM", "12:30 PM", "4:30 PM".
 */
function buildSlots(startMinutes, endMinutes, step = 30) {
  const slots = [];
  for (let m = startMinutes; m <= endMinutes; m += step) {
    const hours24 = Math.floor(m / 60);
    const minutes = m % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = ((hours24 + 11) % 12) + 1; // 0->12, 13->1, etc.
    const mm = String(minutes).padStart(2, "0");
    slots.push(`${hours12}:${mm} ${period}`);
  }
  return slots;
}

/**
 * Bookable time slots: 9:00 AM (540) through 4:30 PM (990), every 30 minutes.
 * Result: 9:00, 9:30, 10:00 ... 4:00, 4:30 PM (16 slots total).
 */
export const TIME_SLOTS = buildSlots(9 * 60, 17 * 60 + 30, 30);
