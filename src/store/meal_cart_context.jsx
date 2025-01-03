import { useState, useEffect, createContext } from "react";
import { fetchMeals } from "../http";

export const MealCartContext = createContext({
  cart: [],
  addItemToCart() {},
  updateItemQuantity() {},
  cartQuantity() {},
  cartTotal() {},
  modal: false,
  modalIsOpen() {},
  modalIsClose() {},
  fetchData: [],
  isLoading: false,
  error: null,
  checkout: false,
  checkOutIsOpen() {},
  checkOutIsClose() {},
});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  //Modal State:
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Meal datas state:
  const [fetchData, setFetchData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  //Checkout state:
  const [checkoutIsOpen, setCheckOutIsOpen] = useState(false);

  //Fetching data side-effect:
  useEffect(() => {
    async function fetchMealsData() {
      setIsFetching(true);

      try {
        const meals = await fetchMeals();

        setFetchData(meals);
      } catch (error) {
        setError({
          message:
            error.message ||
            "Fail to fetch the data to server, please try again",
        });
      }

      setIsFetching(false);
    }

    fetchMealsData();
  }, []);

  const cartQuantity = () => {
    let quantity = 0;

    cart.forEach((cartItem) => (quantity += cartItem.quantity));

    return quantity;
  };

  //Adding meal to cart:
  const handleChooseMeal = (meal) => {
    setCart((prevCart) => {
      const updatedItems = [...prevCart];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === meal.id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updateItem;
      } else {
        updatedItems.push({
          id: meal.id,
          name: meal.name,
          quantity: 1,
          price: meal.price,
        });
      }

      return updatedItems;
    });
  };

  const handleUpdateItemQuantity = (id, amount) => {
    setCart((prevCart) => {
      const updateItems = [...prevCart];

      const existingCartItemIndex = updateItems.findIndex(
        (item) => item.id === id
      );

      const updateItem = { ...updateItems[existingCartItemIndex] };

      //Re-search why this doubling render?
      // const existingCartItem = updateItems[existingCartItemIndex];

      updateItem.quantity += amount;

      if (updateItem.quantity <= 0) {
        updateItems.splice(existingCartItemIndex, 1);
      } else {
        updateItems[existingCartItemIndex] = updateItem;
      }

      return updateItems;
    });
  };

  const cartTotal = () => {
    let total = 0;

    cart.forEach((cartItem) => (total += cartItem.quantity * cartItem.price));

    return total;
  };

  const handleOpenCart = () => {
    setModalIsOpen(true);
  };

  const handleCloseCart = () => {
    setModalIsOpen(false);
  };

  const handleOpenCheckOut = () => {
    setModalIsOpen(false);
    setCheckOutIsOpen(true);
  };

  const handleCloseCheckOut = () => {
    setCheckOutIsOpen(false);
  };

  //Context Value:
  const ctxValue = {
    cart: cart,
    addItemToCart: handleChooseMeal,
    updateItemQuantity: handleUpdateItemQuantity,
    cartQuantity: cartQuantity,
    cartTotal: cartTotal,
    modal: modalIsOpen,
    modalIsOpen: handleOpenCart,
    modalIsClose: handleCloseCart,
    fetchData: fetchData,
    isLoading: isFetching,
    error: error,
    checkout: checkoutIsOpen,
    checkOutIsOpen: handleOpenCheckOut,
    checkOutIsClose: handleCloseCheckOut,
  };

  return (
    <MealCartContext.Provider value={ctxValue}>
      {children}
    </MealCartContext.Provider>
  );
}
