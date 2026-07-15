"use server";
import {
  DiscogsPagination,
  DiscogsRelease,
  Artist,
  Release,
} from "@/app/types";

export interface DiscogsCollectionResponse {
  pagination: DiscogsPagination;
  releases: DiscogsRelease[];
}

export const fetchCollectionFolderContent = async (
  username: string,
  folderId: number | null,
) => {
  if (!folderId) {
    console.warn("No Folder Id was provided, aborting.");
    return;
  }

  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`,
  );

  // pagination and releases
  const data = await response.json();

  if (data.releases) {
    const { uniqueReleasesMap, uniqueArtistsMap } = data.releases.reduce(
      (
        acc: {
          uniqueArtistsMap: Map<number, Artist>;
          uniqueReleasesMap: Map<number, Release>;
        },
        release: DiscogsRelease,
      ) => {
        const {
          artists,
          title,
          master_url,
          master_id,
          year,
          cover_image,
          thumb,
        } = release.basic_information;

        const primaryArtist = artists?.[0];
        const artistId = primaryArtist?.id;
        const artistName = primaryArtist?.name;

        if (artistId && artistName) {
          if (!acc.uniqueArtistsMap.has(artistId)) {
            acc.uniqueArtistsMap.set(artistId, {
              id: artistId,
              name: artistName,
            });
          }
        }

        if (
          !master_id ||
          master_id === 0 ||
          acc.uniqueReleasesMap.has(master_id)
        ) {
          return acc;
        }

        acc.uniqueReleasesMap.set(master_id, {
          artistName: artistName || "Artiste Inconnu",
          artistId: artistId || 0,
          title: title,
          masterId: master_id,
          masterUrl: master_url,
          year: year,
          coverImageUrl: cover_image,
          thumbImageUrl: thumb,
        });

        return acc;
      },
      {
        uniqueReleasesMap: new Map<number, Release>(),
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
  }

  return { success: false, releases: [], artists: [] };

  // todo: handle pagination
};
