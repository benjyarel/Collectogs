"use server";
import {
  DiscogsRelease,
  Artist,
  Release,
  ReleaseCategory,
} from "@/app/types";
import { getFolderReleases } from "@/app/lib/discog/getFolderReleases";
import { artistFromDiscogs, releaseFromDiscogs } from "./mappers";

export const fetchCollectionFolderContent = async (
  username: string,
  folderId: number | null,
) => {

  if (folderId === null || folderId === undefined) {
    console.warn("No Folder Id was provided, aborting.");
    return { success: false, releases: [], artists: [] };
  }

  const releases = await getFolderReleases(username, folderId)

  if (!releases) {
    return { success: false, releases: [], artists: [] };
  }




  const { uniqueReleasesMap, uniqueArtistsMap } = releases.reduce(
    (acc, release) => {

      const {
        id: releaseId,
        artists,
        master_id,
      } = release.basic_information;

      const { id: artistId } = artists?.[0];

      if (artistId) {
        if (!acc.uniqueArtistsMap.has(artistId)) {
          acc.uniqueArtistsMap.set(artistId, artistFromDiscogs(release));
        }
      }

      const hasMaster = !!master_id && master_id !== 0;
      const releaseKey = hasMaster ? `master-${master_id}` : `release-${releaseId}`;

      if (acc.uniqueReleasesMap.has(releaseKey)) {
        return acc;
      }

      acc.uniqueReleasesMap.set(releaseKey, releaseFromDiscogs(release, hasMaster));

      return acc;
    },
    {
      uniqueReleasesMap: new Map<string, Release>(),
      uniqueArtistsMap: new Map<number, Artist>(),
    },
  );

  return {
    success: true,
    releases: Array.from<Release>(uniqueReleasesMap.values()),
    artists: Array.from<Artist>(uniqueArtistsMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  };


};
