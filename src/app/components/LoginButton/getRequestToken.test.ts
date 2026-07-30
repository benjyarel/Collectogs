import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRequestToken } from "./getRequestToken";

describe("getRequestToken", () => {
    const originalLocation = window.location;

    beforeEach(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { href: "" },
        });
    });

    afterEach(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: originalLocation,
        });
        vi.unstubAllGlobals();
    });

    it("fetches the request token from the discogs auth endpoint", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            text: () => Promise.resolve("oauth_token=abc123&oauth_token_secret=xyz"),
        });
        vi.stubGlobal("fetch", fetchMock);

        await getRequestToken();

        expect(fetchMock).toHaveBeenCalledWith("/api/discog/auth");
    });

    it("redirects to the discogs oauth authorize page with the received token", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            text: () => Promise.resolve("oauth_token=abc123&oauth_token_secret=xyz"),
        }));

        await getRequestToken();

        expect(window.location.href).toBe(
            "https://www.discogs.com/oauth/authorize?oauth_token=abc123"
        );
    });

    it("logs the error and does not redirect when the fetch fails", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

        await getRequestToken();

        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("network error"));
        expect(window.location.href).toBe("");

        consoleErrorSpy.mockRestore();
    });
});
