export type album = {
  title: string;
  artist: string;
  image: string;
};

export interface SpotifyAlbum {
  id: string;
  release_date: string;
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  artists: {
    name: string;
    id: string;
  }[];
  tracks: {
    items: {
      name: string;
      id: string;
      duration_ms: number;
      preview_url: string | null;
    }[];
  };
}

export interface SpotifySearch {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      album_type: string;
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      }[];
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions: {
        reason: string;
      };
      type: string;
      uri: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
    }[];
  };
}
