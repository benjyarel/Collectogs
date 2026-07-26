import { expect, it, describe } from "vitest";
import { releaseFromDiscogs, artistFromDiscogs } from "./discogsMappers";
import { DiscogsRelease } from "@/app/types";

const buildDiscogRelease = (
  overrides: Partial<DiscogsRelease["basic_information"]> = {},
): DiscogsRelease =>
  ({
    id: 1,
    instance_id: 1,
    folder_id: 1,
    rating: 0,
    type: "release",
    basic_information: {
      id: 111,
      master_id: 0,
      master_url: "https://api.discogs.com/masters/0",
      resource_url: "https://api.discogs.com/releases/111",
      title: "Nevermind",
      year: 1991,
      thumb: "thumb.jpg",
      cover_image: "cover.jpg",
      artists: [
        { id: 42, name: "Nirvana", join: "", resource_url: "", anv: "", tracks: "", role: "" },
      ],
      genres: [],
      styles: [],
      ...overrides,
    },
  }) as DiscogsRelease;

describe("releaseFromDiscogs", () => {
  it("maps discogs fields to the domain Release shape", () => {
    const discogRelease = buildDiscogRelease();

    const result = releaseFromDiscogs(discogRelease, true);

    expect(result).toEqual({
      id: 111,
      category: "master",
      artistName: "Nirvana",
      artistId: 42,
      title: "Nevermind",
      masterId: 0,
      masterUrl: "https://api.discogs.com/masters/0",
      year: 1991,
      coverImageUrl: "cover.jpg",
      thumbImageUrl: "thumb.jpg",
    });
  });

  it("categorizes as uncategorized when hasMaster is false", () => {
    const discogRelease = buildDiscogRelease();

    const result = releaseFromDiscogs(discogRelease, false);

    expect(result.category).toBe("uncategorized");
  });

  it("falls back to Unknown Artist / id 0 when the artist has falsy fields", () => {
    const discogRelease = buildDiscogRelease({
      artists: [{ id: 0, name: "", join: "", resource_url: "", anv: "", tracks: "", role: "" }],
    });

    const result = releaseFromDiscogs(discogRelease, false);

    expect(result.artistName).toBe("Unknown Artist");
    expect(result.artistId).toBe(0);
  });

  it("falls back to Unknown Artist / id 0 when the artists array is empty", () => {
    const discogRelease = buildDiscogRelease({ artists: [] });

    const result = releaseFromDiscogs(discogRelease, false);

    expect(result.artistName).toBe("Unknown Artist");
    expect(result.artistId).toBe(0);
  });
});

describe("artistFromDiscogs", () => {
  it("maps the first artist of a discogs release to the domain Artist shape", () => {
    const discogRelease = buildDiscogRelease();

    const result = artistFromDiscogs(discogRelease);

    expect(result).toEqual({ id: 42, name: "Nirvana" });
  });

  it("falls back to Unknown Artist / id 0 when the artists array is empty", () => {
    const discogRelease = buildDiscogRelease({ artists: [] });

    const result = artistFromDiscogs(discogRelease);

    expect(result).toEqual({ id: 0, name: "Unknown Artist" });
  });
});
