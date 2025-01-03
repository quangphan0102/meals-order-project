import { useContext } from "react";
import { MealCartContext } from "../store/meal_cart_context";
import TextButton from "./TextButton";
import Button from "./Button";

export default function CartInformations() {
  const {
    cart,
    updateItemQuantity: onUpdateItem,
    modalIsClose: onCloseModal,
    checkOutIsOpen,
    cartTotal,
  } = useContext(MealCartContext);

  return (
    <>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((cartItem) => (
          <li key={cartItem.id} className="cart-item">
            <p>
              {cartItem.name} - {cartItem.quantity} X ${cartItem.price}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => onUpdateItem(cartItem.id, -1)}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => onUpdateItem(cartItem.id, 1)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">${cartTotal()}</p>
      <p className="modal-actions">
        <TextButton onClick={onCloseModal}>Close</TextButton>
        {cart.length > 0 && (
          <Button onClick={checkOutIsOpen}>Go to Checkout</Button>
        )}
      </p>
    </>
  );
}
