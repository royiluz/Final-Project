import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to={`/editProduct/${product.id}`} style={{ fontSize: "20px" }}>
        {product.name}
      </Link>
      <br />
      <span>Price: {product.price}$ </span>
      <span>Quantity: {product.quantity}</span>
    </div>
  );
};

export default ProductItem;
