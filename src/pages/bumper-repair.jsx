import LandingPage from "@/components/sections/LandingPage";

/** /bumper-repair — landing page config. */
const CONFIG = {
  slug: "bumper-repair",
  eyebrow: "Burnaby · ICBC Repair Network",
  heading: "Bumper Repair in Burnaby",
  subheading:
    "Cracked, scuffed, or hanging bumper? We repair instead of replace wherever it's safe to — saving you time and money, with a finish that matches the factory paint.",
  badges: ["Repair Before Replace", "ICBC Accredited", "Sensor-Safe", "Free Estimate"],
  benefits: [
    {
      title: "Repair, not replace",
      body: "Most plastic bumpers can be plastic-welded and refinished for a fraction of a replacement — we'll tell you honestly which yours needs.",
    },
    {
      title: "Scuffs blended invisibly",
      body: "Computerized colour matching and a downdraft booth mean the repaired area disappears into the original paint.",
    },
    {
      title: "Sensors & cameras protected",
      body: "Parking sensors, cameras, and radar units are removed, protected, and refitted so your driver aids keep working correctly.",
    },
    {
      title: "Usually back in 1–3 days",
      body: "Most bumper jobs are quick turnarounds. We'll give you a realistic completion date up front, not a guess.",
    },
  ],
  formTitle: "Get your free bumper repair quote",
  formNote: "Send a photo of the bumper and we'll quote it — usually within one business day.",
  ctaLabel: "Get my free quote",
};

export default function BumperRepairPage() {
  return <LandingPage config={CONFIG} />;
}