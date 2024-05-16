import styles from "@/public/styles/loading.module.scss";

export default function SingleResult() {
  return (
    <div>
      <div className={styles.loading}>
        <h1>로딩중..</h1>
      </div>
    </div>
  );
}
