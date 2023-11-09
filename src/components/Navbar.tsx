import { useAppSelector } from "../hooks";
import { CartIcon } from "../icons";
import { UserIcon } from "../icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { amount } = useAppSelector((state) => state.products);
  return (
    <nav className="flex justify-between items-center py-5 px-20 nav-shadow">
      <h3
        className="text-2xl text-gray-600 uppercase font-bold"
        style={{ letterSpacing: "2px" }}
      >
        #tide
      </h3>
      <form className="flex items-center gap-2">
        <div className="div-input">
          <input
            type="text"
            placeholder="Search products"
            className="p-2 rounded border focus:border-gray-200 focus:outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded uppercase"
          >
            search
          </button>
        </div>
      </form>
      <div className="flex gap-16 items-center">
        <div className="flex gap-2 items-center">
          <UserIcon />
          <p>Account</p>
        </div>
        <Link to="/cart">
          <div className="cart">
            <CartIcon />
            <div className="cart-amount bg-orange-500">
              <p className="text-white">{amount}</p>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
