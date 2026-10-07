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
  "/about",
  "/faq",
  "/blog",
  "/contact",
  "/privacy",
];

const SITE_UPDATED = "2026-10-06";

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
  const blogEntries = (blogData.blogs || [])
    .filter((post) => post?.slug)
    .map((post) => ({
      path: `/blog/${post.slug}`,
      lastmod: post.updatedAt || post.publishDate || SITE_UPDATED,
    }));

  const entries = new Map(
    [...STATIC_PATHS, ...servicePaths].map((path) => [path, SITE_UPDATED])
  );
  blogEntries.forEach(({ path, lastmod }) => entries.set(path, lastmod));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...entries.entries()]
  .map(
    ([path, lastmod]) =>
      `  <url><loc>${escapeXml(absoluteUrl(path))}</loc><lastmod>${escapeXml(lastmod)}</lastmod></url>`
  )
  .join("\n")}
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
