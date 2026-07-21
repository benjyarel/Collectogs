import { DiscogsOauthUserIdentity } from "@/app/types";

import { DISCOGS_URL } from "@/app/constants/api";
import { authentifiedFetch } from "./utils";

export const getDiscogIdentity = async (): Promise<DiscogsOauthUserIdentity | null> => {

  const response = await authentifiedFetch(DISCOGS_URL.userIdentity);

  if (!response) {
    return null
  }

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
