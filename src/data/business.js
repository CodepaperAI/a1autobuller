export const BUSINESS = {
  name: "A1 Buller Auto Collision",
  legalName: "A1 Buller Auto Collision Ltd.",
  siteUrl: "https://www.a1bullerautocollision.com",
  phone: "+16044234524",
  phoneDisplay: "(604) 423-4524",
  email: "a1bullerautocollision@gmail.com",
  address: {
    street: "7055 Buller Ave",
    city: "Burnaby",
    region: "BC",
    postalCode: "V5J 4S1",
    country: "CA",
  },
  geo: {
    latitude: 49.21916,
    longitude: -122.9779,
  },
  hoursDisplay: "Mon–Sat: 9:00 AM–6:00 PM; Sun: by appointment",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=7055%20Buller%20Ave%2C%20Burnaby%2C%20BC%20V5J%204S1",
  socialProfiles: [
    "https://facebook.com/a1bullerautocollision",
    "https://instagram.com/a1bullerautocollision",
  ],
};

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BUSINESS.siteUrl}${normalized}`;
}

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${BUSINESS.siteUrl}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: BUSINESS.siteUrl,
  description:
    "Burnaby auto body and collision repair shop providing ICBC claim support, structural repair, refinishing, aluminum and EV repair, and mechanical service.",
  logo: absoluteUrl("/logo-light.png"),
  image: absoluteUrl("/hero-auto-body-shop.jpg"),
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  hasMap: BUSINESS.mapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Vancouver" },
    { "@type": "City", name: "New Westminster" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Coquitlam" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    contactType: "customer service",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Auto body, collision, and mechanical services",
    itemListElement: [
      "ICBC collision repair",
      "Auto body repair",
      "Dent and bumper repair",
      "Frame straightening",
      "Auto painting and refinishing",
      "Aluminum and EV repair",
      "Wheel alignment",
      "Brake repair",
      "Tire service",
      "Vehicle diagnostics",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  sameAs: BUSINESS.socialProfiles,
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS.siteUrl}/#website`,
  url: BUSINESS.siteUrl,
  name: BUSINESS.name,
  alternateName: "A1 Buller Auto",
  inLanguage: "en-CA",
  publisher: { "@id": `${BUSINESS.siteUrl}/#business` },
};
