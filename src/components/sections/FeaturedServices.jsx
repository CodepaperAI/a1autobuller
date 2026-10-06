import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { SERVICE_CATALOG } from "@/data/servicesCatalog";

const FEATURED_IDS = [
  "auto-body-repair",
  "engine-diagnostics",
  "brake-system",
  "tire-wheel",
];

const FEATURED_SERVICES = FEATURED_IDS.map((id) =>
  SERVICE_CATALOG.find((service) => service.id === id)
).filter(Boolean);

const SEO_PATHS = {
  "auto-body-repair": "/services/auto-body-repair/burnaby",
  "brake-system": "/services/brake-repair/burnaby",
  "tire-wheel": "/services/tire-services/burnaby",
};

export default function FeaturedServices() {
  return (
    <section className="section py-20 sm:py-28">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Collision and mechanical care
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explore our most requested services.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            Review the work we handle, choose a preferred appointment time, and
            send your request directly to our Burnaby team.
          </p>
        </div>
        <Button as={Link} href="/services" variant="outline">
          View all services
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_SERVICES.map((service, index) => (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group surface-elevated overflow-hidden rounded-2xl shadow-panel"
          >
            <Link href={SEO_PATHS[service.id] || "/services"} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-metal-900/10">
                <Image
                  src={service.image}
                  alt={`${service.name} service at A1 Buller Auto Collision`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 font-display text-lg font-bold text-white">
                  {service.name}
                </span>
              </div>
              <p className="p-4 text-sm leading-relaxed text-secondary">
                {service.tagline}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
