import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  calculateTotals,
  getProductsData,
} from "./redux/products/productsSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Modal from "./components/Modal";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  const { cartItems } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  const { isOpen } = useAppSelector((state) => state.modal);

  return (
    <main>
      <BrowserRouter>
        {isOpen && <Modal />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
