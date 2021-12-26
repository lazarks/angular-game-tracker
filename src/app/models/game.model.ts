export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  genres: Array<Genre>;
  publishers: Array<Publishers>;
  ratings: Array<Ratings>;
  website: string;
  description_raw: string;
  metacritic: number;
  metacritic_url: string;
  parent_platforms: Array<ParentPlatforms>;
  trailers: Array<Trailer>;
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
