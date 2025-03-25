import { NextResponse } from "next/server";
import { SpotifyAlbum } from "@/types/album";
import { NextApiRequest, NextApiResponse } from "next";
const APP_TOKEN_URL = "https://accounts.spotify.com/api/token";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const publicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64",
);

export async function refreshPublicAccessToken(): Promise<void> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("refresh token이 없습니다");
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  const res = await fetch(APP_TOKEN_URL, payload);
  const data = await res.json();

  localStorage.setItem("access_token", data.access_token);
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
}

export async function getPublicAccessToken(): Promise<string> {
  const res = await fetch(APP_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${publicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
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

export async function getSearchResults({ searchData }: { searchData: string }) {
  try {
    const accessToken = await getPublicAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/search?${searchData}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!data.albums?.items) {
      console.error("Spotify API 응답 오류:", data);
      return [];
    }
    const searchResults: SpotifyAlbum[] = data.albums.items;
    return searchResults;
  } catch (error) {
    console.log(error);
  }
}

const searchSpotify = async (query: string, accessToken: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query,
    )}&type=track,album,artist&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const query = req.query.query as string;
    const accessToken = await getPublicAccessToken();
    const searchResults = await searchSpotify(query, accessToken);

    res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
  }
}
