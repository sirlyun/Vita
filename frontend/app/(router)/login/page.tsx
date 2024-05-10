"use client ";

import styles from "@/public/styles/login.module.scss";
import LoginComponent from "@/components/login/page";

export default function Login() {
  return (
    <div className={`${styles.main} background`}>
      <LoginComponent />
    </div>
  );
}
