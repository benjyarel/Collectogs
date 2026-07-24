import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { USER_AGENT, DISCOGS_URL, COOKIES } from "@/app/constants/api";
import { getBaseUrl } from "@/app/lib/getBaseUrl";
export const GET = async () => {
  const { DISCOG_CONSUMER_KEY, DISCOG_CONSUMER_SECRET } = process.env;

  const url = DISCOGS_URL.oauthRequestToken;

  // PLAINTEXT signature method
  const signature = `${DISCOG_CONSUMER_SECRET}&`;

  const timestamp = Date.now().toString();
  const nonce = timestamp + Math.random().toString(36).substring(2);

  const headersList = await headers();
  const baseUrl = getBaseUrl(
    headersList.get("host"),
    headersList.get("x-forwarded-proto"),
  );
  const callbackUrl = `${baseUrl}/api/discog/auth-redirect`;

  const authHeader = `OAuth oauth_consumer_key="${DISCOG_CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_callback="${callbackUrl}", oauth_version="1.0"`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Discog's Api Error", details: errorText },
        { status: response.status },
      );
    }

    // Discogs sends back an URL-encoded (oauth_token=xxx&oauth_token_secret=yyy)
    const data = await response.text();

    // Temporary tokens for handling validation on the callback on discogs-auth-redirect route
    const cookieStore = await cookies();
    cookieStore.set(COOKIES.consumerRequestTokens, data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });

    return new NextResponse(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
