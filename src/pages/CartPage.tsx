import { useAppSelector } from "../hooks";
import { TrashIcon, PlusIcon, MinusIcon } from "../icons";

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.products);
  return (
    <section className="bg-gray-100 w-full flex gap-5 py-10 px-20 min-page-height">
      <div className="w-3/4 min-page-height">
        {cartItems.map((item) => {
          const { id, name, images, quantity, price, amount } = item;
          return (
            <article key={id} className="bg-white p-2 mb-2 rounded">
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
                  <button className="flex gap-4 items-center uppercase text-orange-500 text-sm hover:bg-orange-200 p-2 rounded">
                    <TrashIcon />
                    remove
                  </button>
                </div>
                <div className="flex gap-5 items-center">
                  <button>
                    <MinusIcon />
                  </button>
                  <p>{amount}</p>
                  <button>
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="w-1/4 ">
        <div className="bg-white mb-5 py-2 rounded">
          <h3 className="px-2 uppercase font-semibold text-gray-600">
            cart summary
          </h3>
          <hr />
          <div className="p-2 flex justify-between items-center">
            <p className="font-semibold capitalize text-gray-600">subtotal</p>
            <p className="font-bold text-gray-900">Ksh 96988</p>
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
            <button className="bg-orange-500 text-white rounded w-full py-2">
              CHECKOUT (Ksh 10000)
            </button>
          </div>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="font-semibold text-gray-800">Returns are easy</p>
          <p className="text-xs">Free return within 10 days</p>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
