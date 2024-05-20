import { Modal } from "@/app/@modal/modal";
import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  return (
    <div>
      <Modal option={0}>
        <div className={styles.content}>
          <h1>로딩중..</h1>
        </div>
      </Modal>
    </div>
  );
}
