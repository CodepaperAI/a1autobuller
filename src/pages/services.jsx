


import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ServiceDetailModal from "@/components/ui/ServiceDetailModal";
import { SERVICE_CATALOG } from "@/data/servicesCatalog";
import { services as SEO_SERVICES } from "@/data/seo";

const COMMON_REPAIR_NEEDS = [
  { label: "Photo Estimate", href: "/estimate", description: "Send vehicle details and damage photos online." },
  { label: "ICBC Claims", href: "/icbc-claims", description: "Prepare for a collision repair assessment." },
  { label: "Paintless Dent Repair", href: "/paintless-dent-repair", description: "See when PDR may preserve the original finish." },
  { label: "Scratch Repair", href: "/scratch-repair", description: "Assess clear-coat, paint, primer, or metal damage." },
  { label: "Hail Damage Repair", href: "/hail-damage-repair", description: "Plan a complete multi-panel hail inspection." },
  { label: "Service Areas", href: "/service-areas", description: "Confirm our Burnaby location and nearby service area." },
];

/**
 * /services — Master Service Catalog
 * -----------------------------------------------------------------------------
 * Renders all 11 core service categories as informational cards with imagery,
 * descriptions, sub-items, and typical timing. Each card has a "Learn More" button; clicking it opens
 * <ServiceDetailModal>, which shows the full image + details and holds the
 * date/time slot picker and the Add to Cart action.
 *
 * Booking requests are anonymous and require no account.
 */

/* --- Small inline icon set (valid single-file SVGs, theme-aware) ---------- */
const ICONS = {
  car: "M5 17h14l-1-6-2-4H8l-2 4-1 6zM7 17v2M17 17v2M6 12h12",
  droplet: "M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z",
  disc: null, // rendered as concentric circles below
  tire: null,
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  snow: null,
  spring: "M4 6h16M6 6l12 4M6 10l12 4M6 14l12 4M4 18h16",
  engine: "M4 9h3l2-3h4l2 3h3v6h-2v3H6v-3H4z",
  exhaust: "M3 13h9a3 3 0 0 1 3 3v2M18 13h3v5h-3",
  belt: null,
  clipboard: "M9 4h6v3H9zM7 5H5v15h14V5h-2",
};

function ServiceIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  // A few icons read better as composed shapes than a single path.
  if (name === "disc") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (name === "tire") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    );
  }
  if (name === "snow") {
    return (
      <svg {...common}>
        <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
      </svg>
    );
  }
  if (name === "belt") {
    return (
      <svg {...common}>
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M7 8h10M7 16h10" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d={ICONS[name] || ICONS.clipboard} />
    </svg>
  );
}

/* --- Single catalog card: same design, now with a "Learn More" button ----- */
function ServiceCard({ service, index, onOpen }) {
  const open = () => onOpen(service);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.05 }}
      className="surface-elevated flex flex-col overflow-hidden rounded-2xl shadow-panel"
    >
      <button
        type="button"
        onClick={open}
        className="group relative aspect-[16/9] w-full overflow-hidden bg-metal-900/10 text-left"
        aria-label={`View ${service.name} details`}
      >
        <Image
          src={service.image}
          alt={`${service.name} service at A1 Buller Auto Collision`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </button>

      <div className="flex flex-1 flex-col p-6">
        {/* Header: icon + name + tagline */}
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
            <ServiceIcon name={service.icon} />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight tracking-tight">
              {service.name}
            </h2>
            <p className="mt-0.5 text-sm text-secondary">{service.tagline}</p>
          </div>
        </div>

        {/* Sub-items */}
        <ul className="mb-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-secondary">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* Typical duration; final timing is confirmed after inspection. */}
        <div className="mb-5 text-sm text-secondary">
          Typical service time: {service.duration}
        </div>

        {/* Learn More — opens the detail modal (image + details + booking) */}
        <div className="mt-auto">
          <Button onClick={open} className="w-full justify-center">
            Learn More
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  // The currently open service (null = modal closed).
  const [selected, setSelected] = useState(null);

  const handleOpen = useCallback((service) => setSelected(service), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <SeoHead
        title="Auto Body & Mechanical Services in Burnaby | A1 Buller Auto"
        description="Explore collision repair, dent and bumper repair, refinishing, brakes, tires, alignment, diagnostics, maintenance, and inspections in Burnaby, BC."
        path="/services"
      />

      <section className="section py-14 sm:py-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          className="mb-8"
        />
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Our <span className="text-brand-600">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-base text-secondary"
          >
            Tap Learn More on any service to see the full details, then pick a
            date and a 30-minute time slot to add it to your cart.
          </motion.p>
        </div>

        {/* Catalog grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_CATALOG.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onOpen={handleOpen} />
          ))}
        </div>

        <section className="mt-20 rounded-3xl surface-elevated p-6 shadow-panel sm:p-10" aria-labelledby="repair-guides-heading">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Burnaby repair information
            </p>
            <h2 id="repair-guides-heading" className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Learn about your repair before requesting an estimate
            </h2>
            <p className="mt-3 leading-relaxed text-secondary">
              These detailed service pages explain inspection steps, typical timing,
              common questions, and how to contact our shop at 7055 Buller Ave.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/burnaby`}
                className="rounded-xl border divider bg-[rgb(var(--surface))] p-4 transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                <span className="font-semibold">{service.name}</span>
                <span className="mt-1 block text-sm text-secondary">{service.short}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border divider p-6 sm:p-10" aria-labelledby="common-repairs-heading">
          <h2 id="common-repairs-heading" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Estimate and repair resources
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
            Start with the page that matches your repair need, or send photos for an initial estimate request.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMMON_REPAIR_NEEDS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl surface-elevated p-4 transition-colors hover:text-brand-600">
                <span className="font-semibold">{item.label}</span>
                <span className="mt-1 block text-sm text-secondary">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </section>

      {/* Detail modal: image + details + date/time slot + Add to Cart */}
      <ServiceDetailModal
        service={selected}
        open={Boolean(selected)}
        onClose={handleClose}
      />
    </>
  );
}
