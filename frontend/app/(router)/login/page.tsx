"use client ";

import styles from "@/public/styles/login.module.scss";
import LoginComponent from "@/components/login/page";
import Chronic from "@/components/member/page";

export default function Login() {
  return (
    <div className={`${styles.main} background`}>
      <Chronic />
    </div>
  );
}
