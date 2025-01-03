import { useContext } from "react";
import { MealCartContext } from "./store/meal_cart_context";

import Modal from "./components/Modal";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartInformations from "./components/CartInformations";
import CartContextProvider from "./store/meal_cart_context";
import Form from "./components/Form";

function App() {
  return (
    <CartContextProvider>
      <Modal className="modal cart">
        <CartInformations />
      </Modal>

      <Header />

      <Meals loadingMessage="Please wait, data will response soon." />

      <Form></Form>
    </CartContextProvider>
  );
}

export default App;
