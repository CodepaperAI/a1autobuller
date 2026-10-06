import Head from "next/head";
import { LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA } from "@/data/business";

export default function ThemeHead() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2456eb" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      {[LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </Head>
  );
}
