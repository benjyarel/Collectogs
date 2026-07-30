"use client"

import { ChangeEvent, useState, useTransition } from "react";

import { fetchCollectionFolderContent } from "@/app/actions/fetchCollectionFolderContent";
import { fetchArtistReleases } from "@/app/actions/fetchArtistReleases";

import { Artist, CollectionFolder, DiscogsMaster, DiscogsUser, Release } from '@/app/types';

import { Content } from '@/app/components/Content'
import { LeftPanel } from "@/app/components/LeftPanel"

export const CollectionManager = ({ username, folders }: { username: DiscogsUser["username"]; folders: CollectionFolder[] }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [allArtistReleases, setAllArtistReleases] = useState<DiscogsMaster[]>([]);
    const [isPending, startTransition] = useTransition();

    const selectArtist = async (artist: Artist | null) => {
        setSelectedArtist(artist);
        setAllArtistReleases([]);
        if (!artist) return;

        const result = await fetchArtistReleases(artist.name);
        setAllArtistReleases(result.releases);
    };

    const onFolderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const folderId = Number(e.target.value);
        setSelectedArtist(null);
        startTransition(async () => {
            const result = await fetchCollectionFolderContent(username, folderId);
            setArtists(result.artists);
            setReleases(result.releases);
            await selectArtist(result.artists[0] ?? null);
        });
    };

    const onArtistSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const artistId = Number(e.target.value) || null;
        const artist = artists.find((a) => a.id === artistId) ?? null;
        startTransition(async () => {
            await selectArtist(artist);
        });
    };

    const artistReleases = selectedArtist
        ? releases.filter((release) => release.artistId === selectedArtist.id)
        : releases;

    return (
        <>
            <LeftPanel
                folders={folders}
                artists={artists}
                selectedArtistId={selectedArtist?.id ?? null}
                isLoading={isPending}
                onFolderChange={onFolderChange}
                onArtistSelect={onArtistSelect}
            />
            <Content releases={artistReleases} allReleases={allArtistReleases} />
        </>

    )
}