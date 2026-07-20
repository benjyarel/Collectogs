"use client"

import { ChangeEvent } from 'react'
import { CollectionFolder } from "@/app/types";

export const FolderSelect = ({ folders, onChange }: { folders: CollectionFolder[]; onChange: (e: ChangeEvent<HTMLSelectElement>) => void }) => {
    return (
        <>
            <label htmlFor="folders">Folder:</label>
            <select onChange={onChange} name="collection folders" id="folders" defaultValue="">
                <option value="" disabled>Select a folder</option>
                {folders?.map(({ id, name, count }) => {
                    return (<option key={id} value={id}>
                        {name} ({count})
                    </option>)
                })}
            </select>
        </>
    )
}