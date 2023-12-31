import { useAppSelector, useAppDispatch } from "../hooks";
import { TrashIcon, PlusIcon, MinusIcon } from "../icons";
import {
  decrease,
  increase,
  removeItem,
  setItemId,
} from "../redux/products/productsSlice";
import { openModal } from "../redux/modal/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const {
    cartItems,
    total,
    amount: cartAmount,
  } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleCheckout = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <section className="bg-gray-100 w-full flex flex-col gap-5 py-5 sm:py-10 px-5 sm:px-20 mt-20 min-page-height">
          <div className="w-full bg-white flex flex-col gap-5 py-5 sm:py-10 px-5 sm:px-20 rounded">
            <p className="font-semibold text-center">Your cart is empty!</p>
            <p className="text-center">
              Browse our products and discover the best deals!
            </p>
            <Link to="/">
              <div className="text-center">
                <button className="uppercase bg-orange-500 text-white py-3 px-5 rounded">
                  start shopping
                </button>
              </div>
            </Link>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 w-full flex flex-col sm:flex-row gap-5 py-5 sm:py-10 px-5 sm:px-20 mt-20 min-page-height">
        <div className="w-full sm:w-3/4 h-full bg-white rounded">
          <div className="text-xl p-2">Cart ({cartAmount})</div>
          <hr />
          {cartItems.map((item) => {
            const { id, name, images, quantity, price, amount } = item;
            return (
              <article key={id} className="p-2  single-product">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-8">
                    <div className="w-20">
                      <img src={images[0]} alt={name} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">{name}</p>
                      <p className="text-sm">
                        <span className="text-gray-500">Seller: </span>Tide
                      </p>
                      <p className="text-xs text-red-600">
                        {quantity} units left
                      </p>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">Ksh {price}</h3>
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <button
                      onClick={() => {
                        dispatch(setItemId(id));
                        dispatch(openModal());
                      }}
                      className="flex gap-4 items-center uppercase text-orange-500 text-sm hover:bg-orange-200 p-2 rounded"
                    >
                      <TrashIcon />
                      remove
                    </button>
                  </div>
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => {
                        if (amount === 1) {
                          dispatch(removeItem(id));
                          return;
                        }
                        dispatch(decrease(id));
                      }}
                    >
                      <MinusIcon />
                    </button>
                    <p>{amount}</p>
                    <button onClick={() => dispatch(increase(id))}>
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="w-full sm:w-1/4 ">
          <div className="bg-white mb-5 py-2 rounded">
            <h3 className="px-2 uppercase font-semibold text-gray-600">
              cart summary
            </h3>
            <hr />
            <div className="p-2 flex justify-between items-center">
              <p className="font-semibold capitalize text-gray-600">subtotal</p>
              <p className="font-bold text-gray-900">Ksh {total}</p>
            </div>
            <p className="px-2 pb-2 text-gray-400 text-xs">
              Delivery fees not included yet.
            </p>
            <hr />
            <div className="m-2 border border-x-1 border-gray-200 rounded flex flex-col gap-1">
              <p className="bg-green-100 text-green-900 text-xs p-2">
                Free delivery
              </p>
              <p className="uppercase text-sm p-2">
                tide <span className="text-orange-500">express</span>
              </p>
              <p className="text-xs p-2">
                Tide Express items are eligible for free delivery
              </p>
            </div>
            <hr />
            <div className="px-2 mt-2">
              <button
                className="bg-orange-500 text-white rounded w-full py-2"
                onClick={handleCheckout}
              >
                CHECKOUT (Ksh {total})
              </button>
            </div>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-semibold text-gray-800">Returns are easy</p>
            <p className="text-xs">Free return within 10 days</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
