import styles from "@/public/styles/nutrition.module.scss";
import useStopPropagation from "@/components/UseStopPropagation";
import NutritionItem from "@/components/health/food/NutritionItem";
import icons from "@/util/icons";
import Image from "next/image";
import { getUserCharacterImagePath } from "@/util/images";

interface FoodNutritionProps {
  onClose: () => void; // onClose 함수 타입 정의
}

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

const FoodNutrition = ({ onClose }: FoodNutritionProps) => {
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
    <div>
      <div className={styles.cancel}>
        <div></div>
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
        className={`${styles["board-frame"]}`}
      >
        <div className={styles.nickname}>눈물의 여왕</div>
        <div className={styles.character}>
          <Image
            src={getUserCharacterImagePath("woman", "avg", "idle", 0)}
            width={55}
            height={115}
            alt="damagochi"
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
