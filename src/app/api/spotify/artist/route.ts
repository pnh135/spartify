import { NextResponse } from "next/server";
import { getNewRelease, getPublicAccessToken } from "../route";
import { getSeveralArtist } from "../route";
import { SpotifyAlbum } from "@/types/album";
export async function GET() {
  try {
    const token = await getPublicAccessToken();
    const albums: SpotifyAlbum[] = await getNewRelease();
    const artistsId = await albums.map(album => album.artists[0].id);

    const artists = await getSeveralArtist(artistsId, token);

    return NextResponse.json(artists);
  } catch (error) {
    console.log(error);
  }
}
