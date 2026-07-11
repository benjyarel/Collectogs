import { cookies } from "next/headers";
import { COOKIES, DISCOGS_URL, USER_AGENT } from "@/app/constants/api";
export const getDiscogIdentity = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const accessSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;

  if (!accessToken || !accessSecret) {
    console.warn("Unidentified user");
    return null;
  }

  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const timestamp = Date.now().toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);

  const signature = `${DISCOG_CONSUMER_SECRET}&${accessSecret}`;
  const authHeader = `OAuth oauth_consumer_key="${DISCOG_CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_token="${accessToken}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}"`;

  const response = await fetch(DISCOGS_URL.userIdentity, {
    headers: {
      Authorization: authHeader,
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    console.error(
      "Discogs API returned an error:",
      response.status,
      response.statusText,
    );
  }
  const userData = await response.json();

  return userData;
};
