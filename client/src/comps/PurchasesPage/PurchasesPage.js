import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchasesPage = ({ store }) => {
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Use Effect
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "http://localhost:8000/purchases/get/filter"
      );
      setAllData(data);
    })();
  }, []);

  // Handler functions
  const handleDatePicker = ({ value }) => {
    if (value) {
      const date = value.split("-");
      setDate(`${date[2]}/${date[1]}/${date[0]}`);
    } else setDate("");
  };

  // Handler functions
  const handleSearchButton = () => {
    const filter = allData
      .filter((el) => {
        return !customerId ? true : el.customer_id === customerId;
      })
      .filter((el) => {
        return !productId ? true : el.product_id === productId;
      })
      .filter((el) => {
        return !date ? true : el.date === date;
      });
    setFilteredData(filter);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="filters">
        <select
          id="customer"
          defaultValue="none"
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="none" disabled hidden>
            Select a Customer
          </option>
          {store.customers.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >{`${c.firstname} ${c.lastname}`}</option>
          ))}
        </select>

        <select
          id="products"
          defaultValue="none"
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="none" disabled hidden>
            Select a Product
          </option>
          {store.products.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          id="date_picker"
          name="date_picker"
          onChange={(e) => handleDatePicker(e.target)}
        />

        <button className="buttonStyle" onClick={handleSearchButton}>
          Search
        </button>
      </div>
      <br />
      <table className="styleTable">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Purchased Products</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((el) => (
            <tr key={el.id}>
              <td>{`${el.firstname} ${el.lastname}`}</td>
              <td>{`${el.name}`}</td>
              <td>{`${el.date}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesPage;
