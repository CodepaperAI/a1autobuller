import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

/**
 * Certifications page
 * -----------------------------------------------------------------------------
 * Details the shop's credentials and what each one means for the customer.
 * Linked directly from the Navbar.
 */

const CERTS = [
  {
  name: "ICBC Repair Network",
  detail:
    "Repair-network participation that supports eligible claim handling, estimating, documentation, and repairs under current ICBC requirements.",
},
  {
    name: "I-CAR Gold Class",
    detail:
      "An industry training recognition focused on maintaining role-relevant collision repair knowledge across the shop.",
  },
  {
    name: "Toyota Certified Collision",
    detail: "Approved procedures, OEM parts, and factory-standard repairs for Toyota and Lexus vehicles.",
  },
  {
    name: "Kia Certified Collision",
    detail: "Manufacturer-approved structural and refinishing work that protects your Kia warranty.",
  },
  {
    name: "Hyundai Certified Collision",
    detail: "OEM repair protocols and genuine parts for Hyundai and Genesis models.",
  },
  {
    name: "Aluminum Repair Certified",
    detail: "Isolated aluminum bay, dedicated tooling, and welders trained for aluminum-bodied vehicles.",
  },
  {
    name: "Nissan Certified ",
    detail: "Factory-certified repairs using Nissan-approved repair procedures, genuine OEM parts, and advanced equipment to restore your vehicle to manufacturer standards.",
  },
  {
    name: "OEC",
    detail: "Original Equipment Certified repairs using OEM parts, manufacturer-approved procedures, and advanced repair technology to ensure factory-quality results.",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function CertificationsPage() {
  return (
    <>
      <SeoHead
        title="Collision Repair Certifications | A1 Buller Auto Burnaby"
        description="Learn about A1 Buller Auto Collision's repair-network, collision-repair, OEM procedure, aluminum-repair, and technician training credentials in Burnaby, BC."
        path="/certifications"
      />

      <section className="section py-20 sm:py-28">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
        className="mb-8"
      />
      <div className="mx-auto max-w-3xl text-center">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl font-extrabold tracking-tight sm:text-5xl"
  >
    Credentials that <span className="text-brand-600">protect your car</span>.
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="text-secondary mt-4 text-lg leading-relaxed"
  >
    Certifications aren&apos;t decoration — they dictate the precise procedures, 
    specialized tooling, and genuine parts we&apos;re authorized to use. Here is 
    exactly what our credentials mean for your vehicle’s safety and resale value.
  </motion.p>
</div>
        <div className="mt-14 max-w-2xl">
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            What our repair credentials mean
          </h2>
          <p className="mt-3 leading-relaxed text-secondary">
            Training, tooling, documentation, and vehicle-specific procedures all
            contribute to a complete repair plan. Ask our team which credentials
            and procedures apply to your vehicle and the work it needs.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTS.map((c) => (
            <Card key={c.name} reveal className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 19.3 7.2 21.7l.9-5.4L4.2 8.7l5.4-.8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.name}</h3>
              <p className="text-secondary mt-2 text-sm leading-relaxed">{c.detail}</p>
            </Card>
          ))}
        </motion.div>
      </section>
    </>
  );
}
