import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "scratch-repair",
  eyebrow: "Paint and body repair · Burnaby, BC",
  heading: "Car Scratch Repair in Burnaby",
  seoTitle: "Car Scratch Repair in Burnaby | A1 Buller Auto",
  subheading:
    "From clear-coat marks to scratches that expose primer or metal, the right repair depends on depth, location, finish, and panel condition.",
  metaDescription:
    "Car scratch repair in Burnaby for scuffs, clear-coat marks, deep scratches, and damaged paint. Send photos for an initial assessment.",
  badges: ["Damage-depth assessment", "Colour matching", "Panel refinishing", "Photo estimates"],
  benefits: [
    { title: "Repair matched to depth", body: "A surface transfer is treated differently from damage that penetrates colour, primer, or the underlying panel." },
    { title: "Colour and finish evaluation", body: "Technicians account for paint code, colour variant, age, finish, and surrounding panels." },
    { title: "Corrosion risk considered", body: "Scratches that expose metal should be assessed before moisture and road contamination lead to corrosion." },
    { title: "Scuffs and adjacent damage checked", body: "Bumper or panel scratches can accompany cracks, dents, broken mounts, or sensor-area damage." },
  ],
  formTitle: "Request a scratch repair estimate",
  formNote: "Send a full-panel photo plus close views in natural light when possible.",
  messageLabel: "Scratch location and vehicle details",
  ctaLabel: "Send scratch photos",
  sections: [
    { title: "What affects the repair", body: "The estimator considers more than the visible line.", items: ["Scratch depth and length", "Panel material and shape", "Paint type and colour", "Dents, cracks, or torn bumper material", "Previous repairs and corrosion"] },
    { title: "Why touch-up is not always enough", body: "Touch-up can protect a small chip but may not create an even cosmetic finish on a long or deep scratch. Sanding, repair, primer, colour, and clear coat may be required." },
  ],
  faqs: [
    { q: "How can I tell how deep a scratch is?", a: "The visible colour and whether a fingernail catches can provide clues, but cleaning and inspection are the reliable way to identify the affected coating layers." },
    { q: "Does the whole panel need painting?", a: "It depends on the damage, colour, panel, finish, and repair method. The estimator should explain the refinishing area after inspecting the vehicle." },
  ],
  relatedLinks: [
    { label: "Auto paint repair", href: "/auto-paint-repair" },
    { label: "Bumper repair", href: "/bumper-repair" },
    { label: "Request an estimate", href: "/estimate" },
  ],
};

export default function ScratchRepairPage() {
  return <LandingPage config={CONFIG} />;
}
