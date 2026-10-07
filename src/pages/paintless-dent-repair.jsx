import LandingPage from "@/components/sections/LandingPage";

const CONFIG = {
  slug: "paintless-dent-repair",
  eyebrow: "Dent assessment · Burnaby, BC",
  heading: "Paintless Dent Repair in Burnaby",
  seoTitle: "Paintless Dent Repair Burnaby | A1 Buller Auto",
  subheading:
    "When the paint and panel condition allow it, paintless dent repair can reshape a dent while preserving the original finish. Send photos for an initial assessment.",
  metaDescription:
    "Paintless dent repair in Burnaby for suitable door dings, shallow dents, and some hail damage. Send photos for an initial PDR assessment.",
  badges: ["Original paint preserved when suitable", "Door dings", "Minor dents", "Photo assessment"],
  benefits: [
    { title: "Repairability checked first", body: "Panel access, paint condition, dent depth, creases, edges, and previous repairs all affect whether PDR is appropriate." },
    { title: "Original finish retained", body: "A suitable PDR repair reshapes the metal without conventional filler and refinishing." },
    { title: "Conventional repair when needed", body: "Cracked paint, stretched metal, sharp creases, or structural damage may require body repair and refinishing instead." },
    { title: "Photos help with triage", body: "Reflections and several angles help, but the final recommendation follows a hands-on inspection." },
  ],
  formTitle: "Request a dent assessment",
  formNote: "Send one wide photo and several angled close-ups so the dent shape and paint condition are easier to see.",
  messageLabel: "Dent location and vehicle details",
  ctaLabel: "Send dent photos",
  sections: [
    { title: "Good PDR candidates", body: "PDR is commonly considered for damage where the finish remains intact and the metal can be accessed and reshaped.", items: ["Shallow door dings", "Minor parking-lot dents", "Some hail dents", "Flexible, unbroken paint", "Panels without severe stretching"] },
    { title: "When conventional repair is better", body: "Body repair may be more appropriate when paint is cracked, the panel is torn or heavily creased, metal is stretched, corrosion is present, or access is restricted." },
  ],
  faqs: [
    { q: "Can every dent be repaired without paint?", a: "No. The paint, dent shape, metal stretch, location, access, and vehicle construction determine whether PDR is suitable." },
    { q: "Can you assess a dent from a photo?", a: "Photos can support an initial opinion, but reflections can hide low spots and damage. The final method should be confirmed in person." },
  ],
  relatedLinks: [
    { label: "Dent repair options guide", href: "/blog/paintless-dent-repair-vs-body-repair" },
    { label: "Car dent repair", href: "/car-dent-repair" },
    { label: "Hail damage repair", href: "/hail-damage-repair" },
  ],
};

export default function PaintlessDentRepairPage() {
  return <LandingPage config={CONFIG} />;
}
