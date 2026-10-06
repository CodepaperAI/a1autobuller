/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/services/auto-painting/burnaby",
        destination: "/auto-paint-repair",
        permanent: true,
      },
      {
        source:
          "/services/:service/:location(vancouver|new-westminster|richmond|coquitlam)",
        destination: "/services/:service/burnaby",
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
