import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerInfo = ({ customerId, store }) => {
  // Use State
  const [customer, setCustomer] = useState(
    store.customers.find((cus) => cus.id === +customerId)
  );

  // Use Navigate
  const navigate = useNavigate();

  // Handlers functions
  const handleChanage = ({ name, value }) => {
    setCustomer({ ...customer, [name]: value });
  };

  const handleUpdateButton = () => {
    store.updateCustomer(customerId, customer);
    navigate(`/products`);
  };

  const handleDeleteButton = () => {
    store.deleteCustomer(customerId);
    navigate(`/products`);
  };

  return (
    <div className="editInfo">
      First Name:{" "}
      <input
        type="text"
        value={customer?.firstname}
        name="firstname"
        onChange={(e) => {
          handleChanage(e.target);
        }}
      />
      <br />
      Last Name:{" "}
      <input
        type="text"
        value={customer?.lastname}
        name="lastname"
        onChange={(e) => {
          handleChanage(e.target);
        }}
      />
      <br />
      City:{" "}
      <input
        type="text"
        value={customer?.city}
        name="city"
        onChange={(e) => {
          handleChanage(e.target);
        }}
      />
      <br />
      <br />
      <button className="buttonStyle" onClick={handleUpdateButton}>
        Update
      </button>
      <button
        style={{ marginLeft: "5px" }}
        className="buttonStyle"
        onClick={handleDeleteButton}
      >
        Delete
      </button>
    </div>
  );
};

export default CustomerInfo;
