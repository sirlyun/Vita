import { Modal } from "../../modal";

import styles from "@/public/styles/modal.module.scss";

function useDebuff(optionId: string) {
  const debuffList = [
    { id: 1, content: "담배", rate: 1 },
    { id: 2, content: "술", rate: 1 },
    { id: 3, content: "만성 질병", rate: 2 },
  ];

  const optionIdNumber = parseInt(optionId, 10);
  const selectedDebuff = debuffList.find(
    (debuff) => debuff.id === optionIdNumber
  );

  return selectedDebuff;
}

export default function OptionModal({
  params: { id: optionId },
}: {
  params: { id: string };
}) {
  const selectedDebuff = useDebuff(optionId);
  return (
    <div>
      {selectedDebuff ? (
        <Modal option={0}>
          <h1 className={`${styles.title} ${styles.center}`}>
            {selectedDebuff.content}
          </h1>
          <div className={`${styles.content} ${styles.center}`}>
            <div className={`${styles.item} ${styles.center}`}>
              {selectedDebuff ? (
                <p>-{selectedDebuff.rate}년/일</p>
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
