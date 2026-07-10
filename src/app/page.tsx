"use client";
import { getUserFolders } from "@/api/getUserFolders";
import { useState } from "react";
export default function Home() {
  const [foldersJson, setFoldersJson] = useState({ folders: [] });

  const handleOnGetUserFolders = async () => {
    const data = await getUserFolders();
    setFoldersJson(data);
  };

  return (
    <main>
      Collectog
      <button onClick={handleOnGetUserFolders}>Get folders</button>
      {foldersJson?.folders && (
        <ul>
          {foldersJson.folders.map((folder: any) => (
            <li key={folder.id}>{folder.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
