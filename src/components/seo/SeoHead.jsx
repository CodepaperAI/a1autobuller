import Head from "next/head";
import { absoluteUrl, BUSINESS } from "@/data/business";

const DEFAULT_IMAGE = absoluteUrl("/hero-auto-body-shop.jpg");

export default function SeoHead({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  imageAlt = `${BUSINESS.name} auto body repair shop in Burnaby`,
  keywords,
  jsonLd,
  noindex = false,
}) {
  const canonical = absoluteUrl(path);
  const schemas = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length ? (
        <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />
      ) : null}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {schemas.map((schema, index) => (
        <script
          key={`${schema["@type"] || "schema"}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </Head>
  );
}
