import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildFaqJsonLd } from "@/data/faqs";

/**
 * FaqSection  ->  src/components/sections/FaqSection.jsx
 * -----------------------------------------------------------------------------
 * Accessible accordion of question/answer pairs, plus FAQPage JSON-LD so search
 * engines and AI assistants can lift the answers directly.
 *
 * Props:
 *   items    — array of { q, a } (from src/data/faqs.js)
 *   title    — optional section heading
 *   subtitle — optional intro line
 *   jsonLd   — set false if a parent page already emits the schema
 */
export default function FaqSection({ items, title = "Frequently asked questions", subtitle, jsonLd = true }) {
  const [open, setOpen] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="section py-14 sm:py-20">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }}
        />
      ) : null}

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-secondary">{subtitle}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="surface-elevated overflow-hidden rounded-2xl shadow-panel"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display text-base font-bold tracking-tight">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}