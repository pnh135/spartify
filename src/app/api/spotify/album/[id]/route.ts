// /app/api/spotify/album/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SpotifyAlbum } from "@/types/album";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Step 1. access token 가져오기
    const tokenRes = await fetch("http://localhost:3000/api/spotify/token");
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2. Spotify 앨범 데이터 요청 (미국 지역 기준)
    const albumRes = await fetch(
      `https://api.spotify.com/v1/albums/${params.id}?market=US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const albumRaw = await albumRes.json();

    // Step 3. 필요한 데이터만 추출해서 파싱
    const parsedAlbum: SpotifyAlbum = {
      name: albumRaw.name,
      images: albumRaw.images,
      artists: albumRaw.artists.map((artist: any) => ({
        name: artist.name,
        id: artist.id,
      })),
      tracks: {
        items: albumRaw.tracks.items.map((track: any) => ({
          name: track.name,
          id: track.id,
          duration_ms: track.duration_ms,
          preview_url: track.preview_url,
        })),
      },
    };

    return NextResponse.json(parsedAlbum);
  } catch (error) {
    console.error("[Spotify Album API Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch album" },
      { status: 500 },
    );
  }
}
