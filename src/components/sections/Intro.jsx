import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";

/**
 * Intro
 * -----------------------------------------------------------------------------
 * High-density capabilities overview. Communicates the full breadth of work
 * A1 Buller Auto handles, grouped into scannable, animated capability cards.
 */

const CAPABILITIES = [
  {
    title: "Auto Body Repair",
    href: "/services/auto-body-repair/burnaby",
    body: "Collision, dent, and panel repair returned to pre-accident condition, with full insurance claim support.",
  },
  {
    title: "Painting & Refinishing",
    href: "/auto-paint-repair",
    body: "Computerized color matching and a downdraft spray booth for a factory-flawless, invisible finish.",
  },
  {
    title: "Frame Racking",
    href: "/services/frame-racking/burnaby",
    body: "Computerized laser measuring and unibody pulling that restore structural dimensions to the millimeter.",
  },
  {
    title: "A/C Service",
    href: "/services/ac-repair/burnaby",
    body: "Complete diagnostics, leak detection, and recharge — a lasting fix, not a temporary top-off.",
  },
  {
    title: "Wheel Alignment",
    href: "/services/wheel-alignment/burnaby",
    body: "Laser four-wheel alignment correcting camber, caster, and toe to eliminate pull and uneven wear.",
  },
  {
    title: "Brakes",
    href: "/services/brake-repair/burnaby",
    body: "OEM-grade pads and rotors, fluid flushes, and ABS diagnostics with a safety check on every job.",
  },
  {
    title: "Tires",
    href: "/services/tire-services/burnaby",
    body: "New tire sales, road-force balancing, rotations, and fast flat repairs to keep you rolling.",
  },
  {
    title: "ICBC Collision Repair",
    href: "/services/icbc-collision-repair/burnaby",
    body: "Accredited collision repair and claim support with a documented repair plan and clear updates.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Intro() {
  return (
    <section className="section py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          One shop for the whole vehicle.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-secondary mt-4 text-lg leading-relaxed"
        >
          A1 Buller Auto combines a certified collision center, a full refinishing
          booth, and a complete mechanical shop under one roof — so a single visit
          covers structural, cosmetic, and mechanical work without shuttling your
          car between vendors.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CAPABILITIES.map((cap) => (
          <Link key={cap.title} href={cap.href} className="block h-full">
            <Card interactive reveal className="h-full">
              <h3 className="text-lg font-bold">{cap.title}</h3>
              <p className="text-secondary mt-2 text-sm leading-relaxed">{cap.body}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand-600">
                Learn about this service →
              </span>
            </Card>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
