const pool = require("../utils/dbConnector");
const tableName = "purchases";

const getAllPurchases = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (err) {
    return err;
  }
};

const getPurchaseById = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE id='${id}'`
    );
    return rows[0];
  } catch (err) {
    return err;
  }
};

const getDataToFilter = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT purchases.*, customers.firstname, customers.lastname, products.name FROM purchases JOIN products ON purchases.product_id = products.id JOIN customers ON purchases.customer_id = customers.id;`
    );
    return rows;
  } catch (err) {
    return err;
  }
};

const addPurchase = async ({ product_id, customer_id, date }) => {
  try {
    await pool.query(
      `INSERT INTO ${tableName}(customer_id, product_id, date) VALUES (${customer_id}, ${product_id}, '${date}')`
    );
    return `Purchase inserted successfully`;
  } catch (err) {
    return err;
  }
};

const deletePurchase = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id=${id}`);
    return `Purchase (id: ${id}) deleted successfully`;
  } catch (err) {
    return err;
  }
};

const deletePurchasesByProduct = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE product_id=${id}`);
    return `Purchases by product (product id: ${id}) deleted successfully`;
  } catch (err) {
    return err;
  }
};

const deletePurchasesByCustomer = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE customer_id=${id}`);
    return `Purchases by customer (customer id: ${id}) deleted successfully`;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  getDataToFilter,
  addPurchase,
  deletePurchase,
  deletePurchasesByProduct,
  deletePurchasesByCustomer,
};
