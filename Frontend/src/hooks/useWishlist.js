import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useWishlist = () => {
  const { wishlistCount, toggleWishlist } = useContext(GlobalContext);

  return { wishlistCount, toggleWishlist };
};

export default useWishlist;
