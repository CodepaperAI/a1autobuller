import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import { BUSINESS } from "@/data/business";

const PRINCIPLES = [
  {
    title: "Inspect before promising",
    body: "Photos help us prepare, but the repair plan is based on the vehicle, the damage found, and the procedures that apply.",
  },
  {
    title: "Explain the repair",
    body: "Customers receive a clear description of the work and an opportunity to ask questions before authorized repairs begin.",
  },
  {
    title: "Document and verify",
    body: "Structural, body, refinishing, and mechanical work is checked at the stages relevant to the repair.",
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About A1 Buller Auto Collision",
    url: `${BUSINESS.siteUrl}/about`,
    mainEntity: { "@id": `${BUSINESS.siteUrl}/#business` },
  };

  return (
    <>
      <SeoHead
        title="About Our Burnaby Collision Repair Shop | A1 Buller"
        description="Learn about A1 Buller Auto Collision, our Burnaby repair facility, customer-first repair process, services, and collision repair credentials."
        path="/about"
        jsonLd={aboutSchema}
      />

      <section className="section py-14 sm:py-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
          className="mb-8"
        />
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Burnaby collision and mechanical repair
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Repair guidance you can understand and work you can verify.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-secondary">
            A1 Buller Auto Collision serves drivers from our facility at{" "}
            {BUSINESS.address.street} in {BUSINESS.address.city}. Our work spans
            collision and structural repair, refinishing, aluminum and EV repair,
            wheel alignment, brakes, tires, diagnostics, and maintenance.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="font-display text-3xl font-extrabold tracking-tight">
            How we approach a repair
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <article key={principle.title} className="rounded-2xl border divider p-6">
                <h3 className="font-display text-lg font-bold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Repair capabilities and credentials
            </h2>
            <p className="mt-3 leading-relaxed text-secondary">
              The shop presents its ICBC Repair Network, I-CAR, OEM collision,
              aluminum-repair, and related credentials on the certifications page.
              Each repair still depends on the vehicle, damage, authorization, and
              procedures applicable to that job.
            </p>
            <Link href="/certifications" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
              Review our repair credentials →
            </Link>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Information reviewed by the shop
            </h2>
            <p className="mt-3 leading-relaxed text-secondary">
              Service pages and repair guides are published by the A1 Buller Auto
              Collision team to explain common inspection and repair considerations.
              They provide general information, not claim-specific insurance,
              engineering, or legal advice.
            </p>
            <Link href="/blog" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
              Read our collision repair guides →
            </Link>
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-brand-600 p-7 text-white sm:p-10">
          <h2 className="font-display text-2xl font-extrabold">Talk with the Burnaby shop</h2>
          <p className="mt-2 max-w-2xl text-white/85">
            Send photos and vehicle details for an initial conversation, or call
            to arrange an in-person assessment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} href="/contact" variant="secondary">Request an estimate</Button>
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center rounded-xl border border-white/50 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </section>
      </section>
    </>
  );
}
