"use client"

import { ChangeEvent } from 'react'
import { CollectionFolder } from "@/app/types";

export const FolderSelect = ({ folders }: { folders: CollectionFolder[] }) => {
    const onFoldersChange = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        return e.target.value;
    }
    return (
        <>
            <label htmlFor="folders">Folder:</label>
            <select onChange={onFoldersChange} name="collection folders" id="folders">
                {folders.map(({ id, name, count }) => {
                    return (<option key={id} value={id}>
                        {name} ({count})
                    </option>)
                })}
            </select>
        </>
    )
}