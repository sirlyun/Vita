import Image from "next/image";
import Link from "next/link";
import { getIconPath } from "@/util/icons.js";

export default function DebuffItemComponent({ debuff }: { debuff: DeBuff }) {
  return (
    <Link
      href={{
        pathname: `/debuff/${debuff.de_buff_id}`,
        query: {
          type: debuff.type,
          vita_point: debuff.vita_point,
        },
      }}
    >
      <Image
        src={getIconPath(debuff.type)}
        width={120}
        height={120}
        alt={debuff.type}
      ></Image>
    </Link>
  );
}
