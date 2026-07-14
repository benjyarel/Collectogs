import { expect, it, describe } from "vitest";
import { oAuthSignature } from "./utils";

describe("oAuthSignature", () => {
  const result = oAuthSignature({
    consumerKey: "CollectogsIsHyped",
    userToken: "123VivaLalgerie",
    signature: "thisIsSignature",
  });

  it("contains all parameters in the signature ", () => {
    expect(result).toContain('oauth_consumer_key="CollectogsIsHyped"');
    expect(result).toContain('oauth_token="123VivaLalgerie"');
    expect(result).toContain('oauth_signature="thisIsSignature"');
  });

  it("provides mandatory oAuth informations", () => {
    expect(result).toMatch(/^OAuth /);
    expect(result).toContain('oauth_signature_method="PLAINTEXT"');
    expect(result).toContain('oauth_version="1.0"');
  });
});
