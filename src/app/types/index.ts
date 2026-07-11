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
