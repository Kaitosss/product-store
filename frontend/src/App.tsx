import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
