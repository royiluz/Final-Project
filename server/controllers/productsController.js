const express = require("express");
const productsService = require("../services/productsService");

const router = express.Router();

// Get all products
router.route("/").get(async (req, res) => {
  const products = await productsService.getAllProducts();
  res.json(products);
});

// Get product by id
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const product = await productsService.getProductById(id);
  res.json(product);
});

// Get all customers who purchased specific product
router.route("/:id/customers").get(async (req, res) => {
  const id = req.params.id;
  const product = await productsService.getCustomersWhoPurchased(id);
  res.json(product);
});

// Add new product
router.route("/").post(async (req, res) => {
  const newProduct = req.body;
  const result = await productsService.addProduct(newProduct);
  res.json(result);
});

// Update product
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const result = await productsService.updateProduct(id, updatedProduct);
  res.json(result);
});

// Delete product
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await productsService.deleteProduct(id);
  res.json(result);
});

module.exports = router;
