"use server"
import { Artist } from "@/app/types";
import { getArtistReleases } from "@/app/lib/discog/getArtistReleases"
export const fetchArtistReleases = async (artist: Artist) => {
    const data = await getArtistReleases(artist.name);
    return data
}
