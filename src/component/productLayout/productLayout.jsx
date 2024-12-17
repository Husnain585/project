import React from "react";
import ProductDetail from "./productDetails";
import Card from "./shoeProduct";


const productLayout = () => {
    return(<>
        <div className="w-full bg-red-900">
          <ProductDetail/>
        </div>
    </>)  
};

export default productLayout;
