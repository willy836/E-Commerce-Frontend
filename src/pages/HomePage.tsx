import Product from "../components/Product";
import { useAppSelector } from "../hooks";

const HomePage = () => {
  const { productsData, isLoading } = useAppSelector((state) => state.products);
  return (
    <section className="bg-black w-full min-page-height py-4 px-20 homepage">
      <div className="bg-white min-page-height text-black grid-container">
        {!isLoading ? (
          productsData.map((product) => {
            return <Product key={product.id} {...product} />;
          })
        ) : (
          <p className="text-2xl italic font-semibold p-4">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default HomePage;
