// import { NextResponse } from "next/server";
// import { SpotifyAlbum } from "@/types/album";
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
  return data.access_token;
}

// export async function GET() {
//   try {
//     const token = await getPublicAccessToken();
//     return NextResponse.json({ access_token: token });
//   } catch (error) {
//     console.log(error);
//   }
// }

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
export async function getNewRelease() {
  const accessToken = await getPublicAccessToken();
  const res = await fetch(
    "https://api.spotify.com/v1/browse/new-releases?limit=20",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch new releases");

  const data = await res.json();
  return data.albums.items;
}

export async function getAlbum(id: string) {
  const accessToken = await getPublicAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch album");

  return res.json();
}

export async function getSeveralArtist(
  artistsId: string[],
  accessToken: string,
) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists?ids=${artistsId.join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await res.json();
  return data;
}
