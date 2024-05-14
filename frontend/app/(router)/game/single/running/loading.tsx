import styles from "@/public/styles/workout.module.scss";

export default function Page() {
  return (
    <div className={`bg ${styles.main} ${styles["bg-idle"]}`}>
      <div className={styles.mid}>
        <p>로딩중..</p>
      </div>
      <div className={styles.bottom}>
        <button>
          <p>로딩중..</p>
        </button>
      </div>
    </div>
  );
}
