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

  // Comme indiqué dans TA doc : juste le consumer_secret suivi d'un "&"
  const signature = `${consumerSecret}&${tokens?.oauth_token_secret}`;

  console.log("oauthTokens from sessionStorage:", oauthTokens);

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

  // 4. Traitement de la réponse de Discogs
  const data = await response.text();
  const finalTokens = Object.fromEntries(new URLSearchParams(data));

  // Pour l'instant, on se contente de renvoyer le JSON en réponse
  // (Dans un second temps, tu pourras intercepter ça pour stocker finalTokens en BDD)
  return NextResponse.json(
    {
      message: "Authentification réussie",
      tokens: finalTokens,
    },
    { status: 200 },
  );
}
