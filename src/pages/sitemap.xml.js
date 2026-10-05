import { absoluteUrl } from "@/data/business";
import { getAllPaths } from "@/data/seo";
import { listBlogs } from "@/lib/blog";

const STATIC_PATHS = [
  "/",
  "/services",
  "/car-dent-repair",
  "/bumper-repair",
  "/auto-paint-repair",
  "/certifications",
  "/faq",
  "/blog",
  "/contact",
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function getServerSideProps({ res }) {
  const servicePaths = getAllPaths().map(
    ({ params }) => `/services/${params.service}/${params.location}`
  );

  const blogData = await listBlogs({ page: 1, limit: 100, status: "PUBLISH" });
  const blogPaths = (blogData.blogs || [])
    .filter((post) => post?.slug)
    .map((post) => `/blog/${post.slug}`);

  const urls = [...new Set([...STATIC_PATHS, ...servicePaths, ...blogPaths])];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
