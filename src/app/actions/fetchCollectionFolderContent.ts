"use server";
export const fetchCollectionFolderContent = async (
  username: string,
  folderId: number | null,
) => {
  if (!folderId) {
    // todo : Handle collection id: 0
    console.warn("No Folder Id was provided, aborting.");
    return;
  }

  //todo : Extract URL into Constant file ? at least base url
  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`,
  );

  // pagination and releases
  const data = await response.json();

  if (data.releases) {
    // Pour garder une complexité O(n), on utilise deux Maps pour l'accumulation unique
    const uniqueReleasesMap = new Map<number, CompactRelease>();
    const uniqueArtistsMap = new Map<number, Artist>();

    for (const release of data.releases) {
      const info = release.basic_information;
      const masterId = info.master_id;

      // Extraction sécurisée de l'artiste principal
      console.log(info.artists);
      const primaryArtist = info.artists?.[0];
      const artistId = primaryArtist?.id;
      const artistName = primaryArtist?.name;

      // Remplissage de la liste des artistes uniques
      if (artistId && artistName) {
        if (!uniqueArtistsMap.has(artistId)) {
          uniqueArtistsMap.set(artistId, {
            id: artistId,
            name: artistName,
          });
        }
      }

      // Remplissage des releases uniques (on ignore si pas de master_id ou si doublon)
      if (!masterId || masterId === 0 || uniqueReleasesMap.has(masterId)) {
        continue;
      }

      uniqueReleasesMap.set(masterId, {
        artistName: artistName || "Artiste Inconnu",
        artistId: artistId || 0,
        title: info.title,
        masterId: masterId,
        masterUrl: info.master_url,
        year: info.year,
        coverImageUrl: info.cover_image,
        thumbImageUrl: info.thumb,
      });
    }

    const releases = Array.from(uniqueReleasesMap.values());

    // On convertit les artistes en tableau et on les trie par ordre alphabétique
    const artists = Array.from(uniqueArtistsMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return { success: true, releases, artists };
  }

  return { success: false, releases: [], artists: [] };

  // an array of release
  // basic_information.title
  // basic_information.master_id
  // basic_information.master_url
  // basic_information.cover_image
  // basic_information.thumb
  // basic_information.artists[0].name
  // basic_information.artists[0].id
  // todo: handle pagination
};
