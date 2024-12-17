import React from "react";
import ProductDetail from "./component/productLayout/productDetails";
import Card from "./component/productLayout/shoeProduct";

const productLayout = () => {
    return(<>
        <div className="w-full ">
          <ProductDetail/>
          <Card />
        </div>
    </>)  
};

export default productLayout;
