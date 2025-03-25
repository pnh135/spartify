import { NextResponse } from "next/server";
import { SpotifyAlbum } from "@/types/album";
const APP_TOKEN_URL = "https://accounts.spotify.com/api/token";
const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const publicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64",
);

export async function getPublicAccessToken(): Promise<string> {
  const res = await fetch(APP_TOKEN_URL, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Basic ${publicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  console.log("🔐 새로 발급된 토큰:", data.access_token);
  console.log("⏳ 만료 시간 (초):", data.expires_in);
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getPublicAccessToken();
    return NextResponse.json({ access_token: token });
  } catch (error) {
    console.log(error);
  }
}

// export async function getNewRelease(): Promise<SpotifyAlbum[]> {
//   try {
//     const accessToken = await getPublicAccessToken();

//     const res = await fetch(
//       "https://api.spotify.com/v1/browse/new-releases?limit=20",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );
//     const data = await res.json();
//     const newReleaseAlbum: SpotifyAlbum[] = data.albums.items;
//     return newReleaseAlbum;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
export async function getNewRelease(): Promise<SpotifyAlbum[]> {
  try {
    const accessToken = await getPublicAccessToken();

    console.log("📡 Spotify API 호출 시작");
    const res = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?limit=20",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("🎯 응답 상태 코드:", res.status);

    if (res.status !== 200) {
      const errorData = await res.json();
      console.error("🚨 Spotify API 에러:", errorData);
      return [];
    }

    const data = await res.json();
    return data.albums.items;
  } catch (error) {
    console.error("🔥 예외 발생:", error);
    return [];
  }
}
