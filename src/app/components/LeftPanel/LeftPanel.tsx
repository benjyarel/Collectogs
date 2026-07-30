"use client"

import { Artist, CollectionFolder } from "@/app/types";

import { FolderSelect } from "@/app/components/FolderSelect";
import { ArtistSelect } from "@/app/components/ArtistSelect";

import styles from "./LeftPanel.module.css"

export const LeftPanel = ({
    folders,
    artists,
    selectedFolderId,
    selectedArtistId,
    isLoading,
    onFolderSelect,
    onArtistSelect,
}: {
    folders: CollectionFolder[];
    artists: Artist[];
    selectedFolderId: CollectionFolder["id"] | null;
    selectedArtistId: Artist["id"] | null;
    isLoading: boolean;
    onFolderSelect: (folderId: CollectionFolder["id"]) => void;
    onArtistSelect: (artistId: Artist["id"]) => void;
}) => {
    return (
        <div className={styles["left-panel"]}>
            <FolderSelect folders={folders} selectedFolderId={selectedFolderId} onSelect={onFolderSelect} />
            {isLoading ? (
                <p>Loading artists…</p>
            ) : (
                <ArtistSelect artists={artists} selectedArtistId={selectedArtistId} onSelect={onArtistSelect} />
            )}
        </div>

    )
}
