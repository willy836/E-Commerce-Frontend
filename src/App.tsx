import "./App.css";
import Navbar from "./components/Navbar";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
