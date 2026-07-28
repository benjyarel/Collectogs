import { describe, expect, it, vi, beforeEach } from "vitest";
import { fetchCollectionFolderContent } from "./fetchCollectionFolderContent";
import { getFolderReleases } from "@/app/lib/discog/getFolderReleases";
import { buildDiscogRelease } from "@/testUtils/discogsRelease";

vi.mock("@/app/lib/discog/getFolderReleases", () => ({
  getFolderReleases: vi.fn(),
}));

const mockedGetFolderReleases = vi.mocked(getFolderReleases);

describe("fetchCollectionFolderContent", () => {
  beforeEach(() => {
    mockedGetFolderReleases.mockReset();
  });

  it("aborts without calling getFolderReleases when folderId is null", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = await fetchCollectionFolderContent("Jude", null);

    expect(result).toEqual({ success: false, releases: [], artists: [] });
    expect(mockedGetFolderReleases).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });

  it("returns an empty failure result when getFolderReleases resolves falsy", async () => {
    mockedGetFolderReleases.mockResolvedValue(undefined as never);

    const result = await fetchCollectionFolderContent("Jude", 42);

    expect(result).toEqual({ success: false, releases: [], artists: [] });
  });

  it("forwards the username and folderId to getFolderReleases", async () => {
    mockedGetFolderReleases.mockResolvedValue([]);

    await fetchCollectionFolderContent("Jude", 42);

    expect(mockedGetFolderReleases).toHaveBeenCalledWith("Jude", 42);
  });

  it("dedupes releases sharing the same master_id, keeping the first one seen", async () => {
    mockedGetFolderReleases.mockResolvedValue([
      buildDiscogRelease({ id: 111, master_id: 500, title: "Nevermind (2nd press)" }),
      buildDiscogRelease({ id: 222, master_id: 500, title: "Nevermind (reissue)" }),
    ]);

    const result = await fetchCollectionFolderContent("Jude", 42);

    expect(result?.releases).toHaveLength(1);
    expect(result?.releases[0]).toMatchObject({ id: 111, title: "Nevermind (2nd press)" });
  });

  it("keeps master-less releases (master_id 0) as separate uncategorized entries", async () => {
    mockedGetFolderReleases.mockResolvedValue([
      buildDiscogRelease({ id: 111, master_id: 0 }),
      buildDiscogRelease({ id: 222, master_id: 0 }),
    ]);

    const result = await fetchCollectionFolderContent("Jude", 42);

    expect(result?.releases).toHaveLength(2);
    expect(result?.releases.every((release) => release.category === "uncategorized")).toBe(true);
  });

  it("dedupes artists by id across releases", async () => {
    mockedGetFolderReleases.mockResolvedValue([
      buildDiscogRelease({
        id: 111,
        master_id: 500,
        artists: [{ id: 42, name: "Nirvana", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
      }),
      buildDiscogRelease({
        id: 222,
        master_id: 600,
        artists: [{ id: 42, name: "Nirvana", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
      }),
    ]);

    const result = await fetchCollectionFolderContent("Jude", 42);

    expect(result?.artists).toEqual([{ id: 42, name: "Nirvana" }]);
  });

  it("returns artists sorted alphabetically by name", async () => {
    mockedGetFolderReleases.mockResolvedValue([
      buildDiscogRelease({
        id: 1,
        master_id: 100,
        artists: [{ id: 1, name: "Radiohead", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
      }),
      buildDiscogRelease({
        id: 2,
        master_id: 200,
        artists: [{ id: 2, name: "ABBA", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
      }),
      buildDiscogRelease({
        id: 3,
        master_id: 300,
        artists: [{ id: 3, name: "Muse", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
      }),
    ]);

    const result = await fetchCollectionFolderContent("Jude", 42);

    expect(result?.artists.map((artist) => artist.name)).toEqual(["ABBA", "Muse", "Radiohead"]);
  });

  // Known bug: unlike the mappers (which fall back to `artists?.[0] ?? {}`), the dedup step
  // destructures `artists?.[0]` directly, so a release with no artist listed currently crashes
  // instead of falling back to "Unknown Artist". This test documents today's behavior.
  it("currently throws when a release has no artist listed", async () => {
    mockedGetFolderReleases.mockResolvedValue([
      buildDiscogRelease({ id: 111, master_id: 0, artists: [] }),
    ]);

    await expect(fetchCollectionFolderContent("Jude", 42)).rejects.toThrow();
  });
});
