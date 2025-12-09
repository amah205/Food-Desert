import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

function CartButton({ onClick, className }) {
  return (
    <button
      className={`border-2 border-gray-500 bg-white px-4 py-2 items-center text-gray-800 font-semibold text-[18px] rounded-full shadow-md flex gap-2   ${className}`}
      onClick={onClick}
    >
      <MdOutlineShoppingCart size={24} className="text-primary" />
      Add to Cart
    </button>
  );
}

export default CartButton;
