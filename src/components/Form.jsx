import { useFormState } from "react-dom";
import { useContext, useEffect, useRef } from "react";
import { MealCartContext } from "../store/meal_cart_context";

import Input from "./Input";
import TextButton from "./TextButton";
import Button from "./Button";

export default function Form() {
  function formMealAction(formData) {
    const email = formData.get("email");
    const street = formData.get("street");
    const postal = formData.get("postal");
    const city = formData.get("city");

    const errors = [];
  }

  const {
    checkout: open,
    checkOutIsClose,
    cartTotal,
  } = useContext(MealCartContext);

  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className="modal">
      <h2>Check out</h2>
      <p>Total Amount: ${cartTotal()}</p>
      <form action={formMealAction}>
        <Input label="Full Name" id="name" type="text" name="name" />

        <Input
          label="E-mail Address"
          id="address"
          type="email"
          name="address"
        />

        <Input label="Street" id="street" type="text" name="street" />

        <div className="control-row">
          <Input label="Postal Code" id="postal" type="text" name="postal" />
          <Input label="City" id="city" type="text" name="city" />
        </div>
      </form>

      <p className="modal-actions">
        <TextButton onClick={checkOutIsClose}>Close</TextButton>
        <Button>Submit Order</Button>
      </p>
    </dialog>
  );
}
