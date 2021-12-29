export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  genres: Array<Genre>;
  developers: Array<Developer>;
  publishers: Array<Publishers>;
  ratings: Array<Ratings>;
  website: string;
  description: string;
  description_raw: string;
  metacritic: number;
  metacritic_url: string;
  parent_platforms: Array<ParentPlatforms>;
  stores: Array<StoreP>;
  tags: Array<Tag>;
  trailers: Array<Trailer>;
  rating: number;
  rating_top: number;
}

interface StoreP {
  id: number;
  store: Store;
}

interface Store {
  domain: string;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Developer {
  name: string;
  slug: string;
  image_background: string;
}

export interface APIResponse<T> {
  results: Array<T>;
}

export interface Genre {
  name: string;
  slug: string;
}

interface ParentPlatforms {
  platform: Platform;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Publishers {
  name: string;
}

interface Ratings {
  id: number;
  count: number;
  title: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
