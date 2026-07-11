"use client";
import { useState } from "react";

import { FoldersList } from "@/app/components/FoldersList";
export default function Home() {
  const [identity, setIdentity] = useState(null);
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
  const getIdentity = async () => {
    try {
      const res = await fetch("/api/discog-identity");
      if (!res.ok) {
        throw new Error("Utilisateur non connecté");
      }
      const data = await res.json();
      setIdentity(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main>
      <button onClick={getRequestToken}>Login</button>
      <button onClick={getIdentity}>Display identity</button>
      <h1>Collectog</h1>
      {identity && (
        <div>
          <h2>Identité Discogs</h2>
          <pre>{JSON.stringify(identity, null, 2)}</pre>
        </div>
      )}

      <FoldersList />
    </main>
  );
}
