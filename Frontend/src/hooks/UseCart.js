import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useCart = () => {
  const {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    calculateTotal,
  } = useContext(GlobalContext);

  return { cart, cartCount, addToCart, removeFromCart, clearCart, calculateTotal };
};

export default useCart;
