"use client";

import { FoldersList } from "@/components/FoldersList";
export default function Home() {
  const testFolder = {
    id: 9434181,
    name: "test_private",
    count: 1,
    resource_url:
      "https://api.discogs.com/users/benyarel/collection/folders/9434181",
  };

  return (
    <main>
      <h1>Collectog</h1>
      <FoldersList />
    </main>
  );
}
