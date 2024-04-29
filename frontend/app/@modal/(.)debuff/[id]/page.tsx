import { Modal } from "../../modal";

import Link from "next/link";
import styles from "@/public/styles/modal.module.scss";

function useDebuff(optionId: string) {
  const debuffList = [
    { id: 0, content: "alcohol", rate: 1 },
    { id: 1, content: "cigarette", rate: 1 },
    { id: 2, content: "food", rate: 1 },
    { id: 3, content: "chronic", rate: 2 },
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
        <Modal>
          <h1 className={`${styles.title} ${styles.center}`}>
            {selectedDebuff.content}
          </h1>
          <div className={`${styles.content} ${styles.center}`}>
            <div className={`${styles.item} ${styles.center}`}>
              {selectedDebuff ? (
                <button>
                  <p>-{selectedDebuff.rate}년/일</p>
                </button>
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
