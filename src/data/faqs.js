/**
 * FAQ CONTENT — AI-search (AEO) targets
 * -----------------------------------------------------------------------------
 * These are real questions people ask search engines and AI assistants, taken
 * from our AI Search Visibility report. Each entry carries the monthly search
 * volume so we can prioritise which answers to expand over time.
 *
 * Answers are deliberately concise and factual — AI assistants and Google tend
 * to quote a clear 2–4 sentence answer, so brevity wins here.
 *
 * `group` drives the section headings on /faq.
 */

export const FAQ_GROUPS = [
  { id: "insurance", title: "Insurance claims" },
  { id: "frame", title: "Frame & structural damage" },
  { id: "certification", title: "Certifications & standards" },
];

export const FAQS = [

  // --- Frame & structural damage ------------------------------------------
  {
    group: "frame",
    volume: 720,
    q: "What is the difference between unibody and body-on-frame damage, and how does each affect repair costs?",
    a: "In a unibody vehicle — almost every modern car and crossover — the body panels and floor structure are a single welded shell that absorbs crash energy, so damage travels through the structure and repairs need computerized measuring to restore factory dimensions. Body-on-frame vehicles, mostly trucks and larger SUVs, bolt a separate body onto a ladder frame, so a damaged section can sometimes be straightened or replaced more independently. Unibody repairs are usually more measurement-intensive, while frame repairs on trucks involve heavier structural work — which is why an accurate estimate needs the vehicle measured, not just looked at.",
  },
  {
    group: "frame",
    volume: 590,
    q: "Is a car considered a total loss if the frame is damaged beyond repair?",
    a: "Frame damage alone doesn't automatically total a vehicle. Insurers declare a total loss when the cost of a safe, complete repair approaches or exceeds the vehicle's pre-crash value, so the same damage might be repairable on a newer car and a write-off on an older one. Structural damage does raise repair cost significantly, which is why it often tips the calculation. A shop with computerized measuring can document what's actually repairable, and that documentation is what the insurer's decision is based on.",
  },
  {
    group: "frame",
    volume: 70,
    q: "What are the most common signs that your car frame is bent or damaged after an accident?",
    a: "Look for uneven gaps around the doors, hood, or trunk, doors that no longer close cleanly, and body panels that don't line up the way they used to. On the road, a pull to one side, off-centre steering wheel, uneven or rapid tire wear, and new vibrations or creaking are common signs. Fresh wrinkles or buckling in the floor pan, inner fenders, or trunk floor are strong indicators. None of these are conclusive on their own — structural damage is confirmed by measuring the vehicle against factory specifications.",
  },
  {
    group: "frame",
    volume: 70,
    q: "Can I still safely drive my vehicle if I suspect the frame is damaged?",
    a: "It's not worth the risk. Structural damage changes how the vehicle absorbs energy in another impact, and it can affect steering geometry, suspension alignment, and how airbags and crumple zones perform. Warning signs like pulling, misaligned panels, or unusual noises mean it should be inspected before further driving. Have it towed or inspected rather than driven any distance — a measurement check is quick and tells you definitively.",
  },
  {
    group: "frame",
    volume: 0,
    q: "How does a body shop diagnose car frame damage after a collision?",
    a: "The vehicle is measured against the manufacturer's factory dimensions using a computerized laser or electronic measuring system, which compares dozens of reference points to spec. That produces a pre-repair report showing exactly where and how far the structure has moved. After pulling and straightening, the vehicle is measured again and a post-repair report confirms it's back within tolerance. Those two reports are your proof the repair was done properly — always ask for them.",
  },

  // --- Certifications ------------------------------------------------------
  {
    group: "certification",
    volume: 10,
    q: "Why should I choose an I-CAR Gold Class certified repair shop after an accident?",
    a: "I-CAR Gold Class recognises shops where the technicians hold current training across the roles involved in a complete repair — estimating, structural, non-structural, and refinishing. It matters because modern vehicles combine high-strength steels, aluminum, and driver-assistance sensors that each have specific repair procedures. Gold Class is a signal that the shop trains to those procedures rather than improvising, which affects both safety and how well the repair holds up.",
  },
  {
    group: "certification",
    volume: 10,
    q: "How does a collision repair shop earn and maintain I-CAR Gold Class status?",
    a: "The shop has to have trained, currently-credentialed people in each key repair role, and that training has to be kept up annually — it isn't a one-time certificate. Technicians complete role-relevant courses and stay current as vehicle technology changes, and the shop is re-evaluated to keep the designation. That ongoing requirement is exactly why the designation is meaningful: it reflects present-day capability, not something earned years ago.",
  },
  {
    group: "certification",
    volume: 10,
    q: "What is the difference between I-CAR Gold Class and other auto body shop certifications?",
    a: "I-CAR Gold Class is training-based and brand-neutral — it certifies that the shop's people are trained to current industry repair standards across all makes. Manufacturer certifications (from Tesla, Ford, Honda and others) are model-specific and typically also require particular tooling, equipment, and OEM parts usage. Insurer networks like the ICBC Repair Network are about accreditation and claim handling rather than technician training. The strongest shops carry a combination, because each covers something the others don't.",
  },
];

/** Helper: FAQs for one group, highest search volume first. */
export function faqsByGroup(groupId) {
  return FAQS.filter((f) => f.group === groupId).sort((a, b) => b.volume - a.volume);
}

/** Build Google/AI-friendly FAQPage JSON-LD from a list of FAQs. */
export function buildFaqJsonLd(list) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}