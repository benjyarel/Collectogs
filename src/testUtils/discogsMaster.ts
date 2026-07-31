import { DiscogsMaster } from "@/app/types";

export const buildDiscogMaster = (
  overrides: Partial<DiscogsMaster> = {},
): DiscogsMaster => ({
  id: 500,
  title: "Nevermind",
  type: "master",
  main_release: 111,
  artist: "Nirvana",
  role: "Main",
  format: ["Album"],
  resource_url: "https://api.discogs.com/masters/500",
  year: 1991,
  thumb: "thumb.jpg",
  stats: {
    community: { in_wantlist: 0, in_collection: 0 },
    user: { in_wantlist: 0, in_collection: 0 },
  },
  ...overrides,
});
