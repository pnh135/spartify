import { NextRequest, NextResponse } from "next/server";
import { getSearchResults } from "../route";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json({ error: "검색어는 입력하세요" }, { status: 400 });
  }

  try {
    const results = await getSearchResults(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("검색 조회 실패:", error);
    return NextResponse.json(
      { error: "검색 중 문제가 발생했습니다." },
      { status: 500 },
    );
  }
}
