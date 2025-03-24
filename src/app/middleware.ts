import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // .redirect로 링크 주소도 바꿀까요 아니면 .rewrite로 링크 주소는 유지 시킬까요?
  // user는 zustand는 나오면 수정 (유저가 아닐 경우로 작성)
  if (user === "nonuser" && request.nextUrl.pathname.includes("/profile")) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: "/",
};
