import { USER_AGENT, COOKIES } from "@/app/constants/api";
import { cookies } from "next/headers";

const timestamp = () => {
  // must return timestamp in seconds to satisfy Discogs API for authenticated requests
  return Math.floor(Date.now() / 1000).toString();
};

const nonce = () => {
  return Math.random().toString(36).substring(2);
};

/**
 * Generates the OAuth 1.0 Authorization header for Discogs API requests.
 *
 * @param consumerKey - The Collectogs application's consumer key.
 * @param userToken - The user's access token.
 * @param signature - The pre-calculated signature string.
 * @returns The full "Authorization" header string for requests.
 */

export const oAuthSignature = ({
  consumerKey,
  userToken,
  signature,
}: Record<string, string>): string => {
  return `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${nonce()}", oauth_token="${userToken}", oauth_signature="${signature}", oauth_timestamp="${timestamp()}", oauth_signature_method="PLAINTEXT", oauth_version="1.0"`;
};

/**
 * Thrown by {@link authentifiedFetch} when the user's OAuth token or secret
 * is missing from cookies, i.e. the user isn't logged in yet.
 */
export class MissingDiscogsAuthError extends Error {
  constructor() {
    super("Missing Discogs OAuth tokens");
    this.name = "MissingDiscogsAuthError";
  }
}

/**
 * Performs an authenticated fetch against the Discogs API using OAuth 1.0a.
 *
 * Reads the current user's OAuth token and secret from cookies, combines them
 * with the app's consumer credentials to build the OAuth authorization header,
 * and issues the request with that header plus the required User-Agent.
 *
 * @param url - The Discogs API endpoint to request.
 * @param options - Optional fetch options (method, body, headers, etc.).
 *   Any provided headers are merged with the Authorization and User-Agent headers.
 * @returns A promise resolving to the fetch `Response`.
 * @throws {MissingDiscogsAuthError} If the user's OAuth token or secret is missing from cookies.
 */

export const authentifiedFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const userSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;
  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  if (!userToken || !userSecret) {
    throw new MissingDiscogsAuthError();
  }

  const signingKey = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  const authorizationHeaders = oAuthSignature({
    consumerKey: DISCOG_CONSUMER_KEY || "",
    userToken,
    signature: signingKey,
  });
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: authorizationHeaders,
      "User-Agent": USER_AGENT,
    },
  })
}
