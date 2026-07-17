"use client";
import { fetchCollectionFolders } from "@/app/actions/fetchCollectionFolders";
import { fetchCollectionFolderContent } from "@/app/actions/fetchCollectionFolderContent";
import { fetchArtistReleases } from '@/app/actions/fetchArtistReleases'
import { Artist, CollectionFolder } from "@/app/types";
import { useState } from "react";
export const FoldersList = ({ username }: { username: string }) => {
  const [folders, setFolders] = useState<CollectionFolder[]>([]);
  const [folderReleases, setFolderReleases] = useState<any[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleOnGetUserFolders = async () => {
    const { success, data } = await fetchCollectionFolders(username);
    if (success) {
      setFolders(data);
    }
  };

  const handleOnFolderClick = async (folderId: number) => {
    const response = await fetchCollectionFolderContent(username, folderId);

    if (!response) return;

    const { success, releases, artists } = response;

    if (success) {
      setFolderReleases(releases);
      setArtists(artists);
    }
  };

  const handleOnArtistClick = async (artist: Artist) => {

    const response = await fetchArtistReleases(artist)

  }

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
          <li onClick={() => handleOnArtistClick(artist)} key={artist.id}>{artist.name}</li>
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
