"use client"

import { ChangeEvent } from "react";
import { Artist, CollectionFolder } from "@/app/types";
import styles from "./LeftPanel.module.css"
import { FolderSelect } from "@/app/components/FolderSelect";
import { ArtistSelect } from "@/app/components/ArtistSelect";

export const LeftPanel = ({
    folders,
    artists,
    selectedArtistId,
    isLoading,
    onFolderChange,
    onArtistSelect,
}: {
    folders: CollectionFolder[];
    artists: Artist[];
    selectedArtistId: Artist["id"] | null;
    isLoading: boolean;
    onFolderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onArtistSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    return (
        <div className={"section-block " + styles["left-panel"]}>
            <FolderSelect folders={folders} onChange={onFolderChange} />
            {isLoading ? (
                <p>Loading artists…</p>
            ) : (
                <ArtistSelect artists={artists} selectedArtistId={selectedArtistId} onChange={onArtistSelect} />
            )}
        </div>

    )
}