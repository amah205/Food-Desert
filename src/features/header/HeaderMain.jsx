import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Menu, X, LogOut, ShoppingCart } from "lucide-react";
import { logout } from "../auth/AuthSlice";

function Header({ onOpenAuth, onOpenCart }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // reference to mobile menu
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  // CLOSE MENU WHEN SCROLLING
  // --------------------------------------------
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleScroll = () => setMobileMenuOpen(false);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // CLOSE MENU WHEN CLICKING OUTSIDE
  // --------------------------------------------
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e) => {
      // If click is outside menu area
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-sm  top-0 z-40 fixed left-0 right-0 gap-8 ">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-orange-500"> Desserts</h1>
            {/* <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Contact
              </a>
            </nav> */}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onOpenCart}
                  className="relative text-gray-700 hover:text-orange-500 transition"
                >
                  <ShoppingCart size={22} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>
                <div className="hidden md:flex items-center space-x-2">
                  <User size={20} className="text-gray-600" />
                  <span className="text-sm font-medium">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-gray-600 hover:text-orange-500 transition"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <button
                // onClick={() => onOpenAuth("login")}
                onClick={() => onOpenAuth("login")}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium"
              >
                Sign In
              </button>
            )}

            {/* MOBILE MENU TOGGLE + DROPDOWN */}
            <div className="relative md:hidden mt-4 pb-4  " ref={menuRef}>
              {/* THIS BUTTON MUST BE INSIDE menuRef */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering outside-click
                  setMobileMenuOpen((prev) => !prev);
                }}
                className="text-gray-700 "
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {mobileMenuOpen && (
                <div className=" fixed top-[80px]  left-0 right-0 w-full  z-50  p-6 bg-white shadow-lg border-t ">
                  <nav className="flex flex-col space-y-3 items-start ">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700"
                    >
                      Products
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700"
                    >
                      About
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700"
                    >
                      Contact
                    </button>

                    {isAuthenticated && (
                      <button
                        className="text-red-500"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {/* <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}
          </div>
        </div>

        {/* {mobileMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              <button
                // onClick={(e) => e.preventDefault()}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                Home
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                // onClick={(e) => e.preventDefault()}
                className="text-gray-700 hover:text-orange-500"
              >
                Products
              </button>
              <button
                // onClick={(e) => e.preventDefault()}

                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                About
              </button>
              <button
                // onClick={(e) => e.preventDefault()}

                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                Contact
              </button>
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}*/}
      </div>
    </header>
  );
}

export default Header;
