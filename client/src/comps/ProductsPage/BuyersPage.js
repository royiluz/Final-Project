import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import BuyerItem from "./BuyerItem";

const BuyersPage = ({ store }) => {
  // Use Effect
  useEffect(() => {
    // Create array to return
    const customers = [];

    // Get all purchases By customer id
    const customersWhoPurchased = store.purchases.filter(
      (pur) => +pur.product_id === store.selectedProduct
    );

    for (const purchase of customersWhoPurchased) {
      const customer = store.customers.find(
        (c) => c.id === +purchase.customer_id
      );
      customers.push({ ...customer, date: purchase.date });
    }
    setCustomerWhoPurchased(customers);
  }, [store.purchases, store.customers, store.selectedProduct]);

  // Use State
  const [customerWhoPurchased, setCustomerWhoPurchased] = useState([]);

  return (
    <div>
      <span className="totalAmount">
        Total amount of purchased products: {store.totalAmount}
      </span>
      {customerWhoPurchased.map((el, index) => (
        <BuyerItem key={index} buyer={el} store={store} />
      ))}
    </div>
  );
};

export default observer(BuyersPage);
