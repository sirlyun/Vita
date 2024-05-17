import Image, { StaticImageData } from "next/image";
import styles from "@/public/styles/chronic.module.scss";

interface Props {
  chronic: string | null;
  setChronic: (value: string | null) => void;
  option: string | null;
  icon: StaticImageData;
  name: string;
}

export default function ChronicOption({
  chronic,
  setChronic,
  option,
  icon,
  name,
}: Props) {
  const divClass =
    chronic === "none"
      ? styles["selected-div"]
      : chronic === option
      ? styles["selected-div"]
      : styles["unselected-div"];

  return (
    <div className={divClass} onClick={() => setChronic(option)}>
      <button>
        <Image src={icon} width={60} height={60} alt={name}></Image>
      </button>
      <p>{name}</p>
    </div>
  );
}
