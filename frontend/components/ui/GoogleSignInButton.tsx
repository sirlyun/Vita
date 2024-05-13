import styles from "@/public/styles/login.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons";

export default function GoogleSignInButton() {
  const requestCodeUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=609175007986-4nadjui4c11ingavajsmgljld5c4d3he.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile";

  return (
    <div>
      <a
        href={requestCodeUrl}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles["google-sign-in-layout"]}>
          <Image
            src={getIconPath("google-logo")}
            width={60}
            height={60}
            alt="google-logo"
          ></Image>
          <p>Google Login</p>
          <div></div>
        </div>
      </a>
    </div>
  );
}
