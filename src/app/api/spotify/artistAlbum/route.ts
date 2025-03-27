import { NextRequest } from "next/server";
// import { getArtistAlbum } from "../route";
import { getArtistAlbum } from "@/utils/spotify";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Artist ID is required", { status: 400 });
  }

  try {
    const albums = await getArtistAlbum(id);
    return Response.json(albums);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch artist albums", { status: 500 });
  }
}
