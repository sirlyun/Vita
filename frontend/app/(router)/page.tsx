"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.scss";
import ChallengeFrame from "@/components/ChallengeFrame";
import useUserStore from "@/store/user-store";
import DebuffItem from "@/components/ui/DebuffItem";
import { getIconPath } from "@/util/icons.js";
import { getUserCharacterImagePath, getBackgroundUrl } from "@/util/images";
import { getMyCharacterInfo } from "@/api/character";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const userStore = useUserStore();
  const [challengeModal, setChallengeModal] = useState(false);
  const [myCharacterInfo, setMyCharacterInfo] = useState<Character | null>(
    null
  );
  const toggleChallengeModal = () => setChallengeModal(!challengeModal);

  useEffect(() => {
    const fetchCharacterList = async () => {
      try {
        // 내 캐릭터 정보 가져오기
        const characterInfo = await getMyCharacterInfo();
        console.log("캐릭터 조회 성공!", characterInfo);

        // 내 캐릭터 정보 저장
        setMyCharacterInfo(characterInfo);

        // 이후를 위한 스토어 별도 저장
        userStore.characterId = characterInfo.character_id;
        userStore.gender = characterInfo.gender;
        userStore.bodyShape = characterInfo.body_shape;
        userStore.name = characterInfo.name;
      } catch (error) {
        console.log("캐릭터 조회에 실패했습니다!.", error);
      }
    };

    fetchCharacterList();
  }, []);

  // 배경화면 동적 설정 ***********************************************
  const getBackgroundName = (): string => {
    if (myCharacterInfo) {
      const backgroundItem = myCharacterInfo.character_item.find(
        (item) => item.type === "BACKGROUND"
      );
      return backgroundItem ? backgroundItem.name : "";
    }
    return "";
  };

  const backgroundName = getBackgroundName();
  const backgroundStyle = {
    backgroundImage: `url(${getBackgroundUrl(backgroundName)})`,
  };

  return (
    <div className={`${styles.main} background`} style={backgroundStyle}>
      {challengeModal && <ChallengeFrame onClose={toggleChallengeModal} />}
      <div className={styles.header}>
        <div className={`${styles.item} bg`}>
          <p>남은수명</p>
          <h2>{myCharacterInfo?.vita_point}년</h2>
        </div>
        <div className={styles["side-menu"]}>
          <Link href={`/settings`}>
            <Image
              src={getIconPath("option")}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </Link>
          <button onClick={toggleChallengeModal}>
            <Image
              src={getIconPath("daily")}
              width={60}
              height={60}
              alt="daily"
            ></Image>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["debuff-menu"]}></div>
        <div className={styles.damagochi}>
          {myCharacterInfo ? (
            <Image
              src={getUserCharacterImagePath(
                myCharacterInfo.gender,
                myCharacterInfo.body_shape,
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
          {myCharacterInfo &&
            myCharacterInfo.de_buff.map((debuff, index) => (
              <DebuffItem key={index} debuff={debuff} />
            ))}
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.left}>
          <button className={styles.shop}>
            <Link href="/shop">
              <Image
                src={getIconPath("shop")}
                width={60}
                height={60}
                alt="shop"
              ></Image>
              <p>SHOP</p>
            </Link>
          </button>
          <button className={styles.report}>
            <Link href="/report">
              <Image
                src={getIconPath("report")}
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
                src={getIconPath("hospital")}
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
                src={getIconPath("single")}
                width={60}
                height={60}
                alt="single"
              ></Image>
            </button>
          </Link>
          <Link href="/multi">
            <button className={styles.multi}>
              <Image
                src={getIconPath("pvp")}
                width={60}
                height={60}
                alt="multi"
              ></Image>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
