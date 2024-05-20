import styles from "@/public/styles/nutrition.module.scss";
import useStopPropagation from "@/components/UseStopPropagation";
import NutritionItem from "@/components/health/food/NutritionItem";
import { getIconPath } from "@/util/icons";
import Image from "next/image";
import { getUserCharacterImagePath } from "@/util/images";
import { getCookie } from "@/util/axios";

interface FoodNutritionProps {
  onClose: () => void; // onClose 함수 타입 정의
  calrorie: string;
  salt: string;
  protein: string;
  sugar: string;
  fat: string;
}

interface NutritionalInfo {
  name: string;
  image: string;
  unit: string;
  consumedAmount: string;
  recommendedAmount: number;
}

interface FoodNutritionalDetails {
  calories: NutritionalInfo;
  salts: NutritionalInfo;
  sugars: NutritionalInfo;
  fats: NutritionalInfo;
  proteins: NutritionalInfo;
}

const FoodNutrition = ({
  onClose,
  calrorie,
  salt,
  protein,
  sugar,
  fat,
}: FoodNutritionProps) => {
  const nickname = getCookie("nickname");
  const gender = getCookie("gender");
  const bodyShape = getCookie("bodyShape");

  const handleModalContentClick = useStopPropagation();

  const foodNutrition: FoodNutritionalDetails = {
    calories: {
      name: "칼로리",
      image: getIconPath("kcal"),
      unit: "kcal",
      consumedAmount: calrorie,
      recommendedAmount: 2300,
    },
    salts: {
      name: "나트륨",
      image: getIconPath("salt"),
      unit: "mg",
      consumedAmount: salt,
      recommendedAmount: 2300,
    },
    sugars: {
      name: "당분",
      image: getIconPath("sugar"),
      unit: "g",
      consumedAmount: sugar,
      recommendedAmount: 37.5,
    },
    fats: {
      name: "지방",
      image: getIconPath("fat"),
      unit: "g",
      consumedAmount: fat,
      recommendedAmount: 70,
    },
    proteins: {
      name: "단백질",
      image: getIconPath("protein"),
      unit: "g",
      consumedAmount: protein,
      recommendedAmount: 56,
    },
  };

  return (
    <div>
      <div className={styles.cancel}>
        <div></div>
        <Image
          onClick={onClose}
          src={getIconPath("cancel")}
          width={60}
          height={60}
          alt="cancelIcon"
        ></Image>
      </div>

      <div
        onClick={handleModalContentClick}
        className={`${styles["board-frame"]}`}
      >
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.character}>
          <Image
            src={getUserCharacterImagePath(gender, bodyShape, "idle", 0)}
            width={55}
            height={115}
            alt="myCharacter"
          ></Image>
        </div>
        <div className={`${styles["nutrition-frame"]}`}>
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
    </div>
  );
};

export default FoodNutrition;
