import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductsList from "../utils/ProductsList";
import CustomerInfo from "./CustomerInfo";
import { observer } from "mobx-react-lite";

const EditCustomerPage = ({ store }) => {
  // Use Params
  const { id } = useParams();

  // Use Effect
  useEffect(() => {
    // Create array to return
    const products = [];

    // Get all purchases By customer id
    const purchasesByCustomer = store.purchases.filter(
      (pur) => pur.customer_id === id
    );

    for (const purchase of purchasesByCustomer) {
      const product = store.products.find(
        (prod) => prod.id === +purchase.product_id
      );
      products.push(product);
    }
    setCustomerProducts(products);
  }, [store.purchases, store.products, id]);

  // Use State
  const [customerProducts, setCustomerProducts] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      <CustomerInfo customerId={id} store={store} />
      <ProductsList
        store={store}
        showButton={false}
        productsToShow={customerProducts}
      />
    </div>
  );
};

export default observer(EditCustomerPage);
