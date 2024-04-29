import { MouseEvent, useCallback, useState, ChangeEvent } from "react";

import styles from "@/public/styles/health.module.scss";
import Image, { StaticImageData } from "next/image";
import clockBreakfast from "@/public/images/clock-breakfast.png";
import clockLunch from "@/public/images/clock-lunch.png";
import clockDinner from "@/public/images/clock-dinner.png";
import cancelIcon from "@/public/images/cancel.png";
import camera from "@/public/images/camera.png";

interface MealImageProps {
  src: StaticImageData;
  mealType: string;
  onClick: (mealType: string) => void;
  selected: boolean;
}

const MealImage = ({ src, mealType, onClick, selected }: MealImageProps) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      onClick(mealType);
      // API 연동
    },
    [mealType, onClick]
  );

  const mealClass = selected ? "" : styles.unselected;

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

interface FoodImageFrameProps {
  onClose: () => void;
}

export default function HealthFood({ onClose }: FoodImageFrameProps) {
  type ImageUrl = string | null;

  const [foodImage, setFoodImage] = useState<ImageUrl>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFoodImage(imageUrl);
    }
  };

  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const selectFile = () => {
    document.getElementById("fileInput")?.click();
  };
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMealClick = useCallback((mealType: string) => {
    setSelectedMeal(mealType);
    console.log(`${mealType} was clicked`);
  }, []);

  return (
    <div
      onClick={onClose}
      className={`${styles["dark-overlay"]} dark-overlay-recycle`}
    >
      <div className={styles.frame}>
        <div className={styles["clock-and-cancel-frame"]}>
          <div className={styles["clock-frame"]}>
            <MealImage
              src={clockBreakfast}
              mealType="breakfast"
              onClick={handleMealClick}
              selected={selectedMeal === "breakfast"}
            />
            <MealImage
              src={clockLunch}
              mealType="lunch"
              onClick={handleMealClick}
              selected={selectedMeal === "lunch"}
            />
            <MealImage
              src={clockDinner}
              mealType="dinner"
              onClick={handleMealClick}
              selected={selectedMeal === "dinner"}
            />
          </div>
          <Image
            onClick={onClose}
            src={cancelIcon}
            width={60}
            height={60}
            alt="cancelIcon"
          ></Image>
        </div>
        <div
          onClick={handleModalContentClick}
          className={`${styles["modal-layout"]} modal-layout-recycle`}
        >
          <div className={styles["modal-title"]}>
            <p>{selectedMeal}</p>
          </div>
          <div className={`${styles["modal-content"]} modal-content-recycle`}>
            {foodImage ? (
              <div>
                <input
                  type="file"
                  hidden
                  id="fileInput"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
                />
                <Image
                  onClick={selectFile}
                  src={foodImage}
                  alt="foodImage"
                  width={100}
                  height={100}
                  quality={100}
                ></Image>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  hidden
                  id="fileInput"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
                />
                <Image
                  onClick={selectFile}
                  src={camera}
                  width={100}
                  height={100}
                  alt="camera"
                ></Image>
              </div>
            )}
          </div>
          {foodImage ? (
            <div className={styles["next-level"]}>
              <p>다음</p>
            </div>
          ) : (
            <p className={styles["food-choice-text"]}>
              오늘 먹은 음식 이미지를 선택해주세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
