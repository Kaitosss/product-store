import { Link, useLocation } from "react-router-dom";
import { ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const isHomepage = location.pathname == "/";

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-16 flex justify-between">
          <div className="flex-1 lg:flex-none">
            <Link to={"/"} className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <p className="font-semibold font-mono text-2xl tracking-wide">
                  BOOMSTORE
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isHomepage && (
              <div className="p-2 hover:bg-base-200 transition-colors relative rounded-full">
                <ShoppingBasketIcon className="size-5" />
                <div className="rounded-full bg-primary text-center size-6 absolute -top-2 left-5">
                  5
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
