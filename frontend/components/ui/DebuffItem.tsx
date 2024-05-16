import Image from "next/image";
import Link from "next/link";
import { getIconPath } from "@/util/icons.js";

export default function DebuffItemComponent({ debuff }: { debuff: DeBuff }) {
  return (
    <Link
      href={{
        pathname: `/debuff/${debuff.de_buff_id}`,
        query: {
          de_buff_id: debuff.de_buff_id,
          type: debuff.type,
          vita_point: debuff.vita_point,
        },
      }}
    >
      <Image
        src={getIconPath(debuff.type)}
        width={60}
        height={60}
        alt={debuff.type}
      ></Image>
    </Link>
  );
}
