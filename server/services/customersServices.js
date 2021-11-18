const pool = require("../utils/dbConnector");
const tableName = "customers";

const getAllCustomers = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (err) {
    return err;
  }
};

const getCustomerById = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE id='${id}'`
    );
    return rows[0];
  } catch (err) {
    return err;
  }
};

const addCustomer = async ({ firstname, lastname, city }) => {
  try {
    await pool.query(
      `INSERT INTO ${tableName}(firstname, lastname, city) VALUES ('${firstname}', '${lastname}', '${city}')`
    );
    return `Customer inserted successfully`;
  } catch (err) {
    return err;
  }
};

const updateCustomer = async (id, customer) => {
  try {
    await pool.query(
      `UPDATE ${tableName} SET firstname='${customer.firstname}', lastname='${customer.lastname}', city='${customer.city}' WHERE id=${id}`
    );
    return `Customer (id: ${id}) updated successfully`;
  } catch (err) {
    return err;
  }
};

const deleteCustomer = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id=${id}`);
    return `Customer (id: ${id}) deleted successfully`;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
