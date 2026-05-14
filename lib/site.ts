// Canonical site URL. Override via NEXT_PUBLIC_SITE_URL in Vercel env when
// switching to a custom domain (e.g. https://runasolar.com.ua).
// Default points to the current deployment.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://runasolar.vercel.app";
