export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  website: string;
  description: string;
  description_raw: string;

  rating: number;
  rating_top: number;

  parent_platforms: Array<ParentPlatforms>;
  genres: Array<Genre>;
  stores: Array<StoreP>;
  tags: Array<Tag>;

  developers: Array<Developer>;
  publishers: Array<Publishers>;
}

export interface APIResponse<T> {
  results: Array<T>;
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
