import React from "react";
import CustomerItem from "./CustomerItem";

const CustomerList = ({ customers }) => {
  return (
    <div>
      {customers.map((customer, index) => (
        <div key={index}>
          <CustomerItem customer={customer} />
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
