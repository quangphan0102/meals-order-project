import { useEffect, useRef, useContext } from "react";
import { MealCartContext } from "../store/meal_cart_context";

export default function Modal({ children, ...props }) {
  const { modal: open } = useContext(MealCartContext);

  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog {...props} ref={dialog}>
      {children}
    </dialog>
  );
}
