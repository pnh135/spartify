import { NextResponse } from "next/server";
import { getNewRelease } from "../route";

export async function GET() {
  try {
    const albums = await getNewRelease();
    console.log(albums);
    return NextResponse.json(albums);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "신보 조회 실패" }, { status: 500 });
  }
}
