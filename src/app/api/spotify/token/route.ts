// import { NextResponse } from "next/server";
// import { requestNewAccessToken } from "../route";

// export async function GET() {
//   try {
//     const token = await requestNewAccessToken();
//     return NextResponse.json({ access_token: token });
//   } catch (error) {
//     console.error("토큰 발급 실패:", error);
//     return NextResponse.json({ error: "토큰 발급 실패" }, { status: 500 });
//   }
// }
