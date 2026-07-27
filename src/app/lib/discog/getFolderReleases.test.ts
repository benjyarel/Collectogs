import { describe, expect, it, vi, beforeEach } from "vitest";
import { getFolderReleases } from "./getFolderReleases";
import { authentifiedFetch } from "./utils";

vi.mock("./utils", () => ({
    authentifiedFetch: vi.fn(),
}));

const mockedFetch = vi.mocked(authentifiedFetch);
const CACHE_OPTIONS = {
    cache: "force-cache",
    next: { revalidate: 3600, tags: ["folder-releases"] },
};

const jsonResponse = (body: unknown) => ({ json: () => Promise.resolve(body) } as Response);

describe("getFolderReleases", () => {
    beforeEach(() => {
        mockedFetch.mockReset();
    });

    it("requests the folder releases with a 1 hour cache tagged folder-releases", async () => {
        mockedFetch.mockResolvedValue(jsonResponse({ releases: [], pagination: {} }));

        await getFolderReleases("Jude", 42);

        expect(mockedFetch).toHaveBeenCalledWith(
            "https://api.discogs.com/users/Jude/collection/folders/42/releases",
            CACHE_OPTIONS,
        );
    });

    it("follows pagination and aggregates releases from every page", async () => {
        mockedFetch
            .mockResolvedValueOnce(jsonResponse({
                releases: [{ id: 1 }],
                pagination: { urls: { next: "https://api.discogs.com/page2" } },
            }))
            .mockResolvedValueOnce(jsonResponse({ releases: [{ id: 2 }], pagination: {} }));

        const result = await getFolderReleases("Jude", 42);

        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        expect(mockedFetch).toHaveBeenNthCalledWith(2, "https://api.discogs.com/page2", CACHE_OPTIONS);
    });
});
