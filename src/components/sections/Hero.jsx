import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { trackConversion } from "@/lib/analytics";

/**
 * Hero
 * -----------------------------------------------------------------------------
 * The homepage thesis. High-impact content layered over real service imagery.
 * The primary CTAs take visitors directly to the real estimate and service
 * request flows without an account gate.
 */

// Certifications / trust badges requested in the brief.
const BADGES = [
  "ICBC Repair Network",
  "Toyota Certified",
  "Kia Certified",
  "Hyundai Certified",
  "I-CAR Gold Class",
  "Aluminum Repair",
  "Nissan Certified",
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
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-metal-950 sm:min-h-[760px]">
      <Image
        src="/hero-auto-body-shop.jpg"
        alt="Professional auto body repair in the A1 Buller Auto Collision shop"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/65 to-black/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(36,86,235,0.24),transparent_58%)]"
      />

      <div className="section relative z-10 flex min-h-[720px] flex-col items-center justify-center py-20 text-center text-white sm:min-h-[760px] sm:py-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-200 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            Certified Collision & Mechanical Repair
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Burnaby auto body shop for collision repairs restored to{" "}
            <span className="text-brand-300">factory-precise</span> condition.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-100"
          >
            From aluminum and EV structural repairs to precision frame racking
            and refinishing, A1 Buller Auto Collision provides complete collision
            and mechanical service from our Burnaby facility. Request a free
            estimate and send photos of the damage online.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              as="a"
              href="/services"
              onClick={() => trackConversion("appointment_cta_click", { location: "homepage_hero" })}
            >
              Book an Appointment
            </Button>
            <Button
              size="lg"
              variant="secondary"
              as="a"
              href="/estimate"
              onClick={() => trackConversion("estimate_cta_click", { location: "homepage_hero" })}
              className="border-white/30 bg-white/95 text-slate-950 hover:border-white hover:text-brand-700"
            >
              Get a Free Estimate
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map((badge) => (
            <motion.li
              key={badge}
              variants={item}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-sm font-semibold text-white shadow-panel backdrop-blur-md"
            >
              {badge}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
