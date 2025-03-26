export interface SpotifyArtistFromAlbum {
  id: string;
  name: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  genres: string[];
  uri: string;
}
