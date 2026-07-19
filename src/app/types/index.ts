
//provided by https://api.discogs.com/oauth/identity
export type OauthUser = {
  id: number;
  username: string;
  resource_url: string;
  consumer_name: string;
};

// provided by https://api.discogs.com/users/{username}
export type DiscogUser = {
  id: number;
  resource_url: string;
  uri: string;
  username: string;
  name: string;
  home_page: string;
  location: string;
  profile: string;
  registered: string;
  rank: number;
  num_pending: number;
  num_for_sale: number;
  num_lists: number;
  releases_contributed: number;
  releases_rated: number;
  rating_avg: number;
  inventory_url: string;
  collection_folders_url: string;
  collection_fields_url: string;
  wantlist_url: string;
  avatar_url: string;
  curr_abbr: string;
  activated: boolean;
  marketplace_suspended: boolean;
  banner_url: string;
  buyer_rating: number;
  buyer_rating_stars: number;
  buyer_num_ratings: number;
  seller_rating: number;
  seller_rating_stars: number;
  seller_num_ratings: number;
  is_staff: boolean;
  num_collection: number;
  num_wantlist: number;
  email: string;
  num_unread: number;
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



export interface DiscogsPagination {
  per_page: number;
  pages: number;
  page: number;
  items: number;
  urls: DiscogsPaginationUrls;
};

export interface DiscogsPaginationUrls {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
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
  type: string
};

export interface DiscogsMaster {
  id: number;
  title: string;
  type: "master";
  main_release: number;
  artist: string;
  role: string;
  format: string[];
  resource_url: string;
  year: number;
  thumb: string;
  stats: {
    community: {
      in_wantlist: number;
      in_collection: number;
    };
    user: {
      in_wantlist: number;
      in_collection: number;
    };
  };
}
