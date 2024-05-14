"use client";

import { Modal } from "@/app/@modal/modal";
import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  return (
    <div>
      <Modal option={0}>
        <div className={styles.content}>
          <h1>집계중..</h1>
        </div>
      </Modal>
    </div>
  );
}
