import { MouseEvent, useCallback, useState, ChangeEvent } from "react";

import styles from "@/public/styles/health.module.scss";
import Image from "next/image";
import images from "@/util/images";
import icons from "@/util/icons";

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

// Props 타입 정의
interface UploadImageProps {
  selectFile: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({ selectFile, handleImageChange }: UploadImageProps) => (
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
      src={images.camera} // 예제 이미지 경로
      width={100}
      height={100}
      alt="camera"
    />
  </div>
);

// Props 타입 정의
interface ShowImageProps {
  foodImage: string;
  selectFile: () => void;
}

const ShowImage = ({ foodImage, selectFile }: ShowImageProps) => (
  <div>
    <Image
      onClick={selectFile}
      src={foodImage}
      alt="foodImage"
      width={100}
      height={100}
      quality={100}
    />
  </div>
);

const NextStepContent = () => <div>zxcv</div>;

export default function HealthFood({ onClose }: FoodImageFrameProps) {
  type ImageUrl = string | null;

  const [foodImage, setFoodImage] = useState<ImageUrl>(null);

  const [nextStep, setNextStep] = useState(false);

  const toggleNextStep = () => {
    setNextStep(!nextStep);
  };

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
              src={images.breakfast}
              mealType="breakfast"
              onClick={handleMealClick}
              selected={selectedMeal === "breakfast"}
            />
            <MealImage
              src={images.lunch}
              mealType="lunch"
              onClick={handleMealClick}
              selected={selectedMeal === "lunch"}
            />
            <MealImage
              src={images.dinner}
              mealType="dinner"
              onClick={handleMealClick}
              selected={selectedMeal === "dinner"}
            />
          </div>
          <Image
            onClick={onClose}
            src={icons.cancel}
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
            {nextStep ? (
              <NextStepContent />
            ) : foodImage ? (
              <ShowImage foodImage={foodImage} selectFile={selectFile} />
            ) : (
              <UploadImage
                selectFile={selectFile}
                handleImageChange={handleImageChange}
              />
            )}
          </div>
          {foodImage ? (
            <div onClick={toggleNextStep} className={styles["next-step"]}>
              <p>다음</p>
            </div>
          ) : (
            <p className={styles["food-choice-text"]}>
              오늘 드신 음식 이미지를 선택해주세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
