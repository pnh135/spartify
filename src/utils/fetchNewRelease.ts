"use server";

import { getPublicAccessToken } from "@/app/api/spotify/route";
import { SpotifyAlbum } from "@/types/album";

export async function getNewRelease(): Promise<SpotifyAlbum[]> {
  try {
    const accessToken = await getPublicAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?limit=20",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await res.json();
    if (!data.albums?.items) {
      console.error("Spotify API 응답 오류:", data);
      return [];
    }
    const newReleaseAlbum: SpotifyAlbum[] = data.albums.items;

    return newReleaseAlbum;
  } catch (error) {
    console.log(error);
    return [];
  }
}
