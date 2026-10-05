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
  logo: absoluteUrl("/logo-light.png"),
  image: absoluteUrl("/logo-light.png"),
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: "$$",
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
  areaServed: ["Burnaby", "Vancouver", "New Westminster", "Richmond", "Coquitlam"],
  sameAs: BUSINESS.socialProfiles,
};
