import styles from "@/public/styles/login.module.scss";
import GoogleSignIn from "@/components/ui/GoogleSignInButton";
export default function Page() {
  return (
    <div className={styles["login-box"]}>
      <div className={styles["login-title"]}>Login</div>
      <GoogleSignIn />
    </div>
  );
}
