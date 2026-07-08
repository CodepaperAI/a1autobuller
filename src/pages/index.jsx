import Head from "next/head";
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
      <Head>
        <title>A1 Buller Auto | Certified Collision, Body & Mechanical Repair in NYC</title>
        <meta
          name="description"
          content="A1 Buller Auto is a certified collision and mechanical repair center in Queens, NY — aluminum & EV repair, frame racking, painting, brakes, alignment, tires, and same-day Uber/TLC inspections."
        />
        <meta name="keywords" content="auto body repair NYC, collision repair Queens, TLC inspection, aluminum repair, frame racking, A1 Buller Auto" />
        <meta property="og:title" content="A1 Buller Auto | Certified Collision & Mechanical Repair" />
        <meta property="og:description" content="OEM-standard collision, refinishing, and mechanical repair for drivers across the five boroughs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.a1bullerauto.com/" />
      </Head>

      <Hero />
      <Intro />
      <ContactSection />
    </>
  );
}
