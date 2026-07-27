import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FaqSection from "@/components/sections/FaqSection";
import { FAQS, FAQ_GROUPS, faqsByGroup, buildFaqJsonLd } from "@/data/faqs";

/**
 * /faq — Answer hub
 * -----------------------------------------------------------------------------
 * Targets the questions people actually ask search engines and AI assistants
 * (see src/data/faqs.js). One FAQPage JSON-LD block covers every answer on the
 * page, so assistants can quote us directly.
 */
export default function FaqPage() {
  const jsonLd = buildFaqJsonLd(FAQS);

  return (
    <>
      <Head>
        <title>Collision Repair &amp; Insurance Claim FAQs | A1 Buller Auto Collision</title>
        <meta
          name="description"
          content="Straight answers on auto insurance claims in Canada, frame and structural damage, total-loss decisions, and what I-CAR Gold Class certification actually means."
        />
        <link rel="canonical" href="https://www.a1bullerautocollision.com/faq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <section className="section pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-wide text-brand-600"
          >
            Answers from our shop floor
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Collision repair questions, answered
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 text-lg leading-relaxed text-secondary"
          >
            Insurance claims, frame damage, total-loss decisions, and repair
            standards — explained plainly by Red Seal technicians in Burnaby, BC.
          </motion.p>
        </div>
      </section>

      {/* One section per topic group; schema is emitted once above. */}
      {FAQ_GROUPS.map((group) => (
        <FaqSection
          key={group.id}
          title={group.title}
          items={faqsByGroup(group.id)}
          jsonLd={false}
        />
      ))}

      {/* Closing CTA */}
      <section className="section pb-20">
        <div className="surface-elevated mx-auto max-w-3xl rounded-2xl p-8 text-center shadow-panel">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Still not sure where you stand?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-secondary">
            Send us photos of the damage and we&apos;ll tell you honestly what
            it needs — and whether a claim is worth filing. Free, no obligation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} href="/contact" size="lg">
              Get a free estimate
            </Button>
            <Button as="a" href="tel:+16044234524" variant="outline" size="lg">
              Call (604) 423-4524
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}