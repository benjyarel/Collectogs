import { describe, expect, it, vi, beforeEach } from "vitest";
import { fetchArtistReleases } from "./fetchArtistReleases";
import { getArtistReleases } from "@/app/lib/discog/getArtistReleases";
import { buildDiscogMaster } from "@/testUtils/discogsMaster";

vi.mock("@/app/lib/discog/getArtistReleases", () => ({
  getArtistReleases: vi.fn(),
}));

const mockedGetArtistReleases = vi.mocked(getArtistReleases);

describe("fetchArtistReleases", () => {
  beforeEach(() => {
    mockedGetArtistReleases.mockReset();
  });

  it("returns an empty failure result when getArtistReleases resolves falsy", async () => {
    mockedGetArtistReleases.mockResolvedValue(undefined as never);

    const result = await fetchArtistReleases("Nirvana");

    expect(result).toEqual({ success: false, releases: [] });
  });

  it("forwards the artist name to getArtistReleases", async () => {
    mockedGetArtistReleases.mockResolvedValue([]);

    await fetchArtistReleases("Nirvana");

    expect(mockedGetArtistReleases).toHaveBeenCalledWith("Nirvana");
  });

  it("keeps only album releases, excluding unofficial releases", async () => {
    mockedGetArtistReleases.mockResolvedValue([
      buildDiscogMaster({ id: 1, format: ["Album"] }),
      buildDiscogMaster({ id: 2, format: ["Single"] }),
      buildDiscogMaster({ id: 3, format: ["Album", "Unofficial Release"] }),
    ]);

    const result = await fetchArtistReleases("Nirvana");

    expect(result.releases.map((release) => release.id)).toEqual([1]);
  });

  it("dedupes releases sharing the same id, keeping the first one seen", async () => {
    mockedGetArtistReleases.mockResolvedValue([
      buildDiscogMaster({ id: 500, title: "Nevermind" }),
      buildDiscogMaster({ id: 500, title: "Nevermind (duplicate)" }),
    ]);

    const result = await fetchArtistReleases("Nirvana");

    expect(result.releases).toHaveLength(1);
    expect(result.releases[0]).toMatchObject({ id: 500, title: "Nevermind" });
  });
});
