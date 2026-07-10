import Link from "next/link";
import { services, locations } from "@/data/seo";

/**
 * Footer
 * -----------------------------------------------------------------------------
 * Site footer with brand blurb, social links, top service links, local
 * landing-page links, and contact details.
 */

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com/a1bullerautocollision",
    // Facebook icon
    path: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.5l.5-3H12V6.5a.5.5 0 0 1 .5-.5H15V3z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/a1bullerautocollision",
    path: null,
  },
];

function SocialIcon({ label, path }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  if (label === "Instagram") {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d={path} />
    </svg>
  );
}

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
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Services
          </h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            {topServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}/${locations[0].slug}`}
                  className="text-secondary transition-colors hover:text-brand-600"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        {/* Contact */}
       <div>
  <h3 className="text-sm font-semibold uppercase tracking-wide">
    Get in Touch
  </h3>

  <ul className="mt-4 space-y-4 text-sm text-secondary">
    {/* Address */}
    <li className="flex items-start gap-3">
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 21s-6-5.33-6-11a6 6 0 1112 0c0 5.67-6 11-6 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>

      <span>7055 Buller Ave, Burnaby, BC V5J 4S1, Canada</span>
    </li>

    {/* Phone */}
    <li className="flex items-center gap-3">
      <svg
        className="h-5 w-5 shrink-0 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72l.35 2.43a2 2 0 01-.57 1.71l-1.2 1.2a16 16 0 006.59 6.59l1.2-1.2a2 2 0 011.71-.57l2.43.35A2 2 0 0122 16.92z" />
      </svg>

      <a
        href="tel:+16044455057"
        className="transition-colors hover:text-brand-600"
      >
        604 445 5057
      </a>
    </li>

    {/* Email */}
    <li className="flex items-center gap-3">
      <svg
        className="h-5 w-5 shrink-0 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M4 6l8 7 8-7" />
      </svg>

      <a
        href="mailto:a1bullerautocollision@gmail.com"
        className="transition-colors hover:text-brand-600"
      >
        a1bullerautocollision@gmail.com
      </a>
    </li>

    {/* Hours */}
    <li className="flex items-center gap-3">
      <svg
        className="h-5 w-5 shrink-0 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>

      <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
    </li>
  </ul>
</div>

        {/* Follow Us */}
       <div>
  <h3 className="text-sm font-semibold uppercase tracking-wide">
    Follow Us
  </h3>

  <div className="mt-4 space-y-3">
    {SOCIAL_LINKS.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="flex items-center gap-3 text-secondary transition-colors hover:text-brand-600"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl surface-elevated">
          <SocialIcon label={social.label} path={social.path} />
        </div>

        <div>
          <p className="font-medium">{social.label}</p>
          <p className="text-xs text-secondary">
            {social.label === "Facebook"
              ? "@a1bullerautocollision"
              : "@a1bullerautocollision"}
          </p>
        </div>
      </a>
    ))}
  </div>
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