import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Product from "../components/Product";
import { useAppSelector } from "../hooks";

const HomePage = () => {
  const { productsData, isLoading } = useAppSelector((state) => state.products);
  return (
    <div>
      <Navbar />
      <section className="bg-black w-full min-page-height mt-20 py-4 px-5 sm:px-20 homepage">
        <Hero />
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
      <Footer />
    </div>
  );
};

export default HomePage;
