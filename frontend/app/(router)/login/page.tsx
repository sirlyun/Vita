"use client";

import Link from "next/link";
import styles from "@/public/styles/login.module.css";
import { usePathname } from "next/navigation";

export default function Login() {
  const path = usePathname();
  return (
    <main className={styles.main}>
      <div>I'm now here in login</div>
      <button>
        <Link href="/">go to main</Link>
      </button>

      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>Login</div>
        <Link className={styles.googleLoginLink} href="/">
          <img
            className={styles.googleLogin}
            src="/images/google-login.png"
            alt=""
          />
        </Link>
      </div>
    </main>
  );
}
