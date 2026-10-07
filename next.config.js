/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/book",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/m/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/auto-painting/burnaby",
        destination: "/auto-paint-repair",
        permanent: true,
      },
      {
        source:
          "/services/auto-painting/:location(astoria|flushing|jamaica|long-island-city)",
        destination: "/auto-paint-repair",
        permanent: true,
      },
      {
        source:
          "/services/:service(auto-body-repair|frame-racking|tesla-aluminum-repair|icbc-collision-repair|wheel-alignment|ac-repair|brake-repair|tire-services)/:location(astoria|flushing|jamaica|long-island-city)",
        destination: "/services/:service/burnaby",
        permanent: true,
      },
      {
        source:
          "/services/uber-inspection/:location(astoria|flushing|jamaica|long-island-city)",
        destination: "/services",
        permanent: true,
      },
      {
        source:
          "/services/:service/:location(vancouver|new-westminster|richmond|coquitlam)",
        destination: "/services/:service/burnaby",
        permanent: true,
      },
      {
        source: "/blog/how-much-does-collision-repair-cost",
        destination: "/services/auto-body-repair/burnaby",
        permanent: true,
      },
      {
        source: "/blog/icbc-claim-after-collision-repair",
        destination: "/blog/icbc-collision-repair-process-burnaby",
        permanent: true,
      },
      {
        source: "/blog/icbc-collision-repair-what-to-expect",
        destination: "/blog/icbc-collision-repair-process-burnaby",
        permanent: true,
      },
      {
        source: "/blog/icbc-platinum-partner-benefits-burnaby",
        destination: "/blog/icbc-collision-repair-process-burnaby",
        permanent: true,
      },
      {
        source: "/blog/burnaby-collision-repair-timeline",
        destination: "/blog/icbc-collision-repair-process-burnaby",
        permanent: true,
      },
      {
        source: "/blog/collision-repair-process-after-an-accident",
        destination: "/blog/icbc-collision-repair-process-burnaby",
        permanent: true,
      },
      {
        source: "/blog/how-auto-body-shops-match-paint-colour",
        destination: "/auto-paint-repair",
        permanent: true,
      },
      {
        source: "/blog/how-paint-matching-works-after-collision",
        destination: "/auto-paint-repair",
        permanent: true,
      },
      {
        source: "/blog/how-to-get-auto-body-repair-estimate",
        destination: "/estimate",
        permanent: true,
      },
      {
        source: "/blog/what-to-send-for-collision-repair-estimate",
        destination: "/estimate",
        permanent: true,
      },
    ];
  },

  // Allow requests from other devices on your local network during development
  allowedDevOrigins: [
    "http://192.168.1.9:3000",
    "http://localhost:3000",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
