import React from "react";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  // Use Navigate
  const navigate = useNavigate();

  // Functions
  const tabClickHandle = ({ target: { name } }) => {
    navigate(`/${name}`);
  };

  return (
    <div className="tab">
      <button className="tablinks" name="products" onClick={tabClickHandle}>
        Products
      </button>
      <button className="tablinks" name="customers" onClick={tabClickHandle}>
        Customers
      </button>
      <button className="tablinks" name="purchases" onClick={tabClickHandle}>
        Purchases
      </button>
    </div>
  );
};

export default MenuBar;
