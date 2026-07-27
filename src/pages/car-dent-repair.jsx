import LandingPage from "@/components/sections/LandingPage";

/** /car-dent-repair — landing page config. */
const CONFIG = {
  slug: "car-dent-repair",
  eyebrow: "Burnaby · ICBC Repair Network",
  heading: "Car Dent Repair in Burnaby",
  subheading:
    "Door dings, parking-lot dents, creases, and hail damage — repaired so cleanly you'd never know they were there. Free estimates, lifetime workmanship warranty.",
  badges: ["ICBC Accredited", "Red Seal Technician", "Free Estimate", "Lifetime Warranty"],
  benefits: [
    {
      title: "Paintless where possible",
      body: "If the paint isn't broken, we massage the metal back to shape — faster, cheaper, and the factory finish stays untouched.",
    },
    {
      title: "Invisible colour match",
      body: "Computerized colour matching and a downdraft booth mean refinished panels blend perfectly with the original paint.",
    },
    {
      title: "ICBC claims handled",
      body: "We're part of the ICBC Repair Network, so we deal with the claim directly — one shop, no paperwork chase.",
    },
    {
      title: "Clear, no-obligation quote",
      body: "Send a couple of photos and we'll come back with a written estimate, usually within one business day.",
    },
  ],
  formTitle: "Get your free dent repair estimate",
  formNote: "Send a photo of the damage and we'll quote it — usually within one business day.",
};

export default function CarDentRepairPage() {
  return <LandingPage config={CONFIG} />;
}