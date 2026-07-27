import { DiscogsRelease } from "@/app/types";

export const buildDiscogRelease = (
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
