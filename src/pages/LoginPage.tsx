import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      const user = { email, password };
      try {
        const response = await fetch(
          "https://tidecommerce.chickenkiller.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to login user. Status ${response.status}`);
        }

        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } catch (error: unknown) {
        throw error instanceof Error
          ? new Error(`Failed to login user. Error: ${error.message}`)
          : new Error("Unknown error");
      }
    }
  };
  return (
    <section className="flex flex-col justify-center items-center my-40 ">
      <h1 className="font-bold text-xl">Welcome to Tide</h1>
      <p className="font-light mb-4">Login or create a Tide acount</p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-1/3">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-1/3">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full text-center">
          <button
            className="bg-orange-500 text-white uppercase rounded p-3 w-1/3"
            type="submit"
          >
            login
          </button>
        </div>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">
        <p className="text-blue-600">Register</p>
      </Link>
    </section>
  );
};

export default LoginPage;
