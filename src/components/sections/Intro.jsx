import { motion } from "framer-motion";
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
    body: "Collision, dent, and panel repair returned to pre-accident condition, with full insurance claim support.",
  },
  {
    title: "Painting & Refinishing",
    body: "Computerized color matching and a downdraft spray booth for a factory-flawless, invisible finish.",
  },
  {
    title: "Frame Racking",
    body: "Computerized laser measuring and unibody pulling that restore structural dimensions to the millimeter.",
  },
  {
    title: "A/C Service",
    body: "Complete diagnostics, leak detection, and recharge — a lasting fix, not a temporary top-off.",
  },
  {
    title: "Wheel Alignment",
    body: "Laser four-wheel alignment correcting camber, caster, and toe to eliminate pull and uneven wear.",
  },
  {
    title: "Brakes",
    body: "OEM-grade pads and rotors, fluid flushes, and ABS diagnostics with a safety check on every job.",
  },
  {
    title: "Tires",
    body: "New tire sales, road-force balancing, rotations, and fast flat repairs to keep you rolling.",
  },
  {
    title: "Uber Inspection",
    body: "Same-day Taxi & Limousine Commission inspections so rideshare drivers stay compliant and earning.",
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
          <Card key={cap.title} interactive reveal className="h-full">
            <h3 className="text-lg font-bold">{cap.title}</h3>
            <p className="text-secondary mt-2 text-sm leading-relaxed">{cap.body}</p>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
