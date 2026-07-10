import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { listBlogs } from "@/lib/blog";

/**
 * /blog — Blog listing. Statically generated, revalidated hourly (ISR).
 */
export async function getStaticProps() {
  const data = await listBlogs({ page: 1, limit: 12, status: "PUBLISH" });
  return {
    props: { blogs: data.blogs || [] },
    revalidate: 60 * 60, // refresh hourly
  };
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndex({ blogs }) {
  return (
    <>
      <Head>
        <title>Blog | A1 Buller Auto</title>
        <meta
          name="description"
          content="Auto body, collision, and vehicle-care tips from the A1 Buller Auto team."
        />
        <link rel="canonical" href="https://www.a1bullerauto.com/blog" />
      </Head>

      <section className="section py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Our <span className="text-brand-600">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-base text-secondary"
          >
            Tips, guides, and news on collision repair, refinishing, and keeping
            your vehicle road-ready.
          </motion.p>
        </div>

        {blogs.length === 0 ? (
          <p className="mt-16 text-center text-secondary">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post, i) => (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: (i % 3) * 0.05 }}
                className="surface-elevated flex flex-col overflow-hidden rounded-2xl shadow-panel"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-brand-600/20 to-metal-800/20">
                    {post.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  {Array.isArray(post.categories) && post.categories[0] ? (
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      {post.categories[0]}
                    </span>
                  ) : null}

                  <h2 className="mt-2 font-display text-lg font-bold leading-tight tracking-tight">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-600">
                      {post.title}
                    </Link>
                  </h2>

                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-secondary">
                      {post.excerpt}
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-center gap-3 text-xs text-secondary">
                    {post.authorName ? <span>{post.authorName}</span> : null}
                    {post.publishDate ? (
                      <>
                        <span aria-hidden>·</span>
                        <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                      </>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}