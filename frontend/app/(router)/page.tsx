import Link from "next/link";
import styles from "@/public/styles/main.module.css";

export default function Home() {
  return (
    <div className={`${styles.main} background`}>
      <div>I'm now here in main</div>
      <button>
        <Link href="/login">go to login</Link>
      </button>
      <button>
        <Link href="/attendance">go to attendance</Link>
      </button>
    </div>
  );
}
