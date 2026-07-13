"use client";
import { OauthUser } from "@/app/types";
export const PageContent = ({
  discogUser,
}: {
  discogUser: OauthUser | null;
}) => {
  const getRequestToken = async () => {
    try {
      const res = await fetch("/api/discog/auth");

      const textData = await res.text();
      const params = new URLSearchParams(textData);
      const { oauth_token } = Object.fromEntries(params);

      window.location.href = `https://www.discogs.com/oauth/authorize?oauth_token=${oauth_token}`;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {!discogUser && <button onClick={getRequestToken}>Login</button>}

      <h1>Collectog</h1>
      {discogUser && (
        <div>
          <h2>Identité Discogs</h2>
          <pre>{JSON.stringify(discogUser, null, 2)}</pre>
        </div>
      )}
    </>
  );
};
