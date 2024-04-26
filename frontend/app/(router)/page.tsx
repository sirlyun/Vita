"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.css";
import icons from "@/util/icons.js";
import images from "@/util/images.js";
import ChallengeFrame from "@/components/challenge-frame";
import { useState } from "react";

export default function Home() {
  const [challengeModal, setChallengeModal] = useState(false);

  const toggleChallengeModal = () => setChallengeModal(!challengeModal);

  return (
    <div className={`${styles.main} background`}>
      {challengeModal && <ChallengeFrame onClose={toggleChallengeModal} />}
      <div className={styles.header}>
        <div className={styles.item}>
          <p>남은수명</p>
          <h2>100년</h2>
        </div>
        <div className={styles["side-menu"]}>
          <button>
            <Image
              src={icons.option}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
          <button onClick={toggleChallengeModal}>
            <Image
              src={icons.daily}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["debuff-menu"]}></div>
        <div className={styles.damagochi}>
          <Image
            src={images.damagochi}
            width={60}
            height={60}
            alt="option"
          ></Image>
        </div>
        <div className={styles["debuff-menu"]}>
          <Image
            src={icons.alcohol}
            width={60}
            height={60}
            alt="option"
          ></Image>

          <Image
            src={icons.cigarette}
            width={60}
            height={60}
            alt="option"
          ></Image>

          <Image src={icons.food} width={60} height={60} alt="option"></Image>

          <Image
            src={icons.chronic}
            width={60}
            height={60}
            alt="option"
          ></Image>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.left}>
          <button className={styles.shop}>
            <Link href="/login">
              <Image
                src={icons.shop}
                width={60}
                height={60}
                alt="option"
              ></Image>
            </Link>
            <p>SHOP</p>
          </button>
          <button className={styles.report}>
            <Link href="/attendance">
              {" "}
              <Image
                src={icons.report}
                width={60}
                height={60}
                alt="option"
              ></Image>
            </Link>
          </button>
        </div>
        <div className={styles.center}>
          <button>
            <Image
              src={icons.hospital}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
        </div>
        <div className={styles.right}>
          <Link href="/single">
            <button className={styles.single}>
              <Image
                src={icons.pvp}
                width={60}
                height={60}
                alt="option"
              ></Image>
            </button>
          </Link>
          <Link href="/multi">
            <button className={styles.multi}>
              <Image
                src={icons.pvp}
                width={60}
                height={60}
                alt="option"
              ></Image>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
