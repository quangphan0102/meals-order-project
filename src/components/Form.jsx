import { useFormState } from "react-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { MealCartContext } from "../store/meal_cart_context";
import { fetchOrders } from "../http";

import Input from "./Input";
import TextButton from "./TextButton";
import Button from "./Button";

export default function Form() {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  async function formMealAction(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    setIsFetching(true);

    try {
      const resData = await fetchOrders(
        JSON.stringify({
          order: {
            items: cart,
            customer: customerData,
          },
        })
      );

      setData(resData);
    } catch (error) {
      setError({ error: error.message });
    }

    setIsFetching(false);
    event.target.reset();
    checkOutIsClose();
  }

  const {
    cart,
    checkout: open,
    checkOutIsClose,
    cartTotal,
    clearCart,
  } = useContext(MealCartContext);

  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  const dialog2 = useRef();

  useEffect(() => {
    if (data) {
      dialog2.current.showModal();
    } else {
      dialog2.current.close();
    }
  }, [data]);

  const handleCloseCheckOut = () => {
    checkOutIsClose();
  };

  const handleFinish = () => {
    handleCloseCheckOut();
    clearCart();
    setData();
    setIsFetching(false);
    setError();
  };

  let actions = (
    <>
      <TextButton type="button" onClick={handleCloseCheckOut}>
        Close
      </TextButton>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isFetching) {
    actions = <span>Please wait your order is purchase</span>;
  }

  // if (data && !error) {
  //   return <dialog ref={dialog2} className="modal"></dialog>;
  // }

  return (
    <>
      <dialog className="modal" ref={dialog2}>
        {data && !error ? (
          <>
            <h2>Order Successful</h2>
            <p>Your order was submitted successfully.</p>
            <p>
              We will get back to you with more details via email within the
              next few minutes.
            </p>
            <p className="modal-actions">
              <Button className="button" onClick={handleFinish}>
                Finish
              </Button>
            </p>
          </>
        ) : null}
      </dialog>

      <dialog ref={dialog} className="modal">
        <h2>Check out</h2>
        <p>Total Amount: ${cartTotal()}</p>
        <form onSubmit={formMealAction}>
          <Input label="Full Name" id="name" type="text" name="name" />

          <Input
            label="E-mail Address"
            id="address"
            type="email"
            name="email"
          />

          <Input label="Street" id="street" type="text" name="street" />

          <div className="control-row">
            <Input
              label="Postal Code"
              id="postal"
              type="text"
              name="postal-code"
            />
            <Input label="City" id="city" type="text" name="city" />
          </div>
          <p className="modal-actions">{actions}</p>
        </form>
      </dialog>
    </>
  );
}
