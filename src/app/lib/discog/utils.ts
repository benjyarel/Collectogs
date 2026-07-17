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

export const authentifiedFetch = async (url: string, options?: RequestInit) => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const userSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;
  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const signature = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  if (!userToken || !userSecret) {
    throw new Error("Unauthorized user token");
  }

  const authorizationHeaders = oAuthSignature({
    consumerKey: DISCOG_CONSUMER_KEY || "",
    userToken,
    signature,
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
