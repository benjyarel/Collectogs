/**
 * Resolves the app's own base URL (protocol + host) across environments.
 *
 * On Vercel, `VERCEL_URL` is the unique per-deployment URL (changes on every
 * commit), so it's only correct for previews. In production it would point at
 * a specific deployment instead of the stable domain, so `VERCEL_PROJECT_PRODUCTION_URL`
 * is used instead. Locally, neither is set, so `APP_URL` is used as a fallback.
 *
 * @param env - Defaults to `process.env`; overridable for testing.
 * @returns The base URL (e.g. "https://collectogs.vercel.app"), or undefined
 *   if none of the expected environment variables are set.
 */
type BaseUrlEnv = {
  [key: string]: string | undefined;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  APP_URL?: string;
};

export const getBaseUrl = (env: BaseUrlEnv = process.env): string | undefined => {
  const { VERCEL_ENV, VERCEL_URL, VERCEL_PROJECT_PRODUCTION_URL, APP_URL } = env;

  const host =
    VERCEL_ENV === "production" ? VERCEL_PROJECT_PRODUCTION_URL : VERCEL_URL;

  return host ? `https://${host}` : APP_URL;
};
