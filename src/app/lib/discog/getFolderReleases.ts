import { DiscogsRelease } from "@/app/types"
export const getFolderReleases = async (username: string, folderId: number) => {
  let allReleases: DiscogsRelease[] = [];
  let nextUrl: string = `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();

    allReleases = [...allReleases, ...data.releases];

    nextUrl = data.pagination?.urls?.next;
  }

  return allReleases;
}