import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Route {
  [key: string]: boolean;
}

const publicOnlyUrls: Route = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    // 로그인 하지 않은 유저가
    if (!exists) {
      // 허락되지 않은 url 접근 시
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/profile", "/create-account", "/login"],
};
