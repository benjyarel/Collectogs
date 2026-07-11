"use client";
import { getUserFolders } from "@/app/lib/discog/getUserFolders";
import { CollectionFolder } from "@/app/types";
import { useState } from "react";
export const FoldersList = () => {
  const [foldersJson, setFoldersJson] = useState({ folders: [] });

  const handleOnGetUserFolders = async () => {
    const data = await getUserFolders();
    setFoldersJson(data);
  };
  return (
    <>
      <button onClick={handleOnGetUserFolders}>Get folders</button>
      <ul>
        {foldersJson.folders.map(({ id, name, count }: CollectionFolder) => (
          <li key={id}>
            {name} ({count})
          </li>
        ))}
      </ul>
    </>
  );
};
