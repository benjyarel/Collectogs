import {DiscogsRelease} from "@/app/types"
export const getFolderReleases = async (username: string, folderId: number) => {
let allReleases: DiscogsRelease[] = [];
  let nextUrl: string | undefined = `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`;

  while (nextUrl) {
    // TODO: Enhance typing
    const response = await fetch(nextUrl);
    const data = await response.json();

    allReleases = [...allReleases, ...data.releases];

    nextUrl = data.pagination?.urls?.next;
  }

  return allReleases;
}