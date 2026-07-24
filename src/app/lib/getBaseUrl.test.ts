import { expect, it, describe } from "vitest";
import { getBaseUrl } from "./getBaseUrl";

const VERCEL_HOST = "collectogs-git-next-deployment-benjyarels-projects.vercel.app";
const LOCAL_HOST = "localhost:3000";

describe("getBaseUrl", () => {
  it("uses the given protocol when provided", () => {
    const result = getBaseUrl(VERCEL_HOST, "https");

    expect(result).toBe(`https://${VERCEL_HOST}`);
  });

  it("defaults to http for localhost when no protocol is given", () => {
    const result = getBaseUrl(LOCAL_HOST);

    expect(result).toBe(`http://${LOCAL_HOST}`);
  });

  it("defaults to https for non-localhost hosts when no protocol is given", () => {
    const result = getBaseUrl(VERCEL_HOST);

    expect(result).toBe(`https://${VERCEL_HOST}`);
  });

  it("returns undefined when no host is given", () => {
    const result = getBaseUrl(null);

    expect(result).toBeUndefined();
  });
});
