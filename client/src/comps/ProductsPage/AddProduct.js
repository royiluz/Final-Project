import React, { useState } from "react";
import { observer } from "mobx-react-lite";

const AddProduct = ({ store, buyer }) => {
  // Use states
  const [productsToBuy, setProductsToBuy] = useState([]);

  // Handle Buttons
  const handleSaveButton = async () => {
    await store.addProductsToCustomer(buyer.id, productsToBuy);
  };

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0px 25px",
      }}
    >
      <div>
        <br />
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
      <button className="buttonStyle" onClick={handleSaveButton}>
        Save
      </button>
    </div>
  );
};

export default observer(AddProduct);
