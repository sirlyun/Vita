import Link from "next/link";
import styles from "../public/styles/main.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>I'm now here in main</div>
      <button>
        <Link href="/login">go to login</Link>
      </button>
    </main>
  );
}
