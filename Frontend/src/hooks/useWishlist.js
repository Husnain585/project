import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useWishlist = () => {
  const { wishlist, wishlistCount, addToWishlist, removeFromWishlist } =
    useContext(GlobalContext);

  // Optional helper to toggle a product in the wishlist
  const toggleWishlist = (product) => {
    if (wishlist.some((p) => p.id === (product.id || product.productId))) {
      removeFromWishlist(product.id || product.productId);
    } else {
      addToWishlist(product);
    }
  };

  return { wishlist, wishlistCount, addToWishlist, removeFromWishlist, toggleWishlist };
};

export default useWishlist;
