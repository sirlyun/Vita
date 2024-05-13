"use client";

import styles from "@/public/styles/login.module.scss";
import GoogleSignIn from "@/components/ui/GoogleSignInButton";
import { useSearchParams, useRouter } from "next/navigation";
import { login } from "@/api/login";
import { useEffect } from "react";
import { getMyCharacterInfo } from "@/api/character";

export default function Login() {
  const searchParam = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryCode = searchParam.get("code");
    const authenticateAndFetchChracter = async () => {
      if (queryCode) {
        // 로그인 후 쿠키에 액세스 토큰 저장\
        const encodedCode = encodeURIComponent(queryCode);
        const fetchedLogin = await login(encodedCode);
        document.cookie = `accessToken=${fetchedLogin.token.access_token}; path=/; max-age=3600; secure; SameSite=None`;

        const checkCharacter = await getMyCharacterInfo();
        if (checkCharacter.character_id !== undefined) {
          document.cookie = `characterId=${checkCharacter.character_id}; path=/; max-age=3600; secure; SameSite=None`;
          document.cookie = `memberId=${"createdMember"}; path=/; max-age=3600; secure; SameSite=None`;
        }

        router.push("/");
      }
    };
    authenticateAndFetchChracter();
  });

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
