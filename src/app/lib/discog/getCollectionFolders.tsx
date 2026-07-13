import { USER_AGENT } from "@/app/constants/api";
import { cookies } from "next/headers";

export async function getCollectionFolders({ username }: { username: string }) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("discogs_access_token")?.value;
  const userSecret = cookieStore.get("discogs_access_secret")?.value;

  if (!userToken || !userSecret) {
    throw new Error("Utilisateur non authentifié");
  }

  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);

  const signature = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  const authHeader = `OAuth oauth_consumer_key="${DISCOG_CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_token="${userToken}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_version="1.0"`;

  try {
    const response = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
          "User-Agent": USER_AGENT,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.folders;
  } catch {
    return null;
  }
}
