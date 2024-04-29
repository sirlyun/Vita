"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.scss";
import icons from "@/util/icons.js";
import images from "@/util/images.js";
import ChallengeFrame from "@/components/challenge-frame";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [challengeModal, setChallengeModal] = useState(false);
  const toggleChallengeModal = () => setChallengeModal(!challengeModal);

  const router = useRouter();
  const debuffRouter = (id: string) => {
    router.push(`/debuff/${id}`);
  };
  return (
    <div className={`${styles.main} background`}>
      {challengeModal && <ChallengeFrame onClose={toggleChallengeModal} />}
      <div className={styles.header}>
        <div className={styles.item}>
          <p>남은수명</p>
          <h2>100년</h2>
        </div>
        <div className={styles["side-menu"]}>
          <Link href={`/option`}>
            <Image
              src={icons.option}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </Link>
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
            width={300}
            height={300}
            alt="option"
          ></Image>
        </div>
        <div className={styles["debuff-menu"]}>
          <Image
            src={icons.alcohol}
            width={60}
            height={60}
            alt="alcohol"
            onClick={() => debuffRouter("0")}
          ></Image>

          <Image
            src={icons.cigarette}
            width={60}
            height={60}
            alt="cigarette"
            onClick={() => debuffRouter("1")}
          ></Image>

          <Image
            src={icons.food}
            width={60}
            height={60}
            alt="food"
            onClick={() => debuffRouter("2")}
          ></Image>

          <Image
            src={icons.chronic}
            width={60}
            height={60}
            alt="chronic"
            onClick={() => debuffRouter("3")}
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
            <Link href="/health">
              <Image
                src={icons.hospital}
                width={60}
                height={60}
                alt="option"
              ></Image>
            </Link>
          </button>
        </div>
        <div className={styles.right}>
          <Link href="/single">
            <button className={styles.single}>
              <Image
                src={icons.single}
                width={60}
                height={60}
                alt="single"
              ></Image>
            </button>
          </Link>
          <Link href="/multi">
            <button className={styles.multi}>
              <Image src={icons.pvp} width={60} height={60} alt="multi"></Image>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
