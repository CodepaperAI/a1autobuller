import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import {
  getService,
  getLocation,
  getAllPaths,
  buildSeo,
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

  // Unknown service or location => proper 404 (protects against junk URLs).
  if (!service || !location) {
    return { notFound: true };
  }

  const seo = buildSeo(service, location);

  // A few "nearby" and "related service" links for internal SEO linking.
  const relatedLocations = locations
    .filter((l) => l.slug !== location.slug && l.borough === location.borough)
    .slice(0, 3);
  const relatedServices = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return {
    props: {
      // Pass a serializable version of the service (drop the copy functions,
      // pre-render the location-specific intro string instead).
      service: {
        slug: service.slug,
        name: service.name,
        short: service.short,
        category: service.category,
        highlights: service.highlights,
        priceFrom: service.priceFrom,
        duration: service.duration,
        introText: service.intro(location.name),
      },
      location,
      seo,
      relatedLocations,
      relatedServices,
    },
    // Incremental Static Regeneration: refresh generated pages daily.
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
  const { requestBooking } = useAuth();

  // Declared before any early return so Hooks run in a stable order.
  const handleBook = useCallback(() => {
    requestBooking(() => router.push("/#contact"));
  }, [requestBooking, router]);

  // fallback:'blocking' means this is always resolved, but guard just in case.
  if (router.isFallback) {
    return <div className="section py-32 text-center text-secondary">Loading…</div>;
  }

  const area = `${location.name}, ${location.borough}`;

  // JSON-LD structured data for local search rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "A1 Buller Auto",
    description: seo.metaDescription,
    areaServed: area,
    telephone: "+1-718-555-0142",
    priceRange: service.priceFrom + "+",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: "NY",
      postalCode: location.zip,
      addressCountry: "US",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name },
    },
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://www.a1bullerauto.com${seo.canonical}`} />
        {/* Structured data for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

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
              <Button size="lg" variant="secondary" as="a" href="tel:+17185550142">
                Call (718) 555-0142
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
            Conveniently located for {area} and surrounding neighborhoods, our shop
            combines certified technicians, OEM-standard parts, and a lifetime
            workmanship warranty. Typical turnaround for this service is{" "}
            <strong>{service.duration}</strong>, and estimates are always free.
          </p>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide">At a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-secondary">Starting price</dt>
                <dd className="font-semibold">{service.priceFrom}</dd>
              </div>
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
