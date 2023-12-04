import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      const newUser = { name, email, password };

      try {
        const response = await fetch(
          "https://tidecommerce.chickenkiller.com/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to register user. Status ${response.status}`);
        }

        const data = await response.json();
        navigate("/login");
        return data;
      } catch (error: unknown) {
        throw error instanceof Error
          ? new Error(`Failed to register user. Error: ${error.message}`)
          : new Error("Unknown error");
      }
    }
  };
  return (
    <section className="flex flex-col justify-center items-center my-40 ">
      <h1 className="font-bold text-xl">Welcome to Tide</h1>
      <p className="font-light mb-4">Create a Tide acount</p>
      <form
        onSubmit={handleSubmit}
        className="auth-form flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-2/3 sm:w-full">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-2/3 sm:w-full">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-2/3 sm:w-full">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-2/3 sm:w-full text-center">
          <button
            className="bg-orange-500 text-white uppercase rounded p-3 w-full"
            type="submit"
          >
            register
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
