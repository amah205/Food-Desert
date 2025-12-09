import React from "react";
import ProductCart from "./features/ProductCart";
import CartPage from "./features/CartPage";

function App() {
  return (
    <main className="w-full h-fit bg-gray-100 p-4">
      {/* cart */}

      <h1 className="text-[32px] font-semibold px-10   ">Desserts</h1>

      {/* product */}
      <section className=" w-full h-fit flex justify-between gap-4 mx-auto lg:flex-row flex-col px-6 ">
        <ProductCart />
        <CartPage />
      </section>
    </main>
  );
}

export default App;
