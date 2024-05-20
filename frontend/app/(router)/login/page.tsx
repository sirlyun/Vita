"use client";

import styles from "@/public/styles/login.module.scss";
import GoogleSignIn from "@/components/ui/GoogleSignInButton";
import { useSearchParams, useRouter } from "next/navigation";
import { login } from "@/api/login";
import { useEffect, useState } from "react";
import { getMyCharacterInfo } from "@/api/character";

export default function LoginComponent() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const queryCode = searchParam.get("code");
    const authenticateAndFetchChracter = async () => {
      if (queryCode) {
        try {
          // 로그인 후 쿠키에 액세스 토큰 저장
          const encodedCode = encodeURIComponent(queryCode);
          const fetchedLogin = await login(encodedCode);

          // 액세스토큰 저장
          document.cookie = `accessToken=${fetchedLogin.token.access_token}; path=/; max-age=3600*3; secure; SameSite=None`;

          // 해당 회원에 캐릭터가 존재할 때 첫번째 출석이라면 쿠키에 attendance 저장
          if (fetchedLogin.first_attendance) {
            document.cookie = `attendance=${"첫번째 출석"}; path=/; max-age=36000; secure; SameSite=None`;
          }

          // 캐릭터 조회
          const checkCharacter = await getMyCharacterInfo();

          // 회원 정보가 등록되어 있으면서, 캐릭터가 죽은 상태가 아닐떄 쿠키에 캐릭터ID와 memberId를 저장
          if (
            checkCharacter.character_id !== undefined &&
            !checkCharacter.is_dead
          ) {
            document.cookie = `characterId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
            document.cookie = `memberId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
          }

          // 캐릭터가 죽은 상태일 때 deathId를 쿠키에 저장
          else if (checkCharacter.is_dead) {
            document.cookie = `memberId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
            document.cookie = `deathId=${"isDeath"}; path=/; max-age=36000; secure; SameSite=None`;
          }

          router.push("/");
        } catch (error) {
          console.error("로그인 실패:", error);
        }
      }
    };
    authenticateAndFetchChracter();
  }, [searchParam, router]);
  if (!isClient) {
    return null; // 클라이언트에서만 렌더링
  }

  return (
    <div className={`${styles.main} background`}>
      <div className={styles["login-box"]}>
        <div className={styles["login-title"]}>Login</div>
        <div>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
