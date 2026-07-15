"use client";
import { fetchCollectionFolders } from "@/app/actions/fetchCollectionFolders";
import { fetchCollectionFolderContent } from "@/app/actions/fetchCollectionFolderContent";
import { Artist, CollectionFolder } from "@/app/types";
import { useState } from "react";
export const FoldersList = ({ username }: { username: string }) => {
  const [folders, setFolders] = useState<CollectionFolder[]>([]);
  const [folderReleases, setFolderReleases] = useState([]);
  const [artists, setArtists] = useState([]);

  const handleOnGetUserFolders = async () => {
    const { success, data } = await fetchCollectionFolders(username);
    if (success) {
      setFolders(data);
    }
  };

  const handleOnFolderClick = async (folderId: number) => {
    const { success, releases, artists } = await fetchCollectionFolderContent(
      username,
      folderId,
    );

    if (success) {
      setFolderReleases(releases);
      setArtists(artists);
    }
  };

  return (
    <>
      <button onClick={handleOnGetUserFolders}>Get folders</button>
      <ul>
        {folders.map(({ id, name, count }: CollectionFolder) => (
          <li key={id} onClick={() => handleOnFolderClick(id)}>
            {name} ({count})
          </li>
        ))}
      </ul>
      <h2>Available Artists</h2>
      <ul>
        {artists.map((artist: Artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
      <h2>Selected folder data ({folderReleases.length})</h2>
      <ul>
        {folderReleases.map(({ masterId, artistName, title, year }) => (
          <li key={masterId}>
            {artistName}: {title} (<i>{year}</i>)
          </li>
        ))}
      </ul>
    </>
  );
};
