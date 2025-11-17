import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { Plus, RotateCw } from "lucide-react";
import ProductCard from "../components/ProductCard";

function Home() {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 container">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary rounded-lg">
          <Plus className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RotateCw className="size-5" />
        </button>
      </div>

      {loading ? (
        <>
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
