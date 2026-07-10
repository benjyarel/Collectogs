"use client";

import { FoldersList } from "@/app/components/FoldersList";
export default function Home() {
  const getRequestToken = async () => {
    try {
      const res = await fetch("/api/discog-auth");

      const data = await res.text();
      console.log("Token reçu :", data);
      //TODO : parse string
      // todo redirect to discogs auth page with token
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main>
      <button onClick={getRequestToken}>Get Auth Token</button>
      <h1>Collectog</h1>
      <FoldersList />
    </main>
  );
}
