import { Modal } from "@/app/@modal/modal";

import Link from "next/link";
import styles from "@/public/styles/modal.module.scss";

export default function OptionModal() {
  return (
    <div>
      <Modal option={0}>
        <h1 className={`${styles.title} ${styles.center}`}>SETTING</h1>
        <div className={`${styles.content} ${styles.center}`}>
          <div className={`${styles.item} ${styles.center}`}>
            <Link href="/settings/background">
              <button>
                <p>배경화면</p>
              </button>
            </Link>
            <Link href="/">
              <button>
                <p>로그아웃</p>
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
