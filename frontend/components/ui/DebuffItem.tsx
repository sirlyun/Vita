import Image from "next/image";
import Link from "next/link";
import { debuffIcons, getIconPath } from "@/util/icons.js";

export default function DebuffItemComponent({ debuff }: { debuff: DeBuff }) {
  return (
    <Link href={`/debuff/${debuff.de_buff_id}`}>
      <Image
        src={getIconPath(debuff.type)}
        width={60}
        height={60}
        alt={debuff.type}
      ></Image>
    </Link>
  );
}
