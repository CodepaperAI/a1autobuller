import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "service-areas",
  eyebrow: "One real shop · Serving Metro Vancouver",
  heading: "Burnaby Auto Body Shop Service Areas",
  seoTitle: "Burnaby Auto Body Shop Service Areas | A1 Buller",
  subheading:
    "A1 Buller Auto Collision operates from one physical facility at 7055 Buller Ave in Burnaby and serves drivers from Burnaby and nearby Metro Vancouver communities.",
  metaDescription:
    "Visit A1 Buller Auto Collision at 7055 Buller Ave in Burnaby. We serve drivers from Burnaby, Vancouver, New Westminster, Richmond, and Coquitlam.",
  badges: ["Burnaby facility", "Vancouver drivers", "New Westminster drivers", "Metro Vancouver"],
  benefits: [
    { title: "Burnaby", body: "Our repair facility and customer intake are located at 7055 Buller Ave in Burnaby, BC." },
    { title: "Vancouver", body: "Vancouver drivers can contact the Burnaby shop for collision, ICBC, dent, paint, and selected mechanical services." },
    { title: "New Westminster", body: "Drivers from New Westminster are served at the same Burnaby facility, avoiding misleading duplicate location pages." },
    { title: "Richmond and Coquitlam", body: "Customers from other Metro Vancouver communities can request an estimate before planning their visit." },
  ],
  formTitle: "Plan your visit or request an estimate",
  formNote: "Tell us where you are coming from, what the vehicle needs, and attach photos when relevant.",
  messageLabel: "Vehicle, service, and location details",
  ctaLabel: "Contact the Burnaby shop",
  sections: [
    { title: "Our only physical location", body: "A1 Buller Auto Collision is located at 7055 Buller Ave, Burnaby, BC V5J 4S1. Service-area names describe where customers travel from; they are not additional shop addresses." },
    { title: "Before you visit", body: "Call or send a request first so the team can confirm the right type of appointment and any information to bring.", items: ["Vehicle year, make, and model", "Photos and a damage description", "ICBC claim number when applicable", "Warning lights or drivability concerns", "Preferred contact method"] },
  ],
  faqs: [
    { q: "Do you have locations outside Burnaby?", a: "No. The website lists one physical shop at 7055 Buller Ave in Burnaby. Nearby cities are service areas, not separate storefronts." },
    { q: "Can I request an estimate before travelling to the shop?", a: "Yes. Send vehicle details and photos through the form. The team can advise whether an in-person inspection is the appropriate next step." },
  ],
  relatedLinks: [
    { label: "All services", href: "/services" },
    { label: "Request an estimate", href: "/estimate" },
    { label: "Contact and directions", href: "/contact" },
  ],
};

export default function ServiceAreasPage() {
  return <LandingPage config={CONFIG} />;
}
