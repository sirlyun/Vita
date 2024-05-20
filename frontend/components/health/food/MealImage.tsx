import React, { MouseEvent, useCallback } from "react";
import styles from "@/public/styles/meal.module.scss";
import Image from "next/image";

interface MealImageProps {
  src: string;
  mealType: string;
  onClick: (mealType: string) => void;
  selected: boolean;
}

const MealImage = ({ src, mealType, onClick, selected }: MealImageProps) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      onClick(mealType);
    },
    [mealType, onClick]
  );

  const mealClass = selected
    ? styles["selected-meal"]
    : styles["unselected-meal"];

  return (
    <Image
      src={src}
      width={60}
      height={60}
      alt={mealType}
      onClick={handleClick}
      className={mealClass}
    />
  );
};

export default MealImage;
