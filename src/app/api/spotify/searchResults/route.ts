import { NextResponse } from "next/server";
import { getSearchResults } from "../route";

export async function GET() {
  try {
    const results = await getSearchResults();
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "검색 조회 실패" }, { status: 500 });
  }
}
