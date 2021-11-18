import React from "react";
import { Link } from "react-router-dom";

const CustomerItem = ({ customer }) => {
  return (
    <div className="card">
      <Link
        to={`/editCustomer/${customer.id}`}
      >{`${customer.firstname} ${customer.lastname}`}</Link>
      <br />
      City: {customer.city}
    </div>
  );
};

export default CustomerItem;
