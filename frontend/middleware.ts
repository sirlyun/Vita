import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const accessToken = request.cookies.get("accessToken");
  const characterId = request.cookies.get("characterId");
  const memberId = request.cookies.get("memberId");
  const deathId = request.cookies.get("deathId");

  // 로그인 페이지나 정적 자원 요청시 리디렉트하지 않음
  if (
    (pathname.startsWith("/login") && !accessToken) ||
    (pathname.startsWith("/member") &&
      accessToken &&
      !memberId &&
      !characterId) ||
    (pathname.startsWith("/character") && accessToken && !characterId) ||
    (pathname.startsWith("/death") && accessToken && deathId) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // accessToken이 없으면 로그인 페이지로 리디렉트
  if (!accessToken) {
    console.log(
      "로그인되어 있지 않으므로 로그인 페이지로 이동합니다: ",
      pathname
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 해당 계정에 생성된 캐릭터가 존재하지 않으면서 회원 정보도 없을 떄 회원 정보 등록 페이지로 이동
  if (accessToken && !memberId) {
    console.log("memberId, characterId", memberId, characterId);
    console.log("등록된 회원 정보가 없으므로 member 경로로 이동합니다");
    return NextResponse.redirect(new URL("/member", request.url));
  }

  // 회원 정보는 있지만 캐릭터가 죽은 상태일 때
  if (accessToken && deathId) {
    console.log(
      "회원정보는 있지만 캐릭터가 사망한 상태이므로 캐릭터 사망 페이지로 이동합니다.",
      characterId
    );
    return NextResponse.redirect(new URL("/death", request.url));
  }

  if (accessToken && pathname.startsWith("/login")) {
    console.log(
      "로그인으로 이동했을 떄 멤버ID와 캐릭터ID 확인해보기:",
      memberId,
      characterId
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 회원정보가 존재할 떄 member 페이지로 이동 못하게 막기
  if (memberId && pathname.startsWith("/member")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 캐릭터가 존재할 때 character 페이지로 이동 못하게 막기
  if (characterId && pathname.startsWith("/character")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // accessToken이 있으면 다음 미들웨어 또는 페이지로 이동
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
