import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { BUSINESS } from "@/data/business";

export default function PrivacyPage() {
  return (
    <>
      <SeoHead
        title="Privacy Policy | A1 Buller Auto Collision Burnaby"
        description="How A1 Buller Auto Collision handles contact details, vehicle information, photos, appointment requests, and website service data."
        path="/privacy"
      />

      <article className="section py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
            className="mb-8"
          />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-secondary">Effective October 6, 2026</p>

          <div className="prose-blog mt-8 leading-relaxed">
            <p>
              This policy explains how {BUSINESS.legalName} handles information
              submitted through this website. If you have a privacy question,
              contact us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>{" "}
              or <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>.
            </p>

            <h2>Information you choose to provide</h2>
            <p>
              Contact and appointment forms may collect your name, email address,
              phone number, message, vehicle or service details, preferred
              appointment information, and files such as vehicle-damage photos or
              PDFs. Please do not upload unrelated confidential information.
            </p>

            <h2>How we use submitted information</h2>
            <p>
              We use it to answer questions, assess the requested service, prepare
              for an appointment, communicate about estimates or repairs, prevent
              form abuse, and keep appropriate business records. We do not sell
              personal information submitted through the website.
            </p>

            <h2>Service providers and storage</h2>
            <p>
              Website hosting and email-delivery providers process information as
              needed to operate the site and deliver requests to the shop. Website
              infrastructure may also create routine security and diagnostic logs,
              such as IP address, browser information, requested URL, and timestamp.
            </p>

            <h2>Analytics and cookies</h2>
            <p>
              The website does not currently load Google Analytics. Essential
              browser storage may be used for features such as theme preference
              and the appointment-request cart. If optional analytics is introduced,
              this policy and any required consent controls should be updated before
              collection begins.
            </p>

            <h2>Retention and deletion requests</h2>
            <p>
              Information is retained only as reasonably needed for communication,
              service, security, record-keeping, and applicable legal obligations.
              To request access, correction, or deletion, contact the shop using the
              details above. Some records may need to be retained where required or
              reasonably necessary.
            </p>

            <h2>Third-party links</h2>
            <p>
              Links to maps, social networks, messaging services, insurers, and
              other websites are governed by those providers&apos; own privacy terms.
            </p>

            <h2>Policy updates</h2>
            <p>
              We may update this policy when the website or its service providers
              change. The effective date at the top identifies the current version.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
