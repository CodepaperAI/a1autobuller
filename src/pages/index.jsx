import SeoHead from "@/components/seo/SeoHead";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Homepage
 * -----------------------------------------------------------------------------
 * Assembles the primary marketing sections. The Navbar/Footer come from the
 * shared LayoutWrapper, so this page only composes content.
 */
export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Auto Body & Collision Repair in Burnaby, BC | A1 Buller Auto"
        description="A1 Buller Auto Collision provides ICBC collision repair, auto body work, refinishing, frame repair, wheel alignment, brakes, tires, and mechanical service in Burnaby, BC."
        path="/"
        keywords={[
          "auto body repair Burnaby",
          "collision repair Burnaby",
          "ICBC repair Burnaby",
          "car dent repair Burnaby",
          "A1 Buller Auto Collision",
        ]}
      />

      <Hero />
      <Intro />
      <ContactSection />
    </>
  );
}
