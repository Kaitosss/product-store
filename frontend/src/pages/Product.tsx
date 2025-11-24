import {
  ArrowLeft,
  Package2,
  CircleDollarSign,
  Trash2,
  SquarePen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useProductStore,
  type ProductDataType,
} from "../store/useProductStore";
import imageCompression from "browser-image-compression";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProduct, product, loading } = useProductStore();
  const [data, setData] = useState<ProductDataType>({
    name: product?.name || "",
    image: product?.image || null,
    price: product?.price || 0,
  });
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { deleteProduct, updateProduct } = useProductStore();

  const Changedata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    fetchProduct(id!);
  }, [fetchProduct, id]);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData({
        name: product.name,
        image: product.image,
        price: product.price,
      });
    }
  }, [product]);

  const ChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressedBlob = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
    });

    setPreviewImage(file || null);
    const reader = new FileReader();
    reader.readAsDataURL(compressedBlob);
    reader.onload = () => {
      setData((prev) => ({ ...prev, image: reader.result as string }));
    };
  };

  const handleDelete = async () => {
    await deleteProduct(id);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl container py-8 px-4">
      <button className="btn btn-ghost mb-8" onClick={() => navigate("/")}>
        <ArrowLeft />
        Back to Products
      </button>

      <dialog id="confirmModal" className="modal">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete this product?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {product && (
        <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : data.image || undefined
              }
              alt=""
              className="w-full h-[350px] lg:h-[450px] object-cover"
            />

            <div className="py-7 px-20">
              <p className="text-2xl font-semibold">Edit Product</p>

              <div className="relative mt-8">
                <p className="my-2 font-semibold">Product Name</p>
                <div className="absolute top-10 left-3 z-50">
                  <Package2 />
                </div>
                <input
                  onChange={(e) => Changedata(e)}
                  name="name"
                  value={data.name || ""}
                  type="text"
                  placeholder="Enter product name"
                  className="input rounded-2xl w-full pl-12 focus:outline-none focus:border-2 focus:border-primary-content"
                />
              </div>
              <div className="relative">
                <p className="my-2 font-semibold">Price</p>
                <div className="absolute top-10 left-3 z-50">
                  <CircleDollarSign />
                </div>
                <input
                  onChange={(e) => Changedata(e)}
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.price || ""}
                  placeholder="0.00"
                  className="input [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
              rounded-2xl pl-12 w-full focus:outline-none focus:border-2  focus:border-primary-content"
                />
              </div>
              <div>
                <p className="my-2 font-semibold">Image</p>
                <input
                  onChange={(e) => ChangeImage(e)}
                  type="file"
                  className="file-input w-full rounded-2xl"
                />
              </div>

              <div className="mt-10 flex gap-5 justify-center items-center">
                <button
                  className="btn btn-error rounded-2xl"
                  onClick={() =>
                    (
                      document.getElementById(
                        "confirmModal"
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  <Trash2 className="size-4" />
                  Delete Product
                </button>
                <button
                  className="btn btn-success rounded-2xl"
                  onClick={() => updateProduct(id, data)}
                >
                  <SquarePen className="size-4" />
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
