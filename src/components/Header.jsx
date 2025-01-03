import { useContext } from "react";
import { MealCartContext } from "../store/meal_cart_context";

import logoImg from "../assets/logo.jpg";

export default function Header() {
  const { cartQuantity, modalIsOpen: onOpenCart } = useContext(MealCartContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button" onClick={onOpenCart}>
        Cart ({cartQuantity()})
      </button>
    </header>
  );
}
