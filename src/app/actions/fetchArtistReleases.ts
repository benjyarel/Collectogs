"use server"
import { Artist, DiscogsMaster } from "@/app/types";
import { getArtistReleases } from "@/app/lib/discog/getArtistReleases"

export const fetchArtistReleases = async (name: Artist['name']) => {
    const releases = await getArtistReleases(name);

    if (!releases) {
        return { success: false, releases: [] };
    }

    const mainReleases = releases.filter(release =>
        release.format?.includes("Album") && !release.format?.includes("Unofficial Release")
    );

    const uniqueReleasesMap = mainReleases.reduce((map, release) => {
        if (!map.has(release.id)) {
            map.set(release.id, release);
        }
        return map;
    }, new Map<number, DiscogsMaster>());

    return { success: true, releases: Array.from(uniqueReleasesMap.values()) }
}
