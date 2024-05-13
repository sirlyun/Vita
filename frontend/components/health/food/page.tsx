import React, { useCallback, useState, ChangeEvent } from "react";

import styles from "@/public/styles/health.module.scss";
import Image from "next/image";
import images from "@/util/images";
import icons from "@/util/icons";
import useStopPropagation from "@/components/UseStopPropagation";
import MealImage from "@/components/health/food/MealImage";
import FoodNutrition from "@/components/health/food/FoodNutrition";
import ShowImage from "@/components/ShowImage";
import IntakeContent from "@/components/health/food/IntakeContent";
import { getFood } from "@/api/health";

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

interface FoodImageFrameProps {
  onClose: () => void;
}

function HealthFood({ onClose }: FoodImageFrameProps) {
  type ImageUrl = string | null;
  const [foodImage, setFoodImage] = useState<ImageUrl>(null);
  const [calrorie, setCalrorie] = useState<string>("");
  const [salt, setSalt] = useState<string>("");
  const [sugar, setSugar] = useState<string>("");
  const [fat, setFat] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedIntake, setSelectedIntake] = useState<"MID" | "LOW" | "HIGH">(
    "MID"
  );
  const [foodImagePost, setFoodImagePost] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFoodImage(imageUrl);
      setFoodImagePost(file);
    }
  };

  const selectFile = () => {
    document.getElementById("fileInput")?.click();
  };

  function renderContent() {
    if (isComplete) {
      return (
        <FoodNutrition
          calrorie={calrorie}
          salt={salt}
          sugar={sugar}
          fat={fat}
          protein={protein}
          onClose={onClose}
        />
      );
    } else if (isLoading) {
      return <Loading />;
    } else if (step === 1) {
      return (
        <IntakeContent
          selectedIntake={selectedIntake}
          setSelectedIntake={setSelectedIntake}
        />
      );
    } else if (step === 0) {
      if (foodImage) {
        return (
          <ShowImage
            foodImage={foodImage}
            selectFile={selectFile}
            handleImageChange={handleImageChange}
          />
        );
      } else {
        return (
          <ShowImage
            foodImage={images.camera}
            selectFile={selectFile}
            handleImageChange={handleImageChange}
          />
        );
      }
    }
  }

  const handleCompleteClick = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (foodImagePost) {
      formData.append("image", foodImagePost);
    }
    const intakeData = JSON.stringify({ quantity: selectedIntake });
    const blob = new Blob([intakeData], {
      type: "application/json",
    });
    formData.append("json", blob);

    const responseNutrition = await getFood(formData);
    console.log(responseNutrition);
    setCalrorie(responseNutrition.calorie);
    setSalt(responseNutrition.salt);
    setSugar(responseNutrition.sugar);
    setFat(responseNutrition.fat);
    setProtein(responseNutrition.protein);

    setIsComplete(true);

    setIsLoading(false);
  };

  const handleNext = (): void => {
    setStep(step + 1);
  };

  const handlePrev = (): void => {
    if (step > 0) {
      setStep(step - 1);
    }
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
        <FoodNutrition
          calrorie={calrorie}
          salt={salt}
          sugar={sugar}
          fat={fat}
          protein={protein}
          onClose={onClose}
        />
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
              {renderContent()}
            </div>
            {step === 1 ? (
              <div className={styles["step"]}>
                <button onClick={handlePrev}>이전</button>
                <button onClick={handleCompleteClick}>확인</button>
              </div>
            ) : foodImage ? (
              <div onClick={handleNext} className={styles["step"]}>
                <button>다음</button>
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
