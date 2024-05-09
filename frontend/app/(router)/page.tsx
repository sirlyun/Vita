"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.scss";
import icons from "@/util/icons.js";
import ChallengeFrame from "@/components/ChallengeFrame";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserCharacterImagePath } from "@/util/images";
import useUserStore from "@/store/user-store";

export default function Home() {
  const userStore = useUserStore.getState();
  console.log(userStore); // 현재 bears의 수를 콘솔에 출력

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
        <div className={`${styles.item} bg`}>
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
            <Image src={icons.daily} width={60} height={60} alt="daily"></Image>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["debuff-menu"]}></div>
        <div className={styles.damagochi}>
          <Image
            src={getUserCharacterImagePath(
              userStore.gender,
              userStore.bodyShape,
              "idle",
              0
            )}
            width={300}
            height={300}
            alt="damagochi"
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
            <Link href="/shop">
              <Image src={icons.shop} width={60} height={60} alt="shop"></Image>
              <p>SHOP</p>
            </Link>
          </button>
          <button className={styles.report}>
            <Link href="/report">
              <Image
                src={icons.report}
                width={60}
                height={60}
                alt="report"
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
                alt="health"
              ></Image>
            </Link>
          </button>
        </div>
        <div className={styles.right}>
          <Link href="/game/single">
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
