"use client"

import { Suspense, useState, useTransition } from "react";

import { fetchCollectionFolderContent } from "@/app/actions/fetchCollectionFolderContent";
import { fetchArtistReleases, type ArtistReleasesResult } from "@/app/actions/fetchArtistReleases";

import { Artist, CollectionFolder, DiscogsUser, Release } from '@/app/types';

import { Content } from '@/app/components/Content'
import { LeftPanel } from "@/app/components/LeftPanel"

const emptyArtistReleases: Promise<ArtistReleasesResult> = Promise.resolve({ success: true, releases: [] });

export const CollectionManager = ({ username, folders }: { username: DiscogsUser["username"]; folders: CollectionFolder[] }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<CollectionFolder["id"] | null>(null);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [artistReleasesPromise, setArtistReleasesPromise] = useState(emptyArtistReleases);
    const [isFolderPending, startFolderTransition] = useTransition();
    const [, startArtistTransition] = useTransition();

    const selectArtist = (artist: Artist | null) => {
        setSelectedArtist(artist);
        startArtistTransition(() => {
            setArtistReleasesPromise(artist ? fetchArtistReleases(artist.name) : emptyArtistReleases);
        });
    };

    const onFolderSelect = (folderId: CollectionFolder["id"]) => {
        setSelectedFolderId(folderId);
        setSelectedArtist(null);
        startFolderTransition(async () => {
            const result = await fetchCollectionFolderContent(username, folderId);
            setArtists(result.artists);
            setReleases(result.releases);
            selectArtist(result.artists[0] ?? null);
        });
    };

    const onArtistSelect = (artistId: Artist["id"]) => {
        const artist = artists.find((a) => a.id === artistId) ?? null;
        selectArtist(artist);
    };

    const artistReleases = selectedArtist
        ? releases.filter((release) => release.artistId === selectedArtist.id)
        : releases;

    return (
        <>
            <LeftPanel
                folders={folders}
                artists={artists}
                selectedFolderId={selectedFolderId}
                selectedArtistId={selectedArtist?.id ?? null}
                isLoading={isFolderPending}
                onFolderSelect={onFolderSelect}
                onArtistSelect={onArtistSelect}
            />
            <Suspense fallback={<p>Loading albums…</p>}>
                <Content releases={artistReleases} allReleasesPromise={artistReleasesPromise} />
            </Suspense>
        </>

    )
}