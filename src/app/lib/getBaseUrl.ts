/**
 * Resolves the app's own base URL (protocol + host) from the incoming request.
 *
 * Deriving it from the request's `host` header (rather than e.g. `VERCEL_URL`)
 * guarantees it always matches the origin the browser is actually on — which
 * matters here because OAuth callback cookies are host-scoped: if the callback
 * pointed at a different host (like Vercel's per-deployment URL, distinct from
 * a branch alias or custom domain the user is browsing), the cookie set before
 * redirecting to Discogs would never come back on the callback request.
 *
 * @param host - The request's `host` header (e.g. "collectogs.vercel.app").
 * @param protocol - The request's protocol, typically read from the
 *   `x-forwarded-proto` header. Defaults to "http" for localhost, "https" otherwise.
 * @returns The base URL (e.g. "https://collectogs.vercel.app"), or undefined if no host is given.
 */
export const getBaseUrl = (
  host: string | null | undefined,
  protocol?: string | null,
): string | undefined => {
  if (!host) {
    return undefined;
  }

  const resolvedProtocol = protocol ?? (host.startsWith("localhost") ? "http" : "https");

  return `${resolvedProtocol}://${host}`;
};
