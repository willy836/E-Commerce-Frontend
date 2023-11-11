import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="flex flex-col justify-center items-center my-40 ">
      <h1 className="font-bold text-xl">Welcome to Tide</h1>
      <p className="font-light mb-4">Login or create a Tide acount</p>
      <form
        action="https://tide-web-app.azurewebsites.net/api/login"
        method="POST"
        className="w-full flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-1/3">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="w-1/3">
          <input
            className="border border-gray-400 rounded p-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
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
