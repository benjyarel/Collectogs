"use client";

import { FoldersList } from "@/app/components/FoldersList";
export default function Home() {
  const getRequestToken = async () => {
    try {
      const res = await fetch("/api/discog-auth");
      const textData = await res.text();
      const params = new URLSearchParams(textData);
      const data = Object.fromEntries(params);

      const discogsAuthUrl = `https://www.discogs.com/oauth/authorize?oauth_token=${data.oauth_token}`;
      window.location.href = discogsAuthUrl;
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
