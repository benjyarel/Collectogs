"use server";
import {
  DiscogsRelease,
  Artist,
  Release,
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

  if(!releases) {
     return { success: false, releases: [], artists: [] };
  }




    const { uniqueReleasesMap, uniqueArtistsMap } = releases.reduce(
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

        const {id: artistId, name: artistName} = artists?.[0];
    

        if (artistId) {
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
  

};
