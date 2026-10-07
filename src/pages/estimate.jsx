import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "estimate",
  eyebrow: "Online photo estimate · Burnaby, BC",
  heading: "Auto Body Repair Estimate in Burnaby",
  seoTitle: "Auto Body Repair Estimate in Burnaby | A1 Buller",
  subheading:
    "Tell us what happened and attach clear photos of the damage. Our Burnaby team will review the details and contact you about the next step.",
  metaDescription:
    "Request an auto body repair estimate in Burnaby. Send vehicle details and damage photos online for dents, bumpers, paint, or collision repairs.",
  badges: ["No account needed", "Up to 5 photos", "Direct shop response", "Burnaby facility"],
  benefits: [
    { title: "Start online", body: "Share the vehicle, damaged area, and your preferred contact details without creating an account." },
    { title: "Show several angles", body: "Wide and close photos help the estimator understand the location and visible extent of the damage." },
    { title: "Clear next step", body: "The shop can explain whether an in-person inspection, claim information, or additional photos are needed." },
    { title: "One request for many repairs", body: "Use this form for dents, bumpers, scratches, refinishing, collision damage, or an ICBC repair assessment." },
  ],
  formTitle: "Send your estimate request",
  formNote: "Include the year, make, model, damaged area, and whether you have an insurance claim number.",
  messageLabel: "Vehicle and damage details",
  ctaLabel: "Send estimate request",
  sections: [
    { title: "Photos to include", body: "Good lighting and context make the first review more useful.", items: ["One photo of the full vehicle", "A wide view of the damaged panel", "Close views from two or more angles", "Dashboard warnings or sensor messages", "The VIN label only when the shop requests it"] },
    { title: "Why an inspection may still be needed", body: "Photos cannot reliably show damage behind a bumper, beneath trim, inside a panel, or at structural and sensor mounting points. The final repair plan and price should follow the inspection required for your vehicle." },
  ],
  faqs: [
    { q: "Is a photo estimate the final repair price?", a: "Not always. Photos help start the conversation, but hidden damage, parts, procedures, and calibration requirements may only be confirmed during an in-person inspection or disassembly." },
    { q: "Can I send an ICBC claim number?", a: "Yes. Include the claim number and any instructions you received from ICBC so the shop can discuss the appropriate next step." },
  ],
  relatedLinks: [
    { label: "ICBC claims", href: "/icbc-claims" },
    { label: "Collision repair", href: "/services/auto-body-repair/burnaby" },
    { label: "Bumper repair", href: "/bumper-repair" },
  ],
};

export default function EstimatePage() {
  return <LandingPage config={CONFIG} />;
}
