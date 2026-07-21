"use server"
import { Artist } from "@/app/types";
import { getArtistReleases } from "@/app/lib/discog/getArtistReleases"

export const fetchArtistReleases = async (artist: Artist) => {
    const releases = await getArtistReleases(artist.name);


    const mainReleases = releases.filter(release =>
        release.format?.includes("Album") && !release.format?.includes("Unofficial Release")
    );

    return { success: true, releases: mainReleases }
}
