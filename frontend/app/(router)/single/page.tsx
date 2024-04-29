import Link from "next/link";
import icons from "@/util/icons";
import Image from "next/image";
import style from "@/public/styles/game.module.scss";

export default function OptionModal() {
  return (
    <div className={`${style.main} ${style.bg}`}>
      <div className={style.title}>
        <h1>RANKING</h1>
      </div>

      <div className={`${style.board} ${style.bg}`}>board</div>
      <div className={style["btn-container"]}>
        <Link href="/running">
          <button className={style.bg}>
            <Image
              src={icons.running}
              width={60}
              height={60}
              alt="running icon"
            ></Image>
          </button>
        </Link>
        <Link href="/running">
          <button className={style.bg}>
            <Image
              src={icons.gym}
              width={60}
              height={60}
              alt="gym icon"
            ></Image>
          </button>
        </Link>
      </div>
    </div>
  );
}
