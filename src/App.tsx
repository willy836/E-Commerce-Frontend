import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-black w-ful h-screen py-4 px-20">
        <HomePage />
      </section>
    </div>
  );
};

export default App;
