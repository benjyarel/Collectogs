export const getUserFolders = async () => {
  const username = "benyarel";
  const collectogToken = "wHcuozTzOFXQrtQEpoRFOkmHOSQCHIdGnitjccSZ";
  const collectogQueryString = `&token=${collectogToken}`;
  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders?${collectogQueryString}`,
    {
      method: "GET",
    },
  );
  const responseData = await response.json();

  return responseData;
};
