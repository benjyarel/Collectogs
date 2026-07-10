export const getFolderContent = async () => {
  const collectogToken = "wHcuozTzOFXQrtQEpoRFOkmHOSQCHIdGnitjccSZ";
  const collectogQueryString = `&token=${collectogToken}`;
  const username = "benyarel";
  const url = `/users/${username}/collection/folders/9434181?${collectogQueryString}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const responseData = await response.json();
  return responseData;
};
