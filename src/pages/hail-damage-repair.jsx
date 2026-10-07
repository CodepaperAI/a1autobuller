import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "hail-damage-repair",
  eyebrow: "Hail dent assessment · Burnaby, BC",
  heading: "Hail Damage Repair in Burnaby",
  seoTitle: "Hail Damage Repair in Burnaby | A1 Buller Auto",
  subheading:
    "Hail can leave dozens of dents across the roof, hood, trunk, rails, and trim. We assess panel condition, paint damage, access, and the right repair method.",
  metaDescription:
    "Hail damage repair in Burnaby for dented roofs, hoods, trunks, and panels. Send photos for an initial paintless or conventional repair assessment.",
  badges: ["PDR assessment", "Paint condition check", "Multi-panel inspection", "Insurance information welcome"],
  benefits: [
    { title: "Complete walk-around", body: "Lighting and reflections help reveal dents that may be difficult to see in ordinary conditions." },
    { title: "Panel-by-panel planning", body: "Different areas of the same vehicle may need different repair methods based on access and damage severity." },
    { title: "Glass and trim checked", body: "A hail inspection should include mouldings, lamps, glass, roof rails, and other exterior parts." },
    { title: "Claim details organized", body: "If the damage is connected to an insurance claim, include the claim number and any instructions you received." },
  ],
  formTitle: "Request a hail damage assessment",
  formNote: "Send well-lit photos of the roof, hood, trunk, and both sides. Reflections across the panels help reveal dents.",
  messageLabel: "Hail event and vehicle details",
  ctaLabel: "Send hail damage photos",
  sections: [
    { title: "Possible repair methods", body: "Paintless dent repair may preserve the original finish where paint remains intact and the metal is repairable. Cracked paint, severe stretching, sharp damage, or inaccessible areas may need conventional body repair or panel replacement." },
    { title: "What to document", body: "Record the date and location of the event before cleaning or repairing the vehicle.", items: ["Wide photos of every affected side", "Close photos using reflected light", "Cracked glass or damaged lamps", "Any paint chips or sharp creases", "Claim number when applicable"] },
  ],
  faqs: [
    { q: "Can hail dents be fixed with paintless dent repair?", a: "Many can, but suitability depends on paint condition, dent depth, metal stretch, access, and the number and location of dents." },
    { q: "Should I wash the vehicle before an inspection?", a: "A clean surface can make dents and paint damage easier to see, provided washing is safe and does not disturb broken glass or loose parts." },
  ],
  relatedLinks: [
    { label: "Paintless dent repair", href: "/paintless-dent-repair" },
    { label: "Car dent repair", href: "/car-dent-repair" },
    { label: "Request an estimate", href: "/estimate" },
  ],
};

export default function HailDamageRepairPage() {
  return <LandingPage config={CONFIG} />;
}
