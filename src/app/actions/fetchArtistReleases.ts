"use server"
import { Artist } from "@/app/types";
import { getArtistReleases } from "@/app/lib/discog/getArtistReleases"

export const fetchArtistReleases = async (name: Artist['name']) => {
    const releases = await getArtistReleases(name);


    const mainReleases = releases.filter(release =>
        release.format?.includes("Album") && !release.format?.includes("Unofficial Release")
    );

    // Discogs' search endpoint can list the same master more than once.
    const uniqueReleases = Array.from(
        new Map(mainReleases.map(release => [release.id, release])).values()
    );

    return { success: true, releases: uniqueReleases }
}
