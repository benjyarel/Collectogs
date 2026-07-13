"use client";
import { fetchCollectionFolders } from "@/app/actions/fetchCollectionFolders";
import { CollectionFolder } from "@/app/types";
import { useState } from "react";
export const FoldersList = ({ username }: { username: string }) => {
  const [folders, setFolders] = useState<CollectionFolder[]>([]);

  const handleOnGetUserFolders = async () => {
    const { success, data } = await fetchCollectionFolders(username);
    if (success) {
      setFolders(data);
    }
  };
  return (
    <>
      <button onClick={handleOnGetUserFolders}>Get folders</button>
      <ul>
        {folders.map(({ id, name, count }: CollectionFolder) => (
          <li key={id}>
            {name} ({count})
          </li>
        ))}
      </ul>
    </>
  );
};
