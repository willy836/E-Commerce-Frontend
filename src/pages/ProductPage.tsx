import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addItem } from "../redux/products/productsSlice";
import Navbar from "../components/Navbar";

type ProductProps = {
  name: string;
  id: string;
  user_id: number;
  category_id: number;
  images: string[];
  description: string;
  price: number;
  quantity: number;
  sku: string;
  weight: string;
};

const ProductPage = () => {
  const { productId } = useParams();
  const { productsData } = useAppSelector((state) => state.products);
  const product = productsData.find(
    (product: ProductProps) => product.id === productId
  );

  const dispatch = useAppDispatch();

  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 w-full mt-20 min-page-height">
        {product && (
          <div className="py-10 px-32 min-page-height">
            <article className="bg-white p-2 h-full flex gap-20 rounded mb-10">
              <div className="w-1/3">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="w-2/3 py-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl py-1">{product.name}</h3>
                  <p className="py-1 mb-2">Category: {product.category_id}</p>
                  <hr />
                  <h4 className="font-bold text-2xl text-gray-700 py-2">
                    Ksh {product.price}
                  </h4>
                  <p className="text-gray-400 text-sm capitalize py-1">
                    in stock | {product.quantity} items
                  </p>
                </div>
                <div className="w-full d-flex justify-center bg-orange-500 text-white p-3 rounded">
                  <button
                    className=" block w-full uppercase"
                    onClick={() => dispatch(addItem(product.id))}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </article>
            <div className="bg-white py-2 px-4 h-full mb-10">
              <div>
                <h4 className="capitalize font-bold text-gray-700 py-2">
                  product description
                </h4>
                <hr />
                <p className="py-1">{product.description}</p>
              </div>
            </div>
            <div className="bg-white py-2 px-4 h-full">
              <p className="uppercase font-bold text-gray-700 py-2">
                specifications
              </p>
              <hr />
              <div className="py-1">
                <p>
                  <span className="font-bold text-gray-900">SKU:</span>{" "}
                  {product.sku}
                </p>
                <p>
                  <span className="font-bold text-gray-900">Weight (Kg):</span>{" "}
                  {product.weight}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
