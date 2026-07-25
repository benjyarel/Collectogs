export * from "./discogs"
export type CollectionFolder = {
  id: number;
  name: string;
  count: number;
  resource_url: string;
};

export type Artist = {
  name: string;
  id: number;
};


// "master": linked to a Discogs master release (main album). "uncategorized": no master_id
// on the Discogs release (e.g. small compilations, bootlegs) - kept visible but unclassified.
// Expected to grow (e.g. "compilation", "live") as we refine what the external API gives us.
export type ReleaseCategory = "master" | "uncategorized";

export type Release = {
  id: number;
  category: ReleaseCategory;
  artistName: string;
  artistId: number;
  title: string;
  masterId: number;
  masterUrl: string;
  year: number;
  coverImageUrl: string;
  thumbImageUrl: string;
};
