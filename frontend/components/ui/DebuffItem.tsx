import Image from "next/image";
import Link from "next/link";
import { debuffIcons } from "@/util/icons.js";

export default function DebuffItemComponent(debuffId: number) {
  return (
    <Link href={`/debuff/${debuffId}`}>
      <Image
        src={debuffIcons[debuffId].ref}
        width={60}
        height={60}
        alt={debuffIcons[debuffId].name}
      ></Image>
    </Link>
  );
}
