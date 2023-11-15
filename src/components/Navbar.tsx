import { useState, useEffect, FormEvent } from "react";
import { useAppSelector } from "../hooks";
import { CartIcon, UserIcon, ChevronDown } from "../icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState<{ name: string; isAdmin: number } | null>(
    null
  );
  const { amount } = useAppSelector((state) => state.products);

  const logout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let token;
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      token = userObj.token;
    }

    try {
      const response = await fetch(
        "https://tide-web-app.azurewebsites.net/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to logout user. Status ${response.status}`);
      }

      return await response.json();
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Failed to logout user. Error: ${error.message}`)
        : new Error("Unknown error");
    }
  };

  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    logout(e);
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj.user);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white">
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
        <Link
          to="/dashboard"
          className="uppercase text-blue-500 cursor-pointer"
        >
          dashboard
        </Link>
        <div className="flex gap-16 items-center">
          <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
            <UserIcon />
            {user ? (
              <p className="capitalize">Hi, {user.name}</p>
            ) : (
              <p>Account</p>
            )}
            <div
              className="chev-down"
              onClick={() => setShowSignIn((prevState) => !prevState)}
            >
              <ChevronDown />
            </div>
            {showSignIn && (
              <div className="mt-1 sign-in">
                {user ? (
                  <form onSubmit={handleLogout}>
                    <div>
                      <button
                        type="submit"
                        className="bg-orange-500 text-white text-sm uppercase px-8 py-2 rounded"
                      >
                        logout
                      </button>
                    </div>
                  </form>
                ) : (
                  <Link
                    to="login"
                    className="bg-orange-500 text-white text-sm uppercase px-8 py-2 rounded"
                  >
                    sign in
                  </Link>
                )}
              </div>
            )}
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
    </header>
  );
};

export default Navbar;
