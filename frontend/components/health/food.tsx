import React, { useCallback, useState, ChangeEvent } from "react";

import styles from "@/public/styles/health.module.scss";
import Image from "next/image";
import images from "@/util/images";
import icons from "@/util/icons";
import useStopPropagation from "@/components/UseStopPropagation";
import MealImage from "@/components/health/MealImage";
import FoodNutrition from "@/components/health/FoodNutrition";
import ShowImage from "@/components/ShowImage";
import UploadImage from "@/components/UploadImage";
import IntakeContent from "@/components/health/IntakeContent";

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
  complete: (status: boolean) => void;
}

function HealthFood({ onClose, complete }: FoodImageFrameProps) {
  type ImageUrl = string | null;

  const [foodImage, setFoodImage] = useState<ImageUrl>(null);
  const [nextStep, setNextStep] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  function renderContent() {
    if (isComplete) {
      return <FoodNutrition onClose={onClose} />;
    } else if (isLoading) {
      return <Loading />;
    } else if (nextStep) {
      return <IntakeContent />;
    } else if (foodImage) {
      return <ShowImage foodImage={foodImage} selectFile={selectFile} />;
    } else {
      return (
        <UploadImage
          selectFile={selectFile}
          handleImageChange={handleImageChange}
        />
      );
    }
  }

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
        <FoodNutrition onClose={onClose} />
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
