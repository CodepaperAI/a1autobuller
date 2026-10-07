import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import ContactSection from "@/components/sections/ContactSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

/**
 * /contact — Dedicated contact page (Phase 1)
 * -----------------------------------------------------------------------------
 * The navbar's "Contact Us" link now performs true page redirection to this
 * route (instead of scrolling to a homepage anchor). We reuse the existing
 * <ContactSection> so the lead-capture form + upload logic stay in one place.
 */
export default function ContactPage() {
  return (
    <>
      <SeoHead
        title="Contact Our Burnaby Auto Body Shop | A1 Buller Auto"
        description="Contact A1 Buller Auto Collision in Burnaby for a repair estimate. Send details and vehicle photos, call (604) 423-4524, or visit 7055 Buller Ave."
        path="/contact"
      />

      <section className="section pt-14 sm:pt-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          className="mb-8"
        />
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Contact <span className="text-brand-600">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-base text-secondary"
          >
            Questions, quotes, or want to describe a repair? Send a note and
            attach a few photos — we&apos;ll follow up quickly.
          </motion.p>
        </div>
      </section>

      {/* The shared lead-capture form (validation, drag-and-drop upload, etc.) */}
      <ContactSection />
    </>
  );
}
