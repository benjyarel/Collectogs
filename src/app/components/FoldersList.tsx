"use client";
import { fetchUserFolders } from "@/app/actions/fetchuserFolders";
import { CollectionFolder } from "@/app/types";
import { useState } from "react";
export const FoldersList = () => {
  const [folders, setFolders] = useState<CollectionFolder[]>([]);

  const handleOnGetUserFolders = async () => {
    const action = await fetchUserFolders("benyarel");
    if (action.success) {
      setFolders(action.data);
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
