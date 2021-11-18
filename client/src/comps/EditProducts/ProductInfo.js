import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productId, store }) => {
  // Use State
  const [product, setProduct] = useState(
    store.products.find((prod) => prod.id === +productId)
  );

  // Use Navigate
  const navigate = useNavigate();

  // Handlers functions
  const handleChanage = ({ name, value }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateButton = () => {
    store.updateProduct(productId, product);
    navigate(`/products`);
  };

  const handleDeleteButton = () => {
    store.deleteProduct(productId);
    navigate(`/products`);
  };

  return (
    <div className="editInfo">
      <div className="editInput">
        <span>Name: </span>
        <input
          type="text"
          value={product?.name}
          name="name"
          onChange={(e) => {
            handleChanage(e.target);
          }}
        />
      </div>
      <span>Price: </span>
      <input
        type="text"
        value={product?.price}
        name="price"
        onChange={(e) => {
          handleChanage(e.target);
        }}
      />
      <br />
      <span>Quantity: </span>
      <input
        type="text"
        value={product?.quantity}
        name="quantity"
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

export default ProductInfo;
