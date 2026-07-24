import { expect, it, describe } from "vitest";
import { getBaseUrl } from "./getBaseUrl";

const PREVIEW_HOST = "collectogs-46ghi8v5x-benjyarels-projects.vercel.app";
const PRODUCTION_HOST = "collectogs.vercel.app";
const LOCAL_URL = "http://localhost:3000";

describe("getBaseUrl", () => {
  it("uses VERCEL_PROJECT_PRODUCTION_URL in production", () => {
    const result = getBaseUrl({
      VERCEL_ENV: "production",
      VERCEL_URL: PREVIEW_HOST,
      VERCEL_PROJECT_PRODUCTION_URL: PRODUCTION_HOST,
      APP_URL: LOCAL_URL,
    });

    expect(result).toBe(`https://${PRODUCTION_HOST}`);
  });

  it("uses VERCEL_URL on preview deployments", () => {
    const result = getBaseUrl({
      VERCEL_ENV: "preview",
      VERCEL_URL: PREVIEW_HOST,
      VERCEL_PROJECT_PRODUCTION_URL: PRODUCTION_HOST,
      APP_URL: LOCAL_URL,
    });

    expect(result).toBe(`https://${PREVIEW_HOST}`);
  });

  it("falls back to APP_URL when no Vercel env vars are set", () => {
    const result = getBaseUrl({
      APP_URL: LOCAL_URL,
    });

    expect(result).toBe(LOCAL_URL);
  });

  it("returns undefined when nothing is configured", () => {
    const result = getBaseUrl({});

    expect(result).toBeUndefined();
  });
});
