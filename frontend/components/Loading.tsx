import styles from "@/public/styles/loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
      {/* 원하는 스타일과 애니메이션을 추가하세요 */}
    </div>
  );
}
