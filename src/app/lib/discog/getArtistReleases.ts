import { Artist, DiscogsMaster } from "@/app/types"
import { authentifiedFetch } from "./utils";

export const getArtistReleases = async (artistName: Artist["name"]) => {
  let nextUrl = `https://api.discogs.com/database/search?artist=${encodeURIComponent(artistName)}&type=master&format=album&per_page=100`;
  let albums: DiscogsMaster[] = [];

  while (nextUrl) {
    const response = await authentifiedFetch(nextUrl);

    if (!response) {
      return []
    }

    const jsonResponse = await response.json();

    albums = [...albums, ...jsonResponse.results];

    nextUrl = jsonResponse.pagination?.urls?.next;
  }


  return albums.filter(album =>
    album.format?.includes("Album") && !album.format?.includes("Unofficial Release")
  );

}