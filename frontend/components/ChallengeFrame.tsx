"use client";
import styles from "@/public/styles/challenge.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons";
import useStopPropagation from "@/components/UseStopPropagation";
import { useEffect, useState } from "react";
import { getDailyChallenge } from "@/api/challenge";
import { postChallenge } from "@/api/challenge";

interface ChallengeFrameProps {
  onClose: () => void;
}

interface Challenge {
  challenge_id: number;
  name: string;
  standard: number;
  score: number;
  is_done: boolean;
}
const challengeOutputMap: { [key: string]: string } = {
  health: "문진",
  food: "식단 등록",
  running: "러닝",
  training: "훈련",
};

export default function ChallengeFrame({ onClose }: ChallengeFrameProps) {
  const handleModalContentClick = useStopPropagation();

  const [challengeData, setChallengeData] = useState<Challenge[]>([]);

  function getChallengeOutput(challengeName: Challenge["name"]): string {
    return challengeOutputMap[challengeName];
  }

  // 챌린지 보상 요청
  const handleCompleteClick = (challengeId: number) => async () => {
    try {
      const complete = await postChallenge(challengeId);
      console.log(complete);
    } catch (error) {
      console.error("챌린지 보상 요청에 실패했습니다", error);
    }
  };

  // 일일 챌린지 가져오기
  const fetchDailyChallenge = async () => {
    try {
      const fetchedDailyChallenge = await getDailyChallenge();

      setChallengeData(fetchedDailyChallenge.challenge);
    } catch (error) {
      console.error("일일 챌린지 데이터를 가져오는데 실패했습니다", error);
    }
  };

  useEffect(() => {
    fetchDailyChallenge();
  }, []);

  return (
    <div
      className={`${styles["dark-overlay"]} dark-overlay-recycle`}
      onClick={onClose}
    >
      <div className={styles["cancel-div"]}>
        <Image
          onClick={onClose}
          src={getIconPath("cancel")}
          width={60}
          height={60}
          alt="cancelIcon"
        ></Image>
      </div>

      <div
        className={`${styles["modal-layout"]} modal-layout-recycle`}
        onClick={handleModalContentClick}
      >
        <div className={styles["challenge-title-frame"]}>
          <p className={styles["challenge-title-text"]}>일일 챌린지</p>
        </div>
        <div className={`${styles["modal-content"]} modal-content-recycle`}>
          {challengeData.map((challenge) => (
            <div
              onClick={handleCompleteClick(challenge.challenge_id)}
              key={challenge.challenge_id}
              className={styles["challenge-info-frame"]}
            >
              <div className={styles["challenge-name"]}>
                {challenge.is_done
                  ? "이미 보상을 받은 챌린지입니다"
                  : getChallengeOutput(challenge.name)}
              </div>
              <div className={styles["challenge-score"]}>
                <div
                  style={{
                    width: `${(challenge.score / challenge.standard) * 100}%`,
                  }}
                  className={styles["score-gauge"]}
                ></div>
                <p>
                  {challenge.score}/{challenge.standard}회
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
