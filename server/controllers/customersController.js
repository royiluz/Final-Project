const express = require("express");
const customersServices = require("../services/customersServices");

const router = express.Router();

// Get all customers
router.route("/").get(async (req, res) => {
  const customers = await customersServices.getAllCustomers();
  res.json(customers);
});

// Get customer by id
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const customer = await customersServices.getCustomerById(id);
  res.json(customer);
});

// Add new customer
router.route("/").post(async (req, res) => {
  const newCustomer = req.body;
  const result = await customersServices.addCustomer(newCustomer);
  res.json(result);
});

// Update customer
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const updatedCustomer = req.body;
  const result = await customersServices.updateCustomer(id, updatedCustomer);
  res.json(result);
});

// Delete customer
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await customersServices.deleteCustomer(id);
  res.json(result);
});

module.exports = router;
