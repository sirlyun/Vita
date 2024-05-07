"use client";

import Link from "next/link";
import styles from "@/public/styles/login.module.scss";
import GoogleSignIn from "@/components/ui/GoogleSignInButton";

export default function Login() {
  return (
    <main className={`${styles.main} background`}>
      <div>I'm now here in login</div>
      <button>
        <Link href="/">go to main</Link>
      </button>

      <div className={styles["login-box"]}>
        <div className={styles["login-title"]}>Login</div>
        <GoogleSignIn />
      </div>
    </main>
  );
}
