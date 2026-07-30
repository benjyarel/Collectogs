"use client"

import { Artist } from "@/app/types";

import { List } from "@/app/components/List";

import styles from "./ArtistSelect.module.css";

export const ArtistSelect = ({
    artists,
    selectedArtistId,
    onSelect,
}: {
    artists: Artist[];
    selectedArtistId: Artist["id"] | null;
    onSelect: (artistId: Artist["id"]) => void;
}) => {
    if (!artists.length) {
        return <p>Select a folder to see its artists.</p>;
    }

    return (
        <div className="field">
            <h2 className={styles.title}>Artists</h2>
            <List.Box>
                {artists.map(({ id, name }) => (
                    <List.Item key={id} isSelected={id === selectedArtistId} onSelect={() => onSelect(id)}>
                        <span className={styles.label}>{name}</span>
                    </List.Item>
                ))}
            </List.Box>
        </div>
    )
}
