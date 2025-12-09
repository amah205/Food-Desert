import React from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

function LevelUpButton({ className, quantity, onIncrement, onDecrement }) {
  return (
    <button
      className={`border-2 border-gray-500 bg-primary py-1 px-4 text-white font-extralight text-[18px] rounded-full w-[60%] shadow-md flex justify-between gap-2 items-center  ${className}`}
    >
      <FiMinus
        size={20}
        onClick={onDecrement}
        className="border-2 border-gray-100 rounded-full "
      />
      <span> {quantity} </span>
      <FiPlus
        size={20}
        onClick={onIncrement}
        className="border-2 border-gray-100 rounded-full "
      />
    </button>
  );
}

export default LevelUpButton;
