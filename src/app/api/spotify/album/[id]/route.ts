import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // 1. Access Token 요청
  const tokenRes = await fetch("http://localhost:3000/api/spotify/token");
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // 2. 앨범 ID로 Spotify API 호출
  const albumId = params.id;

  const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const albumData = await albumRes.json();

  return NextResponse.json(albumData);
}
