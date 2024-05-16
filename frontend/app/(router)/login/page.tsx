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
          document.cookie = `accessToken=${fetchedLogin.token.access_token}; path=/; max-age=3600*3; secure; SameSite=None`;

          const checkCharacter = await getMyCharacterInfo();
          console.log("로그인 response: ", checkCharacter);
          // 회원 정보가 등록되어 있으면서, 캐릭터가 죽은 상태가 아닐떄
          if (
            checkCharacter.character_id !== undefined &&
            !checkCharacter.is_dead
          ) {
            document.cookie = `characterId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
            document.cookie = `memberId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
          }
          // 캐릭터가 죽은 상태일 때
          else if (checkCharacter.is_dead) {
            document.cookie = `memberId=${checkCharacter.character_id}; path=/; max-age=36000; secure; SameSite=None`;
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
