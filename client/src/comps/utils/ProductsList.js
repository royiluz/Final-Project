import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react-lite";

const ProductsList = ({ store, showButton = true, productsToShow = [] }) => {
  // Use State
  const [products, setProducts] = useState([]);

  // Use Effect
  useEffect(() => {
    if (showButton) setProducts(store.products);
    else setProducts(productsToShow);
  }, [productsToShow, store.products, showButton]);

  // Get customers who buy specific product
  const handleShowCustomersButton = async (prodId) => {
    store.loadSelectedProduct(prodId);
  };

  return (
    <div>
      {products.map((prod, index) => (
        <div
          className="card"
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ProductItem product={prod} />
          {showButton && (
            <button
              className="buttonStyle"
              onClick={() => handleShowCustomersButton(prod.id)}
            >
              Show all customers
              <br /> who purchased
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default observer(ProductsList);
