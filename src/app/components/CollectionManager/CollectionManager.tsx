"use client"

import { ChangeEvent, useState, useTransition } from "react";
import { fetchCollectionFolderContent } from "@/app/actions/fetchCollectionFolderContent";
import { Artist, CollectionFolder, DiscogUser, Release } from '@/app/types';
import { Content } from '@/app/components/Content'
import { LeftPanel } from "@/app/components/LeftPanel"

export const CollectionManager = ({ username, folders }: { username: DiscogUser["username"]; folders: CollectionFolder[] }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition();

    const onFolderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const folderId = Number(e.target.value);
        setSelectedArtistId(null);
        startTransition(async () => {
            const result = await fetchCollectionFolderContent(username, folderId);
            setArtists(result?.artists ?? []);
            setReleases(result?.releases ?? []);
        });
    };

    const onArtistSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedArtistId(Number(e.target.value) || null);
    };

    const artistReleases = selectedArtistId
        ? releases.filter((release) => release.artistId === selectedArtistId)
        : releases;

    return (
        <>
            <LeftPanel
                folders={folders}
                artists={artists}
                selectedArtistId={selectedArtistId}
                isLoading={isPending}
                onFolderChange={onFolderChange}
                onArtistSelect={onArtistSelect}
            />
            <Content releases={artistReleases} />
        </>

    )
}