import { NextResponse } from "next/server";
// import { getAlbum } from "../../route";
import { getAlbum } from "@/utils/spotify";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const album = await getAlbum(params.id);
    return NextResponse.json(album);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "앨범 조회 실패" }, { status: 500 });
  }
}
