import Head from "next/head";
import { LOCAL_BUSINESS_SCHEMA } from "@/data/business";

export default function ThemeHead() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2456eb" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
    </Head>
  );
}
