import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USER_AGENT, DISCOGS_URL, COOKIES } from "@/app/constants/api";
export async function GET(request: Request) {
  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;
  const { searchParams } = new URL(request.url);

  const oauthToken = searchParams.get("oauth_token");
  const oauthVerifier = searchParams.get("oauth_verifier");

  if (!oauthToken || !oauthVerifier) {
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  }
  const cookieStore = await cookies();
  const collectogRequestTokens = cookieStore.get(COOKIES.consumerRequestTokens);
  const tokens = collectogRequestTokens
    ? Object.fromEntries(new URLSearchParams(collectogRequestTokens.value))
    : { oauth_token: "", oauth_token_secret: "" };

  const timestamp = Date.now().toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);

  const signature = `${DISCOG_CONSUMER_SECRET}&${tokens.oauth_token_secret}`;
  const authHeader = `OAuth oauth_consumer_key="${DISCOG_CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_token="${tokens.oauth_token}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_verifier="${oauthVerifier}"`;

  const response = await fetch(DISCOGS_URL.oauthAccessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
      "User-Agent": USER_AGENT,
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

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };

  cookieStore.set(
    COOKIES.userDiscogToken,
    finalTokens.oauth_token,
    cookieOptions,
  );
  cookieStore.set(
    COOKIES.userDiscogSecret,
    finalTokens.oauth_token_secret,
    cookieOptions,
  );

  return NextResponse.redirect(new URL("/", request.url));
}
