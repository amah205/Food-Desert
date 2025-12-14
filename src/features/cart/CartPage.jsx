import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "./CartSlice";
import emptyCart from "../../assets/images/illustration-empty-cart.svg";
import LevelUpButton from "../../ui/LevelUpButton";

function CartPage({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const removeAllCart = () => {
    dispatch(clearCart());
  };

  const orderTotal = cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  if (!isOpen) return null; // <-- Hides modal when closed

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 mx-auto  bg-black bg-opacity-50 self-center h-screen lg:w-full z-50 space-y-3  shadow-md rounded-md p-6 "
    >
      <div
        className="bg-gray-200 lg:w-[30%] w-[90%] mx-auto rounded-md p-6 shadow-md space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center text-primary font-semibold text-[20px]">
          <h3>Your Cart</h3>
          <span>({totalQuantity})</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="w-full mx-auto flex flex-col items-center gap-2 py-4">
            <img src={emptyCart} alt="Empty cart" className="w-32" />
            <p className="text-gray-500 text-sm">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 border-b pb-4">
                  {/* Item Name and Remove Button */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.name))}
                      className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-gray-700 hover:text-gray-700 text-gray-400 transition-colors"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Price Info and Quantity Controls */}
                  <div className="flex justify-between items-center w-full bg-white p-4 rounded-md ">
                    <div className="flex gap-3 text-md">
                      <span className="text-primary font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                      <span className="text-gray-700 font-semibold">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <LevelUpButton
                      className="w-[40%] rounded-none border-none shadow-none bg-inherit  text-black"
                      quantity={item.quantity}
                      onIncrement={() => dispatch(incrementQuantity(item.name))}
                      onDecrement={() => dispatch(decrementQuantity(item.name))}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-600">Order Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${orderTotal.toFixed(2)}
              </span>
            </div>

            <div className="bg-rose-50 rounded-lg p-3 flex items-center justify-center gap-2">
              <span className="text-green-700">🌳</span>
              <p className="text-sm text-gray-700">
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>

            <button
              onClick={removeAllCart}
              className="w-full bg-primary hover:bg-orange-700 text-white font-semibold py-3 rounded-full transition-colors"
            >
              Clear cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
