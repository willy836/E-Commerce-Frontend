import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getProductsData } from "./redux/products/productsSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  // future code
  // const { productsData } = useAppSelector((state) => state.products);
  // useEffect(()=>{},[productsData])
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:productId" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
