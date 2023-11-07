import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getProductsData } from "./redux/products/productsSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  // future code
  // const { productsData } = useAppSelector((state) => state.products);
  // useEffect(()=>{},[productsData])
  return (
    <div>
      <Navbar />
      <section className="bg-black w-ful h-full py-4 px-20">
        <HomePage />
      </section>
    </div>
  );
};

export default App;
