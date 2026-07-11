"use client";
export const PageContent = ({ discogUser }: { discogUser: any }) => {
  const getRequestToken = async () => {
    try {
      const res = await fetch("/api/discog/auth");
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
    <>
      <button onClick={getRequestToken}>Login</button>

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
