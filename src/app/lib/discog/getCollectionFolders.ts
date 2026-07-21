import { authentifiedFetch } from "./utils";

export async function getCollectionFolders({ username }: { username: string }) {

  try {
    const response = await authentifiedFetch(
      `https://api.discogs.com/users/${username}/collection/folders`,
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
