import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "icbc-claims",
  eyebrow: "ICBC claim support · Burnaby repair facility",
  heading: "ICBC Claims & Collision Repair in Burnaby",
  seoTitle: "ICBC Claim Repair in Burnaby | A1 Buller Auto",
  subheading:
    "Bring your claim number and vehicle details to our Burnaby collision facility. We document the visible damage, explain the repair process, and help you understand the next step.",
  metaDescription:
    "Get help with an ICBC collision repair claim in Burnaby. Learn what to bring, how assessment works, and request a repair appointment with A1 Buller Auto.",
  badges: ["ICBC Repair Network", "Damage documentation", "Repair-plan guidance", "Burnaby facility"],
  benefits: [
    { title: "Claim-ready intake", body: "Share your claim number, vehicle information, incident details, and photos in one request." },
    { title: "Damage assessment", body: "The shop records visible damage and identifies when measurement, scanning, disassembly, or further inspection may be required." },
    { title: "Documented repair plan", body: "The repair path is explained before authorized work begins, including any claim-specific steps." },
    { title: "Current official guidance", body: "Claim requirements can vary, so drivers should also follow the current instructions provided directly by ICBC." },
  ],
  formTitle: "Request an ICBC repair assessment",
  formNote: "Include your claim number if available, plus the vehicle year, make, model, and damaged area.",
  messageLabel: "Claim and vehicle details",
  ctaLabel: "Request claim assessment",
  sections: [
    { title: "What to bring", body: "Having the key details ready helps the assessment begin efficiently.", items: ["ICBC claim number", "Vehicle registration details", "Incident and damage photos", "Any ICBC instructions or correspondence", "Notes about warning lights or driving changes"] },
    { title: "Typical repair path", body: "A claim commonly moves from reporting and inspection to estimating, authorization, repair planning, repairs, and final quality checks. The exact sequence depends on the claim and the vehicle." },
  ],
  faqs: [
    { q: "Should I report the collision before contacting the shop?", a: "If you plan to make an ICBC claim, report it through ICBC and keep the claim number. Follow any claim-specific directions ICBC provides." },
    { q: "Can photos show all collision damage?", a: "No. Bumper covers, trim, panels, and assemblies can hide damage. An in-person inspection and sometimes disassembly are required for a complete repair plan." },
  ],
  relatedLinks: [
    { label: "ICBC repair process guide", href: "/blog/icbc-collision-repair-process-burnaby" },
    { label: "Request an estimate", href: "/estimate" },
    { label: "ICBC collision repair service", href: "/services/icbc-collision-repair/burnaby" },
  ],
};

export default function IcbcClaimsPage() {
  return <LandingPage config={CONFIG} />;
}
