import { FC, ReactNode } from "react";
import { signIn } from "next-auth/react";
import styles from "@/public/styles/login.module.scss";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC = () => {
  const loginWithGoogleSign = () => {
    console.log("login with google");
  };

  return (
    <img
      className={styles["google-login"]}
      src="/images/google-login.png"
      alt=""
    />
  );
};
export default GoogleSignInButton;
