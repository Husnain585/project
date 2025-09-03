// src/hooks/useWishlist.js
import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useWishlist = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useWishlist must be used inside <GlobalProvider>");

  const {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  } = ctx;

  // Stable checker if you want to pass around a function
  const has = useMemo(() => (productId) => isInWishlist(productId), [isInWishlist]);

  return {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist: has,
  };
};

export default useWishlist;
