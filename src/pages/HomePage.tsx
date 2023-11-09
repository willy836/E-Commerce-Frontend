import Product from "../components/Product";
import { useAppSelector } from "../hooks";

const HomePage = () => {
  const { productsData } = useAppSelector((state) => state.products);
  return (
    <section className="bg-black w-ful py-4 px-20 homepage">
      <div className="bg-white text-black grid-container">
        {productsData.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default HomePage;
