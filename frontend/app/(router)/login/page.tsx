"use client";

import styles from "@/public/styles/login.module.scss";
import GoogleSignIn from "@/components/ui/GoogleSignInButton";
import { useSearchParams, useRouter } from "next/navigation";
import { login } from "@/api/login";
import useUserStore from "@/store/user-store";
import { useEffect } from "react";

export default function Login() {
  const searchParam = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryCode = searchParam.get("code");
    if (queryCode) {
      const checkLogin = async () => {
        const encodedCode = encodeURIComponent(queryCode);
        try {
          const fetchedLogin = await login(encodedCode);
          console.log(fetchedLogin.token.access_token);

          document.cookie = `accessToken=${fetchedLogin.token.access_token}; path=/; max-age=3600; secure; SameSite=None`;

          useUserStore
            .getState()
            .setAccessToken(fetchedLogin.token.access_token);
          router.push("/");
        } catch (error) {
          console.error("Login failed:", error);
        }
      };

      checkLogin();
    }
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
