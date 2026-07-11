"use client";
import { getUserFolders } from "@/app/lib/discog/getUserFolders";
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
        {foldersJson.folders.map((folder: any) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </>
  );
};
