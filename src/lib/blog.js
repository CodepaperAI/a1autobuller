/**
 * Uplift AI blog API helper (server-side only — keeps the token off the client).
 * Docs: list, detail. We use the server-side endpoints with a Bearer token.
 */
import { LOCAL_ARTICLES, getLocalArticle } from "@/data/articles";

const BASE = "https://api.upliftai.co/api/public/v1";

function getToken() {
  return process.env.UPLIFTAI_API_TOKEN || null;
}

function localPage(page, limit) {
  const start = (page - 1) * limit;
  return {
    blogs: LOCAL_ARTICLES.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: LOCAL_ARTICLES.length,
      totalPages: Math.ceil(LOCAL_ARTICLES.length / limit),
    },
  };
}

/** Fetch a page of blog summaries. Returns { blogs, pagination }. */
export async function listBlogs({ page = 1, limit = 12, status = "PUBLISH" } = {}) {
  const token = getToken();
  if (!token) return localPage(page, limit);

  const url = `${BASE}/blogs?page=${page}&limit=${limit}&status=${status}`;
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  } catch {
    return localPage(page, limit);
  }

  if (!res.ok) {
    return localPage(page, limit);
  }

  const json = await res.json();
  if (!json?.success) return localPage(page, limit);

  const remoteBlogs = json.data?.blogs || [];
  const combined = [...LOCAL_ARTICLES, ...remoteBlogs].filter(
    (post, index, all) => post?.slug && all.findIndex((item) => item?.slug === post.slug) === index
  );
  const start = (page - 1) * limit;
  return {
    blogs: combined.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: combined.length,
      totalPages: Math.ceil(combined.length / limit),
    },
  };
}

/** Fetch a single blog by slug. Returns the blog object or null. */
export async function getBlog(slug) {
  const local = getLocalArticle(slug);
  if (local) return local;

  const token = getToken();
  if (!token) return null;

  const url = `${BASE}/blog/${encodeURIComponent(slug)}`;
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  } catch {
    return null;
  }

  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.success) return null;
  return json.data.blog;
}
