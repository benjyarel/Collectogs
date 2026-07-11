import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const oauthToken = searchParams.get("oauth_token");
  const oauthVerifier = searchParams.get("oauth_verifier");

  // Vérification de base
  if (!oauthToken || !oauthVerifier) {
    return NextResponse.json(
      { error: "Paramètres oauth_token ou oauth_verifier manquants" },
      { status: 400 },
    );
  }
  const cookieStore = await cookies();
  const oauthTokens = cookieStore.get("oauth_tokens");
  const tokens = oauthTokens
    ? Object.fromEntries(new URLSearchParams(oauthTokens.value))
    : null;

  // 2. Préparation des variables pour le POST
  const consumerKey = process.env.DISCOG_CONSUMER_KEY;
  const consumerSecret = process.env.DISCOG_CONSUMER_SECRET;
  const timestamp = Date.now().toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);
  const signature = `${consumerSecret}&${tokens?.oauth_token_secret}`;

  // Construction du header strictement selon la doc
  const authHeader = `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${nonce}", oauth_token="${tokens?.oauth_token}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_verifier="${oauthVerifier}"`;

  // 3. Requête POST vers l'URL des access tokens
  const response = await fetch("https://api.discogs.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
      "User-Agent": "Collectog/0.1", // Toujours obligatoire
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "Échec de la récupération de l'Access Token",
        details: errorText,
      },
      { status: response.status },
    );
  }
  const sessionTokens = await response.text();
  const finalTokens = Object.fromEntries(new URLSearchParams(sessionTokens));
  console.log("Response from Discogs access_token:", finalTokens);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  };

  cookieStore.set(
    "discogs_access_token",
    finalTokens.oauth_token,
    cookieOptions,
  );
  cookieStore.set(
    "discogs_access_secret",
    finalTokens.oauth_token_secret,
    cookieOptions,
  );

  return NextResponse.redirect(new URL("/", request.url));
}
