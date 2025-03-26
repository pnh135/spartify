import { SpotifyTrack } from "./track";

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
    href: string;
    items: SpotifyTrack[];
    limit: number;
    offset: number;
    total: number;
    next: string | null;
    previous: string | null;
  };
}
