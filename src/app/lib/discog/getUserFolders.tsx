import { cookies } from "next/headers";
import { COOKIES } from "@/app/constants/api";

// Comme c'est utilisé par du client side il faut :
// la logique oAuth doit stocker les infos user et la construction de la query string dans un contexte haut
// ainsi  tout enfant pourra le consommer par la suite et n'aura plus besoin de consommer les cookies

export const getUserFolders = async () => {
  const username = "benyarel";
  console.log(process.env);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIES.userDiscogToken)?.value;
  const accessSecret = cookieStore.get(COOKIES.userDiscogSecret)?.value;

  const userTokensQuery = `oauth_token=${accessToken}&oauth_token_secret=${accessSecret}`;
  const response = await fetch(
    `https://api.discogs.com/users/${username}/collection/folders?${userTokensQuery}`,
    {
      method: "GET",
    },
  );
  const responseData = await response.json();

  return responseData;
};
