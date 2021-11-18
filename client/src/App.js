import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppStore from "./AppStore";
import ProductsPage from "./comps/ProductsPage/ProductsPage";
import CustomersPage from "./comps/CustomersPage/CustomersPage";
import PurchasesPage from "./comps/PurchasesPage/PurchasesPage";
import EditCustomerPage from "./comps/EditCustomer/EditCustomerPage";
import EditProductPage from "./comps/EditProducts/EditProductPage";
import MenuBar from "./comps/utils/MenuBar";

function App() {
  // Load all products to store (MobX)
  const appStore = new AppStore();

  // Load all Data from DB ONCE!
  (async () => {
    await appStore.loadProducts();
    await appStore.loadCustomers();
    await appStore.loadPurchases();
  })();

  return (
    <div className="App">
      <MenuBar />
      <div className="container">
        <Routes>
          <Route
            path="/products"
            element={<ProductsPage store={appStore} />}
          ></Route>
          <Route
            path="/customers"
            element={<CustomersPage store={appStore} />}
          ></Route>
          <Route
            path="/purchases"
            element={<PurchasesPage store={appStore} />}
          ></Route>
          <Route
            path="/editCustomer/:id"
            element={<EditCustomerPage store={appStore} />}
          ></Route>
          <Route
            path="/editProduct/:id"
            element={<EditProductPage store={appStore} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
