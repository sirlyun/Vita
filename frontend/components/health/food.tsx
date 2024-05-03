import React, { MouseEvent, useCallback, useState, ChangeEvent } from "react";

import styles from "@/public/styles/health.module.scss";
import nutri from "@/public/styles/nutrition.module.scss";
import Image from "next/image";
import images from "@/util/images";
import icons from "@/util/icons";
import useStopPropagation from "@/components/UseStopPropagation";
import NutritionItem from "@/components/health/nutrition-item";
import { getImagePath } from "@/util/images";

interface NutritionalInfo {
  name: string;
  image: string;
  unit: string;
  consumedAmount: number;
  recommendedAmount: number;
}

interface FoodNutritionalDetails {
  calories: NutritionalInfo;
  salts: NutritionalInfo;
  sugars: NutritionalInfo;
  fats: NutritionalInfo;
  proteins: NutritionalInfo;
}

const Loading = () => (
  <div>
    <p className={styles["food-analyze"]}>
      올려주신 <br></br>음식 이미지를 분석중입니다..! <br></br>잠시만
      기다려주세요!
    </p>
  </div>
);

const MOVIE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(MOVIE_URL);
  const json = await response.json();
  return json;
}

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

interface FoodImageFrameProps {
  onClose: () => void;
  complete: (status: boolean) => void;
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

const IntakeContent = () => {
  const intakeOptions: string[] = ["0.5인분", "1인분", "n인분"];
  const [selectedIntake, setSelectedIntake] = useState("1인분");

  const handleOptionClick = (option: string) => {
    setSelectedIntake(option);
    console.log(option);
  };

  return (
    <div className={styles["intake-layout"]}>
      <div className={styles["intake-title"]}>섭취량</div>
      <div className={styles["intake-content-layout"]}>
        {intakeOptions.map((option, index) => (
          <div
            key={index}
            className={`${styles["selected-intake"]} ${
              selectedIntake === option ? "" : styles["unselected-intake"]
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FoodNutrition = () => {
  const handleModalContentClick = useStopPropagation();

  const foodNutrition: FoodNutritionalDetails = {
    calories: {
      name: "칼로리",
      image: icons.kcal,
      unit: "kcal",
      consumedAmount: 1000,
      recommendedAmount: 2000,
    },
    salts: {
      name: "나트륨",
      image: icons.salt,
      unit: "mg",
      consumedAmount: 1000,
      recommendedAmount: 2300,
    },
    sugars: {
      name: "당분",
      image: icons.sugar,
      unit: "g",
      consumedAmount: 19,
      recommendedAmount: 37.5,
    },
    fats: {
      name: "지방",
      image: icons.fat,
      unit: "g",
      consumedAmount: 30,
      recommendedAmount: 70,
    },
    proteins: {
      name: "단백질",
      image: icons.protein,
      unit: "g",
      consumedAmount: 21,
      recommendedAmount: 56,
    },
  };

  return (
    <div
      onClick={handleModalContentClick}
      className={`${nutri["board-frame"]}`}
    >
      <div className={nutri.nickname}>눈물의 여왕</div>
      <div className={nutri.character}>
        <Image
          src={getImagePath("characters", "woman", "avg", "idle", 0)}
          width={55}
          height={115}
          alt="damagochi"
        ></Image>
      </div>
      <div className={`${nutri["nutrition-frame"]}`}>
        {Object.values(foodNutrition).map((nutrient, index) => (
          <NutritionItem
            key={index}
            name={nutrient.name}
            image={nutrient.image}
            unit={nutrient.unit}
            consumedAmount={nutrient.consumedAmount}
            recommendedAmount={nutrient.recommendedAmount}
          />
        ))}
      </div>
    </div>
  );
};

function HealthFood({ onClose, complete }: FoodImageFrameProps) {
  type ImageUrl = string | null;

  const [foodImage, setFoodImage] = useState<ImageUrl>(null);
  const [nextStep, setNextStep] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleCompleteClick = async () => {
    setIsLoading(true);
    try {
      const movies = await getMovies();
      setIsComplete(true);
      console.log(movies);
    } catch (error) {
      console.error("failed to fetch movies");
    }

    setIsLoading(false);
  };

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

  const selectFile = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleModalContentClick = useStopPropagation();
  const handleMealClick = useCallback((mealType: string) => {
    setSelectedMeal(mealType);

    console.log(`${mealType} was clicked`);
  }, []);

  return (
    <div
      onClick={onClose}
      className={`${styles["dark-overlay"]} dark-overlay-recycle`}
    >
      {isComplete ? (
        <FoodNutrition />
      ) : (
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
              {isLoading ? (
                <Loading />
              ) : nextStep ? (
                <IntakeContent />
              ) : foodImage ? (
                <ShowImage foodImage={foodImage} selectFile={selectFile} />
              ) : (
                <UploadImage
                  selectFile={selectFile}
                  handleImageChange={handleImageChange}
                />
              )}
            </div>
            {nextStep ? (
              <div
                onClick={handleCompleteClick}
                className={styles["next-step"]}
              >
                <p>확인</p>
              </div>
            ) : foodImage ? (
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
      )}
    </div>
  );
}

export default HealthFood;
