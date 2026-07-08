import Link from "next/link";
import { services, locations } from "@/data/seo";

/**
 * Footer
 * -----------------------------------------------------------------------------
 * Site footer with brand blurb, top service links, a few local landing-page
 * links (good for internal SEO linking), and contact details.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 5);
  const topAreas = locations.slice(0, 5);

  return (
    <footer className="mt-24 border-t divider">
      <div className="section grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-black text-white">
              A1
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Buller<span className="text-brand-600"> Auto</span>
            </span>
          </div>
          <p className="text-secondary mt-4 max-w-xs text-sm leading-relaxed">
            Certified collision, refinishing, and mechanical repair — plus fast
            Uber/TLC inspections — for drivers across the five boroughs.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {topServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/${locations[0].slug}`}
                  className="text-secondary transition-colors hover:text-brand-600"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas served */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Areas We Serve</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {topAreas.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/services/${services[0].slug}/${l.slug}`}
                  className="text-secondary transition-colors hover:text-brand-600"
                >
                  {l.name}, {l.borough}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Get in Touch</h3>
          <ul className="text-secondary mt-4 space-y-2.5 text-sm">
            <li>123 Northern Blvd, Queens, NY 11101</li>
            <li>
              <a href="tel:+17185550142" className="transition-colors hover:text-brand-600">
                (718) 555-0142
              </a>
            </li>
            <li>
              <a href="mailto:service@a1bullerauto.com" className="transition-colors hover:text-brand-600">
                service@a1bullerauto.com
              </a>
            </li>
            <li>Mon–Sat: 8:00 AM – 7:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t divider">
        <div className="section flex flex-col items-center justify-between gap-2 py-6 text-xs text-secondary sm:flex-row">
          <p>© {year} A1 Buller Auto. All rights reserved.</p>
          <p>Certified collision & mechanical repair center.</p>
        </div>
      </div>
    </footer>
  );
}
