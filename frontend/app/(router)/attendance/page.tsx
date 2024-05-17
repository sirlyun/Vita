"use client";

import Link from "next/link";
import styles from "@/public/styles/attendance.module.scss";
import Image from "next/image";
import homeIcon from "@/public/icons/home-icon.png";
import { getNPCCharacterImagePath } from "@/util/images";
import { useEffect } from "react";

export default function attendance() {
  useEffect(() => {
    // 출석 쿠키 제거
    document.cookie =
      "attendance=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  return (
    <div className={`${styles.main} background`}>
      <div className={styles.header}>
        <p className={styles.welcome}>Welcome!</p>
      </div>
      <div className={styles.content}>
        <div className={styles["attendance-div"]}>
          <Image
            src={getNPCCharacterImagePath("gym-trainer")}
            width={160}
            height={160}
            className={styles["health-trainer"]}
            alt="gym-trainer"
          />
          <div className={styles["login-box"]}>
            <img src="/images/login-box.png" alt="login-box"></img>
            <p className={styles["tip-title"]}>일일 출석 보상!</p>
            <div className={styles["tip-content"]}>
              <p>수명이 1년</p>
              <p>연장되었습니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <Link className={styles["home-icon-div"]} href="/">
          <Image src={homeIcon} width={60} height={60} alt="home icon"></Image>
        </Link>
      </div>
    </div>
  );
}
