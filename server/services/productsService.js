const pool = require("../utils/dbConnector");
const tableName = "products";

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (err) {
    return err;
  }
};

const getProductById = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE id='${id}'`
    );
    return rows[0];
  } catch (err) {
    return err;
  }
};

const getCustomersWhoPurchased = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT customers.id, purchases.date, customers.firstname, customers.lastname 
      FROM customers
      INNER JOIN purchases ON purchases.customer_id=customers.id
      WHERE purchases.product_id = ${id};`
    );
    return rows;
  } catch (err) {
    return err;
  }
};

const addProduct = async ({ name, price, quantity }) => {
  try {
    await pool.query(
      `INSERT INTO ${tableName}(name, price, quantity) VALUES ('${name}', ${price}, ${quantity})`
    );
    return `Product inserted successfully`;
  } catch (err) {
    return err;
  }
};

const updateProduct = async (id, prod) => {
  try {
    await pool.query(
      `UPDATE ${tableName} SET name='${prod.name}', price=${prod.price}, quantity=${prod.quantity} WHERE id=${id}`
    );
    return `Product (id: ${prod.id}) updated successfully`;
  } catch (err) {
    return err;
  }
};

const deleteProduct = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id=${id}`);
    return `Product (id: ${id}) deleted successfully`;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getCustomersWhoPurchased,
  addProduct,
  updateProduct,
  deleteProduct,
};
