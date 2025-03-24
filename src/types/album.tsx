export type album = {
  title: string;
  artist: string;
  image: string;
};

export type SpotifyAlbum = {
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
};
