import { useState } from "react";
import AddProduct from "./AddProduct";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const BuyerItem = ({ buyer, store }) => {
  const [addProductStyle, setAddProductStyle] = useState("none");
  const handleAddProductButton = (e) => {
    if (addProductStyle === "block") {
      setAddProductStyle("none");
      e.target.innerText = "Buy Product";
    } else {
      setAddProductStyle("block");
      e.target.innerText = "Cancel Purchase";
    }
  };

  return (
    <div className="buyerItem">
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
          <Link to={`/editCustomer/${buyer.id}`}>
            {`${buyer.firstname} ${buyer.lastname}`}
          </Link>
          <br />
          <br />
          date: {buyer.date}
          <br />
        </div>
        <button
          className="buttonStyle"
          onClick={(e) => handleAddProductButton(e)}
        >
          Buy Product
        </button>
      </div>
      <div style={{ display: addProductStyle }}>
        <AddProduct store={store} buyer={buyer} />
      </div>
    </div>
  );
};

export default observer(BuyerItem);
