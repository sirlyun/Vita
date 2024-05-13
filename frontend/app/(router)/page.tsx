"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.scss";
import icons from "@/util/icons.js";
import ChallengeFrame from "@/components/ChallengeFrame";
import { getUserCharacterImagePath } from "@/util/images";
import { getMyCharacterInfo } from "@/api/character";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Enum for Gender and Body Shape
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum BodyShape {
  SKINNY = "SKINNY",
  NORMAL = "NORMAL",
  FAT = "FAT",
}

// Interface for Achievement
interface Achievement {
  level: number;
  name: string;
}

// Interface for Debuff
interface DeBuff {
  de_buff_id: number;
  type: string;
  vita_point: number;
}

// Interface for Character Item
interface CharacterItem {
  my_item_id: number;
  type: string;
  name: string;
}

// Main Character Interface
interface Character {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: Gender;
  body_shape: BodyShape;
  achievement: Achievement;
  de_buff: DeBuff[];
  character_item: CharacterItem[];
}

export default function Home() {
  const [challengeModal, setChallengeModal] = useState(false);
  const [userInfo, setUserInfo] = useState<Character | null>(null);
  const toggleChallengeModal = () => setChallengeModal(!challengeModal);
  const router = useRouter();

  useEffect(() => {
    const fetchCharacterList = async () => {
      try {
        // 내 캐릭터 정보 가져오기
        const myCharacterInfo = await getMyCharacterInfo();
        console.log("캐릭터 조회 성공!", myCharacterInfo);

        // 내 캐릭터 정보 저장
        setUserInfo(myCharacterInfo);
      } catch (error) {
        console.log("캐릭터 조회에 실패했습니다!.", error);
      }
    };
    fetchCharacterList();
  }, []);

  return (
    <div className={`${styles.main} background`}>
      {challengeModal && <ChallengeFrame onClose={toggleChallengeModal} />}
      <div className={styles.header}>
        <div className={`${styles.item} bg`}>
          <p>남은수명</p>
          <h2>100년</h2>
        </div>
        <div className={styles["side-menu"]}>
          <Link href={`/settings`}>
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
          {userInfo ? (
            <Image
              src={getUserCharacterImagePath(
                userInfo.gender,
                userInfo.body_shape,
                "idle",
                0
              )}
              width={300}
              height={300}
              alt="damagochi"
            ></Image>
          ) : (
            ""
          )}
        </div>
        <div className={styles["debuff-menu"]}>
          <Link href={`/debuff/${0}`}>
            <Image
              src={icons.alcohol}
              width={60}
              height={60}
              alt="alcohol"
            ></Image>
          </Link>

          <Link href={`/debuff/${1}`}>
            <Image
              src={icons.cigarette}
              width={60}
              height={60}
              alt="alcohol"
            ></Image>
          </Link>

          <Link href={`/debuff/${2}`}>
            <Image
              src={icons.food}
              width={60}
              height={60}
              alt="alcohol"
            ></Image>
          </Link>

          <Link href={`/debuff/${3}`}>
            <Image
              src={icons.chronic}
              width={60}
              height={60}
              alt="alcohol"
            ></Image>
          </Link>
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
