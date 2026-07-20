"use client"

import { ChangeEvent } from 'react'
import { Artist } from "@/app/types";

export const ArtistSelect = ({
    artists,
    selectedArtistId,
    onChange,
}: {
    artists: Artist[];
    selectedArtistId: number | null;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    if (!artists.length) {
        return <p>Select a folder to see its artists.</p>;
    }

    return (
        <>
            <label htmlFor="artists">Artist:</label>
            <select
                id="artists"
                name="artists"
                size={Math.min(artists.length, 10)}
                value={selectedArtistId ?? ""}
                onChange={onChange}
            >
                {artists.map(({ id, name }) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    )
}
