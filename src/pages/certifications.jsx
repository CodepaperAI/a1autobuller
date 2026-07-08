import Head from "next/head";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

/**
 * Certifications page
 * -----------------------------------------------------------------------------
 * Details the shop's credentials and what each one means for the customer.
 * Linked directly from the Navbar.
 */

const CERTS = [
  {
    name: "I-CAR Gold Class",
    detail:
      "The highest industry recognition for collision repair training — held by fewer than 1 in 10 shops nationwide.",
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
    name: "Nissan-Compatible Repair",
    detail: "High-voltage-safe handling and structural aluminum capability for electric vehicles.",
  },
  {
    name: "OEC",
    detail: "High-voltage-safe handling and structural aluminum capability for electric vehicles.",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function CertificationsPage() {
  return (
    <>
      <Head>
        <title>Certifications & Credentials | A1 Buller Auto</title>
        <meta
          name="description"
          content="A1 Buller Auto holds I-CAR Gold Class, OEM collision certifications for Toyota, Kia, and Hyundai, plus aluminum and EV/Tesla-compatible repair credentials."
        />
        <link rel="canonical" href="https://www.a1bullerauto.com/certifications" />
      </Head>

      <section className="section py-20 sm:py-28">
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
            Certifications aren&apos;t decoration — they dictate the procedures, tooling,
            and parts we&apos;re authorized to use. Here&apos;s what ours mean for you.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
