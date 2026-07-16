import { USER_AGENT, COOKIES } from "@/app/constants/api";
import { cookies } from "next/headers";
import { oAuthSignature } from "./utils";

export async function getCollectionFolders({ username }: { username: string }) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const userSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;

  if (!userToken || !userSecret) {
    throw new Error("Utilisateur non authentifié");
  }

  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const signature = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  const authorizationHeaders = oAuthSignature({
    consumerKey: DISCOG_CONSUMER_KEY || "",
    userToken,
    signature,
  });

  try {
    const response = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeaders,
          "User-Agent": USER_AGENT,
        },
      
      },
    );

    if (!response.ok) {
      return null;
    }

    const { folders } = await response.json();
    return folders;
  } catch {
    return null;
  }
}
