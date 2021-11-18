import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import AddProductToCustomer from "./AddProductToCustomer";

const CustomersPage = ({ store }) => {
  const [curCustomer, setCurrCustomer] = useState({});
  const [addProductStyle, setAddProductStyle] = useState("hidden");

  // Handle Click
  const handleAddProductButton = (e, curCustomer_) => {
    setAddProductStyle("visible");
    setCurrCustomer(curCustomer_);
  };

  const getProductsForCustomer = (customer_id) => {
    // Create array to return
    const allProductsAndDates = [];

    // Get all purchases By customer id
    const purchasesByCustomer = store.purchases.filter(
      (pur) => +pur.customer_id === customer_id
    );

    for (const purchase of purchasesByCustomer) {
      const product = store.products.find(
        (prod) => prod.id === +purchase.product_id
      );
      allProductsAndDates.push({ ...product, date: purchase.date });
    }
    return allProductsAndDates.map((el, index) => (
      <li key={index}>{`${el?.name} ${el.date}`}</li>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "20px 100px",
      }}
    >
      <table className="styleTable">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Products </th>
          </tr>
        </thead>
        <tbody>
          {store.customers.map((cus) => (
            <tr key={cus.id}>
              <td>
                {`${cus.firstname} ${cus.lastname}`}
                <br />
                <button
                  className="buttonStyle"
                  style={{ marginTop: "8px" }}
                  onClick={(e) => handleAddProductButton(e, cus)}
                >
                  Buy Product
                </button>
              </td>
              <td>
                <ul>{getProductsForCustomer(cus.id)}</ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ visibility: addProductStyle }}>
        <AddProductToCustomer curCustomer={curCustomer} store={store} />
      </div>
    </div>
  );
};

export default observer(CustomersPage);
