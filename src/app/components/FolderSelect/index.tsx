"use client"

import { CollectionFolder } from "@/app/types";
import { ChangeEvent } from "react"
export const FolderSelect = ({ folders }: { folders: CollectionFolder[] }) => {
    const handleOnChangeFolder = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)

    }
    return (
        <>
            <label htmlFor="folders">Folder:</label>
            <select onChange={handleOnChangeFolder} name="collection folders" id="folders">
                {folders.map(({ id, name, count }) => {
                    return (<option key={id} value={id}>
                        {name} ({count})
                    </option>)
                })}
            </select>
        </>
    )
}