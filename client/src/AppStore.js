import { makeObservable, observable, action, computed } from "mobx";
import axios from "axios";

class AppStore {
  constructor() {
    makeObservable(this, {
      // Main Tables
      products: observable,
      customers: observable,
      purchases: observable,
      selectedProduct: observable,

      // Load functions
      loadProducts: action,
      loadCustomers: action,
      loadPurchases: action,
      loadSelectedProduct: action,
      addProductsToCustomer: action,
      todayDay: computed,
      totalAmount: computed,

      // Update DB
      updateProduct: action,
      updateCustomer: action,

      // Delete from DB
      deleteProduct: action,
    });
  }

  // Inits
  products = [];
  customers = [];
  purchases = [];
  selectedProduct = "";

  // Getters
  get todayDay() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  get totalAmount() {
    return this.purchases.length;
  }

  // Setters
  async loadProducts() {
    const { data } = await axios.get("http://localhost:8000/products");
    this.products = data;
  }

  async loadCustomers() {
    const { data } = await axios.get("http://localhost:8000/customers");
    this.customers = data;
  }

  async loadPurchases() {
    const { data } = await axios.get("http://localhost:8000/purchases");
    this.purchases = data;
  }

  loadSelectedProduct(productId) {
    this.selectedProduct = productId;
  }

  async updateProduct(id, prodToUpdate) {
    await axios.put(`http://localhost:8000/products/${id}`, prodToUpdate);

    // Render Store Products
    this.loadProducts();
  }

  async deleteProduct(id) {
    await axios.delete(`http://localhost:8000/products/${id}`);

    // Delete all purchases of this product
    await axios.delete(`http://localhost:8000/purchases/product/${id}`);

    // Render Store Products
    this.loadProducts();
    this.loadPurchases();
  }

  async updateCustomer(id, customerToUpdate) {
    await axios.put(`http://localhost:8000/customers/${id}`, customerToUpdate);

    // Render Store Products
    this.loadCustomers();
  }

  async deleteCustomer(id) {
    await axios.delete(`http://localhost:8000/customers/${id}`);

    // Delete all purchases of this product
    await axios.delete(`http://localhost:8000/purchases/customer/${id}`);

    // Render Store Products
    this.loadCustomers();
    this.loadPurchases();
  }

  async addProductsToCustomer(customerId, productsId) {
    for (const prodId of productsId) {
      // Get prduct to buy from store.products
      const productToBuy = this.products.find((p) => p.id === +prodId);
      if (+productToBuy.quantity <= 0) {
        alert(`No ${productToBuy.name} left to buy`);
        continue;
      }
      await axios.post("http://localhost:8000/purchases", {
        customer_id: customerId,
        product_id: prodId,
        date: this.todayDay,
      });

      await axios.put(`http://localhost:8000/products/${productToBuy.id}`, {
        ...productToBuy,
        quantity: productToBuy.quantity - 1,
      });
    }
    this.loadPurchases();
    this.loadProducts();
  }
}

export default AppStore;
