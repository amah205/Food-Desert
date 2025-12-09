import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../features/CartSlice";
import emptyCart from "../assets/images/illustration-empty-cart.svg";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const removeAllCart = () => {
    dispatch(clearCart());
  };

  const orderTotal = cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  return (
    <div className=" h-fit lg:w-[30%] z-50 space-y-3  shadow-md rounded-md p-6 bg-gray-200">
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
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 text-sm">
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
  );
}

export default CartPage;

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
// } from "../features/CartSlice";
// import emptyCart from "../assets/images/illustration-empty-cart.svg";

// function CartPage() {
//   // Look inside the Redux store (the notebook)
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);

//   // Get the remote control to send commands
//   const dispatch = useDispatch();

//   // Calculate the total price of all items
//   const orderTotal = cartItems.reduce((total, item) => {
//     return total + item.totalPrice;
//   }, 0);

//   return (
//     <div className="absolute h-fit right-0 w-[30%] space-y-3 bg-white shadow-md rounded-md p-6">
//       {/* HEADER - Cart Title with Count */}
//       <div className="flex gap-2 items-center text-primary font-semibold text-[20px]">
//         <h3>Your Cart</h3>
//         <span>({totalQuantity})</span>
//       </div>

//       {/* CONDITIONAL RENDERING */}
//       {cartItems.length === 0 ? (
//         /* EMPTY CART - Show when no items */
//         <div className="w-full mx-auto flex flex-col items-center gap-2 py-4">
//           <img src={emptyCart} alt="Empty cart" className="w-32" />
//           <p className="text-gray-500 text-sm">
//             Your added items will appear here
//           </p>
//         </div>
//       ) : (
//         /* CART WITH ITEMS - Show when there are items */
//         <>
//           {/* LIST OF CART ITEMS */}
//           <div className="space-y-4">
//             {cartItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center border-b pb-4"
//               >
//                 {/* LEFT SIDE - Item Details */}
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-800">{item.name}</p>
//                   <div className="flex gap-3 mt-1 text-sm">
//                     <span className="text-primary font-semibold">
//                       {item.quantity}x
//                     </span>
//                     <span className="text-gray-500">
//                       @ ${item.price.toFixed(2)}
//                     </span>
//                     <span className="text-gray-700 font-semibold">
//                       ${item.totalPrice.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* RIGHT SIDE - Remove Button */}
//                 <button
//                   onClick={() => dispatch(removeFromCart(item.name))}
//                   className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-gray-700 hover:text-gray-700 text-gray-400 transition-colors"
//                   title="Remove item"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* ORDER TOTAL */}
//           <div className="flex justify-between items-center pt-4">
//             <span className="text-gray-600">Order Total</span>
//             <span className="text-2xl font-bold text-gray-900">
//               ${orderTotal.toFixed(2)}
//             </span>
//           </div>

//           {/* CARBON NEUTRAL MESSAGE */}
//           <div className="bg-rose-50 rounded-lg p-3 flex items-center justify-center gap-2">
//             <span className="text-green-700">🌳</span>
//             <p className="text-sm text-gray-700">
//               This is a <span className="font-semibold">carbon-neutral</span>{" "}
//               delivery
//             </p>
//           </div>

//           {/* CONFIRM ORDER BUTTON */}
//           <button className="w-full bg-primary hover:bg-orange-700 text-white font-semibold py-3 rounded-full transition-colors">
//             Confirm Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default CartPage;

// {
//   /*import React from "react";
// import emptyCart from "../../src/assets/images/illustration-empty-cart.svg";
// function CartPage() {
//   return (
//     <div className="absolute h-fit right-0 w-[30%] space-y-3 bg-white shadow-md rounded-md">
//       <div className="flex gap-2 items-center p-3 text-primary font-semibold text-[20px] ">
//         <h3>Your Cart </h3>
//         <span>(0)</span>
//       </div>
//       <div className="w-full mx-auto flex flex-col items-center gap-2 py-4">
//         <img src={emptyCart} alt="cartCake" />
//         <p>Your added items will appear here</p>
//       </div>
//     </div>
//   );
// }

// export default CartPage;
// */
// }
