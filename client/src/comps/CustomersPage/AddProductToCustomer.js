import React, { useState } from "react";
import { observer } from "mobx-react-lite";

const AddProductToCustomer = ({ curCustomer, store }) => {
  // Use State
  const [productsToBuy, setProductsToBuy] = useState([]);

  // Handlers functions
  const handleChangeCheckBox = ({ checked, name: prodId }) => {
    if (checked) {
      setProductsToBuy([...productsToBuy, prodId]);
    } else {
      const index = productsToBuy.indexOf(prodId);
      if (index !== -1) {
        productsToBuy.splice(index, 1);
        setProductsToBuy(productsToBuy);
      }
    }
  };

  const handleBuyProductButton = async () => {
    await store.addProductsToCustomer(curCustomer.id, productsToBuy);
  };

  return (
    <div className="card">
      <h2>Buy product ({curCustomer.firstname})</h2>
      <div style={{ fontSize: "18px" }}>
        Products:
        {store.products.map((prod, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={prod.id}
              onChange={(e) => handleChangeCheckBox(e.target)}
            />
            {prod.name}
          </div>
        ))}
      </div>
      <br />
      <button className="buttonStyle" onClick={handleBuyProductButton}>
        Buy Products!
      </button>
    </div>
  );
};

export default observer(AddProductToCustomer);
