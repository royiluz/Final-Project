import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomerList from "./CustomerList";
import ProductInfo from "./ProductInfo";

const EditProductPage = ({ store }) => {
  // Use Params
  const { id } = useParams();

  // Use Effect
  useEffect(() => {
    // Create array to return
    const customers = [];

    // Get all purchases By customer id
    const customersWhoPurchased = store.purchases.filter(
      (pur) => pur.product_id === id
    );

    for (const purchase of customersWhoPurchased) {
      const customer = store.customers.find(
        (c) => c.id === +purchase.customer_id
      );
      customers.push(customer);
    }
    setCustomerWhoPurchased(customers);
  }, [store.purchases, store.customers, id]);

  // Use State
  const [customerWhoPurchased, setCustomerWhoPurchased] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      <ProductInfo productId={id} store={store} />
      <CustomerList customers={customerWhoPurchased} />
    </div>
  );
};

export default EditProductPage;
