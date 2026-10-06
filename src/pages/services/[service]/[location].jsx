import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SeoHead from "@/components/seo/SeoHead";
import { BUSINESS } from "@/data/business";
import {
  getService,
  getLocation,
  getAllPaths,
  buildSeo,
  serviceFaqs,
  services,
  locations,
} from "@/data/seo";

/**
 * PROGRAMMATIC SEO ENGINE — /services/[service]/[location]
 * -----------------------------------------------------------------------------
 * This single file generates a unique, statically rendered landing page for
 * every SERVICE × LOCATION combination. Each page ships its own <title>,
 * meta description, H1, body copy, JSON-LD LocalBusiness schema, and internal
 * links — the raw material of local lead generation.
 */

// -- 1) Enumerate every valid path at build time -----------------------------
export async function getStaticPaths() {
  return {
    // getAllPaths() = services × locations (see src/data/seo.js)
    paths: getAllPaths(),
    // 'blocking' lets newly added service/location combos render on first hit
    // and then be cached — so marketing can expand the matrix without a full
    // rebuild. Any unknown combo is handled by the notFound guard below.
    fallback: "blocking",
  };
}

// -- 2) Resolve data + build SEO metadata for the requested combo ------------
export async function getStaticProps({ params }) {
  const service = getService(params.service);
  const location = getLocation(params.location);

  if (!service || !location) {
    return { notFound: true };
  }

  const seo = buildSeo(service, location);

  const relatedLocations = locations
    .filter((l) => l.slug !== location.slug)
    .slice(0, 3);

  const relatedServices = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3)
    // Strip the intro() function — props must be JSON-serializable.
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      short: s.short,
      category: s.category,
      duration: s.duration,
    }));

  return {
    props: {
      service: {
        slug: service.slug,
        name: service.name,
        short: service.short,
        category: service.category,
        highlights: service.highlights,
        duration: service.duration,
        introText: service.intro(location.name),
        faqs: serviceFaqs[service.slug] || [],
      },
      location,
      seo,
      relatedLocations,
      relatedServices,
    },
    revalidate: 60 * 60 * 24,
  };
}

// -- 3) Render ----------------------------------------------------------------
export default function LocalServicePage({
  service,
  location,
  seo,
  relatedLocations,
  relatedServices,
}) {
  const router = useRouter();

  // Declared before any early return so Hooks run in a stable order.
  const handleBook = useCallback(() => {
    router.push("/services");
  }, [router]);

  // fallback:'blocking' means this is always resolved, but guard just in case.
  if (router.isFallback) {
    return <div className="section py-32 text-center text-secondary">Loading…</div>;
  }

  const area = `${location.name}, ${location.region}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: seo.metaDescription,
    serviceType: service.short,
    url: `${BUSINESS.siteUrl}${seo.canonical}`,
    image: `${BUSINESS.siteUrl}/hero-auto-body-shop.jpg`,
    areaServed: {
      "@type": "City",
      name: area,
    },
    provider: {
      "@id": `${BUSINESS.siteUrl}/#business`,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BUSINESS.siteUrl}/contact`,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "appointments",
      },
    },
  };

  const faqSchema = service.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS.siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: `${service.name} for ${location.name}` },
    ],
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.metaDescription}
        path={seo.canonical}
        image={`${BUSINESS.siteUrl}/hero-auto-body-shop.jpg`}
        imageAlt={`${service.name} at A1 Buller Auto Collision in Burnaby`}
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />

      {/* Hero band */}
      <section className="relative overflow-hidden border-b divider">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-blueprint bg-[length:40px_40px] opacity-70 dark:bg-blueprint-dark"
        />
        <div className="section py-20 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span className="px-2">/</span>
            <Link href="/services" className="hover:text-brand-600">Services</Link>
            <span className="px-2">/</span>
            <span className="text-[rgb(var(--text-primary))]">{service.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              {service.category} · {area}
            </span>
            {/* Dynamic H1 assembled per service + location */}
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {seo.heading}
            </h1>
            <p className="text-secondary mt-4 text-lg leading-relaxed">{seo.subheading}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={handleBook}>
                Book {service.name} in {location.name}
              </Button>
              <Button size="lg" variant="secondary" as="a" href={`tel:${BUSINESS.phone}`}>
                Call {BUSINESS.phoneDisplay}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="section grid grid-cols-1 gap-12 py-16 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg leading-relaxed"
          >
            {service.introText}
          </motion.p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight">
            Why {location.name} drivers choose A1 Buller Auto
          </h2>
          <ul className="mt-5 space-y-3">
            {service.highlights.map((h) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{h}</span>
              </motion.li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-bold tracking-tight">
            {service.name} near {area}
          </h2>
          <p className="text-secondary mt-3 leading-relaxed">
            Our repair facility is at {BUSINESS.address.street} in {BUSINESS.address.city}, convenient for
            drivers from {area} and surrounding communities. We use documented
            repair procedures and provide a clear estimate before work begins.
            Typical turnaround for this service is <strong>{service.duration}</strong>.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight">
            What to expect from your appointment
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["1", "Tell us what happened", "Call or send the vehicle details and photos so our team can prepare for the assessment."],
              ["2", "Inspect and document", `We inspect the vehicle and document the work required for ${service.name}.`],
              ["3", "Review the estimate", "You receive a clear repair plan before authorized work begins."],
              ["4", "Complete and verify", "The work is completed, checked, and explained before the vehicle is returned."],
            ].map(([number, title, body]) => (
              <li key={number} className="rounded-2xl border divider p-5">
                <span className="text-sm font-bold text-brand-600">STEP {number}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{body}</p>
              </li>
            ))}
          </ol>

          {service.faqs.length ? (
            <section className="mt-12" aria-labelledby="service-faq-heading">
              <h2 id="service-faq-heading" className="text-2xl font-bold tracking-tight">
                {service.name} questions
              </h2>
              <div className="mt-5 space-y-4">
                {service.faqs.map((faq) => (
                  <article key={faq.q} className="rounded-2xl border divider p-5">
                    <h3 className="font-display text-lg font-bold">{faq.q}</h3>
                    <p className="mt-2 leading-relaxed text-secondary">{faq.a}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-12 rounded-2xl bg-brand-600 p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">
              Request an assessment for {service.name}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
              Send photos online or call our Burnaby shop. We&apos;ll review the vehicle,
              explain the next steps, and confirm availability before the appointment.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} href="/contact" variant="secondary">
                Send photos for an estimate
              </Button>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide">At a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-secondary">Turnaround</dt>
                <dd className="font-semibold">{service.duration}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-secondary">Service area</dt>
                <dd className="font-semibold">{location.name}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-secondary">Estimate</dt>
                <dd className="font-semibold text-brand-600">Free</dd>
              </div>
            </dl>
            <Button className="mt-5 w-full" onClick={handleBook}>
              Book now
            </Button>
          </Card>

          {/* Related services in same category */}
          {relatedServices.length > 0 ? (
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-wide">Related services</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}/${location.slug}`}
                      className="text-secondary transition-colors hover:text-brand-600"
                    >
                      {s.name} in {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          {/* Nearby areas for the same service */}
          {relatedLocations.length > 0 ? (
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-wide">Also serving nearby</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {relatedLocations.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/services/${service.slug}/${l.slug}`}
                      className="text-secondary transition-colors hover:text-brand-600"
                    >
                      {service.name} in {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </aside>
      </section>
    </>
  );
}
