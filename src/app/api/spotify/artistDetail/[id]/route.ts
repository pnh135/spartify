import { NextResponse } from "next/server";
// import { getArtist } from "../../route";
import { getArtist } from "@/utils/spotify";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const album = await getArtist(params.id);
    return NextResponse.json(album);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "아티스트 조회 실패" }, { status: 500 });
  }
}
