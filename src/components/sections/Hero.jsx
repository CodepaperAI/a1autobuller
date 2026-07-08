import { useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

/**
 * Hero
 * -----------------------------------------------------------------------------
 * The homepage thesis. High-impact type over an animated "blueprint grid"
 * (our signature motif — collision work starts from precise measurements).
 * The primary CTA routes through the booking intercept: signed-out visitors
 * see the optional-auth modal, everyone else scrolls straight to the form.
 */

// Certifications / trust badges requested in the brief.
const BADGES = [
  "Toyota Certified",
  "Kia Certified",
  "Hyundai Certified",
  "I-CAR Gold Class",
  "Aluminum Repair",
  "Nissan-Compatible",
  "OEC"
];

// Shared stagger config for the entrance sequence.
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const { requestBooking } = useAuth();

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // CTA: intercept for guests, then proceed to the contact/booking form.
  const handleBook = useCallback(() => {
    requestBooking(scrollToContact);
  }, [requestBooking, scrollToContact]);

  return (
    <section className="relative overflow-hidden">
      {/* Signature: animated blueprint grid + soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-grid-pan bg-blueprint bg-[length:40px_40px] dark:bg-blueprint-dark"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]"
      />

      <div className="section flex flex-col items-center py-24 text-center sm:py-32">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border divider px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Certified Collision & Mechanical Repair
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Your car, restored to{" "}
            <span className="text-brand-600">factory-precise</span> condition.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="text-secondary mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
          >
            From aluminum and EV structural work to frame racking, refinishing,
            and same-day Uber/TLC inspections — A1 Buller Auto delivers OEM-standard
            repairs backed by a lifetime workmanship warranty.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={handleBook}>
              Book an Appointment
            </Button>
            <Button size="lg" variant="secondary" onClick={scrollToContact}>
              Get a Free Estimate
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map((badge) => (
            <motion.li
              key={badge}
              variants={item}
              whileHover={{ y: -3 }}
              className="surface-elevated rounded-xl px-4 py-2.5 text-sm font-semibold shadow-panel"
            >
              {badge}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
