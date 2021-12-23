export interface Game {
  background_image: string;
  name: string;
  released: string;
  genres: Array<Genre>;
  publishers: Array<Publishers>;
  ratings: Array<Ratings>;
  website: string;
  description: string;
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
}

interface ParentPlatforms {
  platform: {
    name: string;
  };
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
