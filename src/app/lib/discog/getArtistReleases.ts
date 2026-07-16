import { Artist, DiscogsRelease, DiscogsMaster} from "@/app/types"
import { USER_AGENT, COOKIES } from "@/app/constants/api";
import { cookies } from "next/headers";
import { oAuthSignature } from "./utils";

export const getArtistReleases = async (artistName: string) => {
      const cookieStore = await cookies();
    const userToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
    const userSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;

  if (!userToken || !userSecret) {
    throw new Error("Utilisateur non authentifié");
  }

  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const signature = `${DISCOG_CONSUMER_SECRET}&${userSecret}`;

  const authorizationHeaders = oAuthSignature({
    consumerKey: DISCOG_CONSUMER_KEY || "",
    userToken,
    signature,
  });

  // On utilise l'endpoint Search en forçant le format "Album"
  let nextUrl = `https://api.discogs.com/database/search?artist=${encodeURIComponent(artistName)}&type=master&format=album&per_page=100`;
  let albums: any[] = [];

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: authorizationHeaders,
        "User-Agent": USER_AGENT,
      },
    });
    
    const result = await response.json();

    albums = [...albums, ...result.results];

    nextUrl = result.pagination?.urls?.next;
  }


  const pureAlbums = albums.filter(album => 
    album.format?.includes("Album") && !album.format?.includes("Unofficial Release") 
  );

  return pureAlbums

}