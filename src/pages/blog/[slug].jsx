import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { listBlogs, getBlog } from "@/lib/blog";

/**
 * /blog/[slug] — Single blog post. Pre-renders known slugs, and uses
 * fallback: "blocking" so new posts render on first request (ISR).
 */
export async function getStaticPaths() {
  const data = await listBlogs({ page: 1, limit: 100, status: "PUBLISH" });
  const paths = (data.blogs || []).map((b) => ({ params: { slug: b.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) return { notFound: true };
  return { props: { blog }, revalidate: 60 * 60 };
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ blog }) {
  const meta = blog.meta || {};
  const canonical = meta.ogUrl || `https://www.a1bullerauto.com/blog/${blog.slug}`;

  return (
    <>
      <Head>
        <title>{meta.seoTitle || `${blog.title} | A1 Buller Auto`}</title>
        <meta name="description" content={meta.seoDescription || blog.excerpt || ""} />
        {Array.isArray(meta.keywords) && meta.keywords.length ? (
          <meta name="keywords" content={meta.keywords.join(", ")} />
        ) : null}
        <meta property="og:title" content={meta.ogTitle || blog.title} />
        <meta property="og:description" content={meta.ogDescription || blog.excerpt || ""} />
        <meta property="og:type" content={meta.ogType || "article"} />
        {blog.featuredImage ? <meta property="og:image" content={blog.featuredImage} /> : null}
        <link rel="canonical" href={canonical} />
      </Head>

      <article className="section py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span className="px-2">/</span>
            <Link href="/blog" className="hover:text-brand-600">Blog</Link>
            <span className="px-2">/</span>
            <span className="text-[rgb(var(--text-primary))]">{blog.title}</span>
          </nav>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {Array.isArray(blog.categories) && blog.categories[0] ? (
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {blog.categories[0]}
              </span>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight">
              {blog.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary">
              {blog.authorName ? <span>By {blog.authorName}</span> : null}
              {blog.publishDate ? (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={blog.publishDate}>{formatDate(blog.publishDate)}</time>
                </>
              ) : null}
              {blog.customFields?.readingTime ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{blog.customFields.readingTime}</span>
                </>
              ) : null}
            </div>
          </motion.header>

          {blog.featuredImage ? (
            <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600/20 to-metal-800/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          {/* Content is HTML from the API. */}
          <div
            className="prose-blog mt-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />

          {Array.isArray(blog.tags) && blog.tags.length ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t divider pt-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full surface-elevated px-3 py-1 text-xs font-medium text-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-10">
            <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:underline">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}