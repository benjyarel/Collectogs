"use server";
import {
  DiscogsRelease,
  Artist,
  Release,
  ReleaseCategory,
} from "@/app/types";
import { getFolderReleases } from "@/app/lib/discog/getFolderReleases";

export const fetchCollectionFolderContent = async (
  username: string,
  folderId: number | null,
) => {
  if (!folderId) {
    console.warn("No Folder Id was provided, aborting.");
    return;
  }

  const releases = await getFolderReleases(username, folderId)

  if (!releases) {
    return { success: false, releases: [], artists: [] };
  }




  const { uniqueReleasesMap, uniqueArtistsMap } = releases.reduce(
    (
      acc: {
        uniqueArtistsMap: Map<number, Artist>;
        uniqueReleasesMap: Map<string, Release>;
      },
      release: DiscogsRelease,
    ) => {
      const {
        id: releaseId,
        artists,
        title,
        master_url,
        master_id,
        year,
        cover_image,
        thumb,
      } = release.basic_information;

      const { id: artistId, name: artistName } = artists?.[0];

      if (artistId) {
        if (!acc.uniqueArtistsMap.has(artistId)) {
          acc.uniqueArtistsMap.set(artistId, {
            id: artistId,
            name: artistName,
          });
        }
      }

      const hasMaster = !!master_id && master_id !== 0;
      const category: ReleaseCategory = hasMaster ? "master" : "uncategorized";
      const dedupKey = hasMaster ? `master-${master_id}` : `release-${releaseId}`;

      if (acc.uniqueReleasesMap.has(dedupKey)) {
        return acc;
      }

      acc.uniqueReleasesMap.set(dedupKey, {
        id: releaseId,
        category,
        artistName: artistName || "Unknown Artist",
        artistId: artistId || 0,
        title,
        masterId: master_id,
        masterUrl: master_url,
        year,
        coverImageUrl: cover_image,
        thumbImageUrl: thumb,
      });

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
