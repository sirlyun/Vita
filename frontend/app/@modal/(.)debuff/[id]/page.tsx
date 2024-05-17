"use client";
import { useEffect, useState } from "react";
import { Modal } from "../../modal";

import styles from "@/public/styles/modal.module.scss";
import { useSearchParams } from "next/navigation";

export default function DebuffModal({
  params: { id: optionId },
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
    const de_buff_id = optionId;
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

  return (
    <div>
      {debuff ? (
        <Modal option={0}>
          <h1 className={`${styles.title} ${styles.center}`}>{debuff.type}</h1>
          <div className={`${styles.content} ${styles.center}`}>
            <div className={`${styles.item} ${styles.center}`}>
              {debuff ? (
                <p>-{debuff.vita_point}년/일</p>
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
