import React from "react";
import ProductsList from "../utils/ProductsList";
import { observer } from "mobx-react-lite";
import BuyersPage from "./BuyersPage";

const ProductsPage = ({ store }) => {
  return (
    <div className="productPage">
      <div style={{ width: "30%" }}>
        <ProductsList store={store} />
      </div>
      <div style={{ width: "40%", height: "60px" }}>
        <BuyersPage store={store} />
      </div>
    </div>
  );
};

export default observer(ProductsPage);
