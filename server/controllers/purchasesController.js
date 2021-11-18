const express = require("express");
const purchasesService = require("../services/purchasesService");

const router = express.Router();

// Get all purchases
router.route("/").get(async (req, res) => {
  const purchases = await purchasesService.getAllPurchases();
  res.json(purchases);
});

// Get purchase by id
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const purchase = await purchasesService.getPurchaseById(id);
  res.json(purchase);
});

// Add new purchase
router.route("/").post(async (req, res) => {
  const newPurchase = req.body;
  const result = await purchasesService.addPurchase(newPurchase);
  res.json(result);
});

// Get date for filter
router.route("/get/filter").get(async (req, res) => {
  const dateToFilter = await purchasesService.getDataToFilter();
  res.json(dateToFilter);
});

// Delete Purchase
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesService.deletePurchase(id);
  res.json(result);
});

// Delete Purchase
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesService.deletePurchase(id);
  res.json(result);
});

// Delete Purchases by product
router.route("/product/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesService.deletePurchasesByProduct(id);
  res.json(result);
});

// Delete Purchases by customer
router.route("/customer/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesService.deletePurchasesByCustomer(id);
  res.json(result);
});

module.exports = router;
