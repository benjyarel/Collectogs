export const getUserFolders = async () => {
  const username = "benyarel";
  const collectogQueryString = `&token=${process.env.COLLECTOG_TOKEN}`;
  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders?${collectogQueryString}`,
    {
      method: "GET",
    },
  );
  const responseData = await response.json();

  return responseData;
};
