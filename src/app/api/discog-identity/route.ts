// src/app/api/discogs-identity/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // 1. Récupérer les tokens définitifs depuis nos cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("discogs_access_token")?.value;
  const accessSecret = cookieStore.get("discogs_access_secret")?.value;

  if (!accessToken || !accessSecret) {
    return NextResponse.json(
      { error: "Utilisateur non connecté" },
      { status: 401 },
    );
  }

  // 2. Préparation des variables OAuth
  const consumerKey = process.env.DISCOG_CONSUMER_KEY;
  const consumerSecret = process.env.DISCOG_CONSUMER_SECRET;

  const timestamp = Date.now().toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);

  // La signature combine ton secret d'app ET le secret définitif de l'utilisateur
  const signature = `${consumerSecret}&${accessSecret}`;

  // Construction du header (sans le verifier cette fois-ci !)
  const authHeader = `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${nonce}", oauth_token="${accessToken}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}"`;

  try {
    // 3. Appel à l'API Discogs
    const response = await fetch("https://api.discogs.com/oauth/identity", {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "User-Agent": "Collectog/0.1",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Erreur Discogs", details: errorText },
        { status: response.status },
      );
    }

    // L'endpoint identity renvoie du vrai JSON !
    const userData = await response.json();

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
