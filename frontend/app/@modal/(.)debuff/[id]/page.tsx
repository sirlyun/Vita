"use client";
import { useEffect, useState } from "react";
import { Modal } from "../../modal";
import { useSearchParams } from "next/navigation";
import styles from "@/public/styles/modal.module.scss";

export default function DebuffModal({
  params: { id: debuffId },
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const [debuff, setDebuff] = useState({
    de_buff_id: "",
    type: "",
    vita_point: "",
  });

  useEffect(() => {
    const de_buff_id = debuffId;
    const type = searchParams.get("type");
    const vita_point = searchParams.get("vita_point");

    if (de_buff_id && type && vita_point) {
      setDebuff({
        de_buff_id,
        type,
        vita_point,
      });
    }
  }, [searchParams]);

  const desc: { [key: number]: string } = {
    1: "잦은 흡연은 만성 폐쇄성 폐질환(COPD)와 폐암 같은 호흡기 질환과 관상동맥질환, 뇌졸중 등의 심혈관 질환을 유발합니다. 또한 다양한 암, 피부 노화, 발기부전 및 불임 같은 생식기 질환의 위험을 증가시킵니다.", // 담배
    2: "과도한 음주는 간경변, 알코올성 간염 등의 간 질환과 위염, 췌장염 등의 소화기 질환을 유발할 수 있습니다. 또한 고혈압, 심근증 같은 심혈관 질환, 여러 종류의 암, 알코올 의존증 및 정신 건강 문제를 초래할 수 있습니다.", // 술
    3: "만성질환을 가진 분들은 규칙적인 운동, 건강한 식습관, 정기적인 의사 상담, 약물 복용 지침 준수, 스트레스 관리, 충분한 수면으로 꾸준히 관리해야 합니다.", // 만성질환
  };

  const calculationExample = (type: string) => {
    switch (type) {
      case "SMOKE": {
        return "ex) 2(아이코스) x 1(1갑 미만)";
      }
      case "DRINK": {
        return "ex) 3(양주) x 1(1병 미만)";
      }
      case "CHRONIC": {
        return "";
      }
      default:
        "WRONTG TYPE";
    }
  };
  const debuffDescription = desc[parseInt(debuff.de_buff_id)];
  return (
    <div>
      {debuff ? (
        <Modal option={0}>
          <h1 className={`${styles.title} ${styles.center}`}>
            {debuff.type == "SMOKE"
              ? "담배"
              : debuff.type == "DRINK"
              ? "술"
              : "만성질환"}
          </h1>
          <div className={`${styles.content} ${styles.center}`}>
            <div className={`${styles.item} ${styles.center}`}>
              <p className={styles.left}>{debuffDescription}</p>
              <br />
              {debuff ? (
                <div className={styles["color-font"]}>
                  <p>수명: -{debuff.vita_point}년/일</p>
                  <p className={styles.small}>
                    {debuff.type !== "CHRONIC"
                      ? "계산법: (종류) x (양)"
                      : "계산법: 만성지병 개수 x 1"}
                  </p>
                  <p className={styles.small}>
                    {calculationExample(debuff.type)}
                  </p>
                </div>
              ) : (
                <p>No debuff found</p>
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <p>No debuff found</p>
      )}
    </div>
  );
}
