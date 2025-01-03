import { useContext } from "react";
import MealItem from "./MealItem";
import { MealCartContext } from "../store/meal_cart_context";

export default function Meals({ loadingMessage }) {
  const {
    fetchData: meals,
    isLoading,
    error,
    addItemToCart: onAddMeal,
  } = useContext(MealCartContext);

  return (
    <div id="meals">
      {isLoading && <p>{loadingMessage}</p>}
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} onAddMeal={onAddMeal} />
      ))}
    </div>
  );
}
