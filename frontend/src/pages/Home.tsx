import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { Plus, RotateCw, Package } from "lucide-react";
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

      {products.length === 0 && !loading && (
        <div className="flex flex-col items-center space-y-4 h-96 justify-center">
          <div className="rounded-full bg-base-100">
            <Package className="size-12" />
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-2xl">No products found</h3>
          </div>
        </div>
      )}

      {loading ? (
        <>
          <div className="flex justify-center items-center h-96">
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
