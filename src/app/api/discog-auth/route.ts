import { NextResponse } from "next/server";
export const GET = async () => {
  const key = process.env.DISCOG_CONSUMER_KEY;
  const secret = process.env.DISCOG_CONSUMER_SECRET;

  const url = "https://api.discogs.com/oauth/request_token";

  // PLAINTEXT signature method
  const signature = `${secret}&`;

  const timestamp = Date.now().toString();
  // TODO : verify pattern for nonce
  const nonce = timestamp + Math.random().toString(36).substring(2);

  // TODO: when workflow completed, fullfill the callback URL
  const callbackUrl = "";

  // Le header complet sur UNE SEULE ligne avec les nouveaux paramètres requis
  const authHeader = `OAuth oauth_consumer_key="${key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_callback="${callbackUrl}", oauth_version="1.0"`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Collectog/0.1",
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Erreur API Discogs", details: errorText },
        { status: response.status },
      );
    }

    // Discogs renvoie souvent une chaîne URL-encoded (ex: oauth_token=xxx&oauth_token_secret=yyy)
    const data = await response.text();

    return new NextResponse(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
};
