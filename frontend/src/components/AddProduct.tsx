import { Package2, CircleDollarSign } from "lucide-react";

function AddProduct() {
  return (
    <dialog id="addProduct_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add New Product</h3>

        <form>
          <div className="mt-7">
            <div className="relative">
              <p className="my-2 font-semibold">Product Name</p>
              <div className="absolute top-10 left-3 z-50">
                <Package2 />
              </div>
              <input
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
                type="text"
                placeholder="0.00"
                className="input rounded-2xl pl-12 w-full focus:outline-none focus:border-2  focus:border-primary-content"
              />
            </div>
            <div>
              <p className="my-2 font-semibold">Image</p>
              <input
                type="file"
                className="file-input rounded-2xl w-full focus:border-none focus:outline-none"
              />
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AddProduct;
