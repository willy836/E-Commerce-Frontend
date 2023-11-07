import Product from "../components/Product";
import { useAppSelector } from "../hooks";

const HomePage = () => {
  const { productsData } = useAppSelector((state) => state.products);
  return (
    <section className="bg-white text-black grid-container">
      {productsData.map((product) => {
        return <Product key={product.id} {...product} />;
      })}
    </section>
  );
};

export default HomePage;
