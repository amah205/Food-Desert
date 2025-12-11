import React, { useState } from "react";
import ProductCart from "./features/cart/ProductCart";
import CartPage from "./features/cart/CartPage";
import AuthModal from "./features/auth/AuthModal";
import HeaderMain from "./features/header/HeaderMain";

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <main className="w-full h-fit bg-gray-100 p-4">
      {/* cart */}
      <header>
        {/* <h1 className="text-[32px] font-semibold px-10   ">Desserts</h1> */}
        <HeaderMain onOpenAuth={handleOpenAuth} onOpenCart={handleOpenCart} />
        <AuthModal
          isOpen={isAuthOpen}
          mode={authMode}
          onClose={handleCloseAuth}
          onSwitchMode={() =>
            setAuthMode(authMode === "login" ? "signup" : "login")
          }
        />
        <CartPage isOpen={isCartOpen} onClose={handleCloseCart} />
      </header>

      {/* product */}
      <section className=" w-full h-fit flex justify-between gap-4 mx-auto lg:flex-row flex-col px-6 ">
        <ProductCart onOpenCart={handleOpenCart} />
      </section>
    </main>
  );
}

export default App;
