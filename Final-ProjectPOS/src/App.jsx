import { Routes, Route } from "react-router-dom";
import ProductList from "./component/ProductList";
import ListProduct from "./component/ListProduct";
import ProductAdd from "./component/AddProduct";
import ProductEdit from "./component/EditProduct";
import DetailProduct from "./component/DetailProduct";
import OrderList from "./component/OrderList";
import PaymentPage from "./component/PaymentPage";
import TransactionDetail from "./component/TransactionDetail";
import TransactionHistory from "./component/TransactionHistory";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="grid">
            <ProductList />
            <OrderList />
          </div>
        }
      />
      <Route path="/listproduct" element={<ListProduct />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/transaction/:id" element={<TransactionDetail />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="/product/add" element={<ProductAdd />} />
      <Route path="/product/edit/:id" element={<ProductEdit />} />
      <Route path="/product/detail/:id" element={<DetailProduct />} />
    </Routes>
  );
}

export default App;
