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

export type Release = {
  artistName: string;
  artistId: number;
  title: string;
  masterId: number;
  masterUrl: string;
  year: number;
  coverImageUrl: string;
  thumbImageUrl: string;
};
