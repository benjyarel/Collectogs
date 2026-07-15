export type OauthUser = {
  id: number;
  username: string;
  resource_url: string;
  consumer_name: string;
};

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

// ----- DISCOGS API -----

export interface DiscogsPaginationUrls {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
}

export interface DiscogsPagination {
  per_page: number;
  pages: number;
  page: number;
  items: number;
  urls: DiscogsPaginationUrls;
}

export interface DiscogsFormat {
  qty: string;
  descriptions: string[];
  name: string;
}

export interface DiscogsLabel {
  id: number;
  name: string;
  catno: string;
  entity_type: string;
  resource_url: string;
}

export interface DiscogsArtist {
  id: number;
  name: string;
  join: string;
  resource_url: string;
  anv: string;
  tracks: string;
  role: string;
}

export interface DiscogsBasicInformation {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  title: string;
  year: number;
  thumb: string;
  cover_image: string;
  formats: DiscogsFormat[];
  labels: DiscogsLabel[];
  artists: DiscogsArtist[];
  genres: string[];
  styles: string[];
}

export interface DiscogsNote {
  field_id: number;
  value: string;
}

export interface DiscogsRelease {
  id: number;
  instance_id: number;
  folder_id: number;
  rating: number;
  basic_information: DiscogsBasicInformation;
  notes?: DiscogsNote[];
}
