import { Link } from "react-router-dom";
import { useProductStore, type Product } from "../store/useProductStore";
import { EditIcon, Trash2 } from "lucide-react";

interface ProductCardPorps {
  product: Product;
}

function ProductCard({ product }: ProductCardPorps) {
  const { deleteProduct } = useProductStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="my-3 mx-3">
        <div className="font-semibold text-lg">{product.name}</div>

        <div className="mt-3 text-lg font-semibold">
          {Number(product.price).toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " THB"}
        </div>
      </div>

      <div className="card-actions flex justify-end m-7">
        <Link
          to={`/product/${product.id}`}
          className="btn btn-sm btn-info btn-outline"
        >
          <EditIcon className="size-4" />
        </Link>

        <button
          className="btn btn-sm btn-error btn-outline"
          onClick={() => deleteProduct(product.id)}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
