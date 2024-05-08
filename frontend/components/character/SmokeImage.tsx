import React, { MouseEvent, useCallback } from "react";
import styles from "@/public/styles/character.module.scss";

import Image from "next/image";

interface SmokeImageProps {
  src: string;
  selected: boolean;
  style?: React.CSSProperties;
}

const SmokeImage = ({ src, selected, style }: SmokeImageProps) => {
  const quantityClass = selected
    ? styles["selected-quantity"]
    : styles["unselected-quantity"];

  return (
    <Image
      src={src}
      width={60}
      height={60}
      alt="quantity"
      className={quantityClass}
    />
  );
};

export default SmokeImage;
