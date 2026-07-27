import LandingPage from "@/components/sections/LandingPage";

/** /auto-paint-repair — landing page config. */
const CONFIG = {
  slug: "auto-paint-repair",
  eyebrow: "Burnaby · Downdraft Spray Booth",
  heading: "Auto Paint Repair in Burnaby",
  subheading:
    "Scratches, chips, fading, and peeling clear coat — refinished with computerized colour matching so the repair is invisible against your original paint.",
  badges: ["Computerized Colour Match", "Downdraft Booth", "Lifetime Warranty", "Free Estimate"],
  benefits: [
    {
      title: "Exact colour match",
      body: "We read your paint code and camera-match the panel, accounting for age and sun fade — not just the factory formula.",
    },
    {
      title: "Dust-free booth finish",
      body: "Refinishing happens in a heated downdraft spray booth, so you get a smooth, contaminant-free factory-grade finish.",
    },
    {
      title: "Scratches to full panels",
      body: "From a single key scratch or stone chip to a complete resprayed panel — same standard either way.",
    },
    {
      title: "Backed for life",
      body: "Our refinishing work carries a lifetime workmanship warranty for as long as you own the vehicle.",
    },
  ],
  formTitle: "Get your free paint repair estimate",
  formNote: "Send a photo of the affected area and we'll quote it — usually within one business day.",
  messageLabel: "Tell us about the paint damage",
  ctaLabel: "Get my free estimate",
};

export default function AutoPaintRepairPage() {
  return <LandingPage config={CONFIG} />;
}