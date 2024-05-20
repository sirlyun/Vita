import Image from "next/image";
import styles from "@/public/styles/nutrition.module.scss";
interface NutritionItemProps {
  name: string;
  image: string;
  unit: string;
  consumedAmount: number;
  recommendedAmount: number;
}

const NutritionItem = ({
  name,
  image,
  consumedAmount,
  recommendedAmount,
  unit,
}: NutritionItemProps) => (
  <div className={`${styles["nutrition-div"]}`}>
    <div className={`${styles["nutrition-left"]}`}>
      <Image src={image} width={40} height={40} alt={name} />
      <p>{name}</p>
    </div>
    <div className={`${styles["nutrition-bar"]}`}>
      <div
        className={`${styles["nutrition-gauge"]}`}
        style={{ width: `${(consumedAmount / recommendedAmount) * 100}%` }}
      ></div>
      <div className={styles.amount}>
        {consumedAmount + "/" + recommendedAmount}
        {unit}
      </div>
    </div>
  </div>
);

export default NutritionItem;
