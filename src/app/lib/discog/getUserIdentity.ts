import { OauthUser } from "@/app/types";
import { cookies } from "next/headers";
import { COOKIES, DISCOGS_URL, USER_AGENT } from "@/app/constants/api";
import { oAuthSignature } from "./utils";
export const getDiscogIdentity = async (): Promise<OauthUser | null> => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const userSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;

  if (!userToken || !userSecret) {
    console.warn("Unidentified user");
    return null;
  }

  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;
  const signature = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  const authorizationHeaders = oAuthSignature({
    consumerKey: DISCOG_CONSUMER_KEY || "",
    userToken,
    signature,
  });

  const response = await fetch(DISCOGS_URL.userIdentity, {
    headers: {
      Authorization: authorizationHeaders,
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
