import { Package2, CircleDollarSign } from "lucide-react";
import { useRef, useState } from "react";
import {
  useProductStore,
  type ProductDataType,
} from "../store/useProductStore";
import imageCompression from "browser-image-compression";

function AddProduct() {
  const { addProduct } = useProductStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ProductDataType>({
    name: "",
    image: null,
    price: 0,
  });
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const Changedata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

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

  const SetDataDefault = () => {
    setData({
      name: "",
      image: null,
      price: 0,
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    addProduct({
      name: data.name,
      price: data.price,
      image: data.image,
    });
    SetDataDefault();
  };

  return (
    <dialog id="addProduct_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add New Product</h3>
        <div className="mt-7">
          <div className="relative">
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
              ref={fileInputRef}
              className="file-input w-full rounded-2xl"
            />
          </div>

          {previewImage && (
            <img
              className="rounded-2xl w-40 h-40 object-cover my-3"
              src={URL.createObjectURL(previewImage)}
              alt=""
            />
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={SetDataDefault}>
                Cancel
              </button>
              <button
                className="btn btn-success text-black"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default AddProduct;
