export const getFolderReleases = async (username: string, folderId: number) => {
  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`,
  );

  // pagination and releases
  const data = await response.json();
  return data.releases;
}