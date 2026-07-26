import { Artist, DiscogsRelease, Release } from "@/app/types";

export const releaseFromDiscogs = (discogRelease: DiscogsRelease, hasMaster: boolean): Release => {
    const {
        id: releaseId,
        artists,
        title,
        master_url,
        master_id,
        year,
        cover_image,
        thumb,
    } = discogRelease.basic_information;
    const { id: artistId, name: artistName } = artists?.[0] ?? {};

    return {
        id: releaseId,
        category: hasMaster ? "master" : "uncategorized",
        artistName: artistName || "Unknown Artist",
        artistId: artistId || 0,
        title,
        masterId: master_id,
        masterUrl: master_url,
        year,
        coverImageUrl: cover_image,
        thumbImageUrl: thumb,
    }
};

export const artistFromDiscogs = (discogRelease: DiscogsRelease): Artist => {
    const { artists } = discogRelease.basic_information;
    const { id: artistId, name: artistName } = artists?.[0] ?? {};

    return {
        id: artistId || 0,
        name: artistName || "Unknown Artist",
    }
}
