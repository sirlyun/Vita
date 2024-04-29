"use client";

import Link from "next/link";
import styles from "@/public/styles/login.module.scss";
import { usePathname } from "next/navigation";

export default function Login() {
  const path = usePathname();
  return (
    <main className={`${styles.main} background`}>
      <div>I'm now here in login</div>
      <button>
        <Link href="/">go to main</Link>
      </button>

      <div className={styles["login-box"]}>
        <div className={styles["login-title"]}>Login</div>
        <Link className={styles["google-login-link"]} href="/">
          <img
            className={styles["google-login"]}
            src="/images/google-login.png"
            alt=""
          />
        </Link>
      </div>
    </main>
  );
}
