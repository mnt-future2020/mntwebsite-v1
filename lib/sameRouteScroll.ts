/**
 * Clicking a link to the page you are already on is a no-op for the router, so
 * nothing scrolls and the click feels broken. Every nav entry uses this to take
 * the reader back to the top instead, which is what they were asking for.
 *
 * Logo already did this for the home link; this is the same behaviour applied
 * to the rest of the nav rather than left as a special case.
 */
export function scrollTopIfSameRoute(href: string) {
  if (typeof window === "undefined") return;
  const target = href.split("#")[0].replace(/\/$/, "") || "/";
  const here = window.location.pathname.replace(/\/$/, "") || "/";
  if (target === here) window.scrollTo({ top: 0, behavior: "smooth" });
}
