import { DiscogsOauthUserIdentity } from "@/app/types";

import { DISCOGS_URL } from "@/app/constants/api";
import { authentifiedFetch, MissingDiscogsAuthError } from "./utils";

export const getDiscogIdentity = async (): Promise<DiscogsOauthUserIdentity | null> => {
  try {
    const response = await authentifiedFetch(DISCOGS_URL.userIdentity);

    if (!response.ok) {
      console.error(
        "Discogs API returned an error:",
        response.status,
        response.statusText,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof MissingDiscogsAuthError) {
      return null;
    }
    throw error;
  }
};
