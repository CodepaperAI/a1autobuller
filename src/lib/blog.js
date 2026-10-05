/**
 * Uplift AI blog API helper (server-side only — keeps the token off the client).
 * Docs: list, detail. We use the server-side endpoints with a Bearer token.
 */
const BASE = "https://api.upliftai.co/api/public/v1";

function getToken() {
  return process.env.UPLIFTAI_API_TOKEN || null;
}

/** Fetch a page of blog summaries. Returns { blogs, pagination }. */
export async function listBlogs({ page = 1, limit = 12, status = "PUBLISH" } = {}) {
  const token = getToken();
  if (!token) return { blogs: [], pagination: { page, limit, total: 0, totalPages: 0 } };

  const url = `${BASE}/blogs?page=${page}&limit=${limit}&status=${status}`;
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  } catch {
    return { blogs: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  }

  if (!res.ok) {
    // Surface a clean empty state rather than crashing the build.
    return { blogs: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  }

  const json = await res.json();
  if (!json?.success) return { blogs: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  return json.data;
}

/** Fetch a single blog by slug. Returns the blog object or null. */
export async function getBlog(slug) {
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
