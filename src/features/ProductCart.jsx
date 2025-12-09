import { useDispatch, useSelector } from "react-redux";

import LevelUpButton from "../ui/LevelUpButton";
import CartButton from "../ui/CartButton";
import data from "../assets/data.json";
import { addToCart, decrementQuantity, incrementQuantity } from "./CartSlice";

// Import images - adjust path based on your structure
const getImagePath = (relativePath) => {
  // Remove the "./" from the path
  const cleanPath = relativePath.replace("./", "");
  // Return the full path from src/assets
  return new URL(`../assets/${cleanPath}`, import.meta.url).href;
};

function ProductCart() {
  // ✅ CHANGE 1: Removed useState for buttonStates
  // const [buttonStates, setButtonStates] = useState({}); // DELETED

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ CHANGE 2: Added NEW function to check if item exists in cart
  const isInCart = (itemName) => {
    return cartItems.some((i) => i.name === itemName);
  };

  // ✅ CHANGE 3: Kept this function the same
  const getQuantity = (itemName) => {
    const item = cartItems.find((i) => i.name === itemName);
    return item ? item.quantity : 0;
  };

  // ✅ CHANGE 4: Simplified - removed index parameter and local state update
  const handleCartClick = (item) => {
    // Removed setButtonStates code
    dispatch(
      addToCart({
        name: item.name,
        price: item.price,
      })
    );
  };

  // ✅ CHANGE 5: Kept this function the same
  const handleIncrement = (itemName) => {
    dispatch(incrementQuantity(itemName));
  };

  // ✅ CHANGE 6: Simplified - removed index parameter and local state logic
  const handleDecrement = (itemName) => {
    // Removed all the if(currentQty === 1) and setButtonStates code
    dispatch(decrementQuantity(itemName));
  };

  return (
    <div className="max-w-fit lg:max-w-[70%] min-h-screen grid lg:grid-cols-3 rounded-md grid-cols-2 gap-6 bg-gray-300 p-6">
      {data.map((item, index) => {
        // ✅ CHANGE 7: Now checks Redux store instead of local state
        const showCartButton = !isInCart(item.name);
        const quantity = getQuantity(item.name);
        // console.log(item);
        return (
          <div key={index}>
            {/* ... image and other code ... */}
            <div className="relative">
              <img
                className={`rounded-lg w-full ${
                  !showCartButton ? "border-2 border-primary" : ""
                }`}
                src={getImagePath(item.image.desktop)}
                alt={item.name}
                onError={(e) => {
                  console.log("Failed to load:", item.image.desktop);
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center -mb-5">
                {showCartButton ? (
                  <CartButton
                    className="z-30"
                    onClick={() => handleCartClick(item)} // ✅ CHANGE 8: Removed index
                  />
                ) : (
                  <LevelUpButton
                    className="z-10"
                    quantity={quantity}
                    onIncrement={() => handleIncrement(item.name)}
                    onDecrement={() => handleDecrement(item.name)} // ✅ CHANGE 9: Removed index
                  />
                )}
              </div>
            </div>
            {/* description */}
            <div className="font-mono font-semibold mt-10">
              <span className="text-gray-400 "> {item.category} </span>
              <p className="text-[18px]"> {item.name} </p>
              <span className="text-primary">${item.price.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCart;

// import React, { useState } from "react";
// import LevelUpButton from "../ui/LevelUpButton";
// import CartButton from "../ui/CartButton";
// import data from "../assets/data.json";
// import { addToCart, decrementQuantity, incrementQuantity } from "./CartSlice";

// import { useDispatch, useSelector } from "react-redux";

// // Import images - adjust path based on your structure
// const getImagePath = (relativePath) => {
//   // Remove the "./" from the path
//   const cleanPath = relativePath.replace("./", "");
//   // Return the full path from src/assets
//   return new URL(`../assets/${cleanPath}`, import.meta.url).href;
// };

// function ProductCart() {
//   const [buttonStates, setButtonStates] = useState({});

//   // Get the remote control to send commands
//   const dispatch = useDispatch();

//   // Look at the notebook to see what's in the cart
//   const cartItems = useSelector((state) => state.cart.items);

//   // Helper: Check how many of this item are in cart
//   const getQuantity = (itemName) => {
//     const item = cartItems.find((i) => i.name === itemName);
//     return item ? item.quantity : 0;
//   };

//   // When user clicks "Add to Cart" first time
//   const handleCartClick = (index, item) => {
//     setButtonStates((prev) => ({
//       ...prev,
//       [index]: false,
//     }));

//     dispatch(
//       addToCart({
//         name: item.name,
//         price: item.price,
//       })
//     );
//   };

//   // When user clicks the + button
//   const handleIncrement = (itemName) => {
//     dispatch(incrementQuantity(itemName));
//   };

//   // When user clicks the - button
//   const handleDecrement = (index, itemName) => {
//     const currentQty = getQuantity(itemName);

//     if (currentQty === 1) {
//       // Last one! Show cart button again
//       setButtonStates((prev) => ({ ...prev, [index]: true }));
//     }

//     dispatch(decrementQuantity(itemName));
//   };

//   return (
//     <div className="border-2 border-black w-[95%] min-h-screen grid grid-cols-3 gap-6 p-6">
//       {data.map((item, index) => {
//         const showCartButton = buttonStates[index] !== false;
//         const quantity = getQuantity(item.name);
//         // console.log(index, item);
//         return (
//           <div key={index}>
//             <div className="relative">
//               <img
//                 className={`rounded-lg w-full ${
//                   !showCartButton ? "border-2 border-primary" : ""
//                 }`}
//                 src={getImagePath(item.image.desktop)}
//                 alt={item.name}
//                 onError={(e) => {
//                   console.log("Failed to load:", item.image.desktop);
//                   e.target.src =
//                     "https://via.placeholder.com/300x200?text=Image+Not+Found";
//                 }}
//               />
//               <div className="absolute bottom-0 left-0 right-0 flex justify-center -mb-5">
//                 {showCartButton ? (
//                   <CartButton
//                     className="z-30"
//                     onClick={() => handleCartClick(index, item)}
//                   />
//                 ) : (
//                   <LevelUpButton
//                     className="z-10"
//                     quantity={quantity}
//                     onIncrement={() => handleIncrement(item.name)}
//                     onDecrement={() => handleDecrement(index, item.name)}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="font-mono font-semibold mt-10">
//               <span className="text-gray-400 text-sm">{item.category}</span>
//               <p className="text-[18px]">{item.name}</p>
//               <span className="text-primary">${item.price.toFixed(2)}</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ProductCart;

// {
//   /*import React, { useState } from "react";
// import creeme from "../../src/assets/image/image-baklava-desktop.jpg";
// import LevelUpButton from "../ui/LevelUpButton";
// import CartButton from "../ui/CartButton";
// import data from "../assets/data.json";

// function ProductCart() {
//   const [showButton, setShowButton] = useState(true);
//   return (
//     <div className="border-2 border-black w-[95%] h-screen grid grid-cols-3 gap-6  ">
//       {data.map((items, index) => {
//         return (
//           <div key={index}>
//             <div className="relative ">
//               <img
//                 className={`rounded-lg ${
//                   !showButton ? "border-2 border-primary" : ""
//                 }`}
//                 src={items.image.desktop}
//                 alt="image"
//               />
//               <div className=" absolute bottom-0 left-0 right-0 flex justify-center -mb-5 cursor-pointer">
//                 {showButton ? (
//                   <CartButton
//                     className="z-30"
//                     onClick={() => setShowButton(false)}
//                   />
//                 ) : (
//                   <LevelUpButton className=" z-10 " />
//                 )}
//               </div>
//             </div>

//             {/* description *
//             <div className="font-mono font-semibold mt-10">
//               <span className="text-gray-400 ">creemee</span>
//               <p className="text-[18px]">creeme fgjater</p>
//               <span className="text-primary">$100</span>
//             </div>
//           </div>
//         );
//       })}
//       {/* grid 2 *

//       {/* grid 3 *
//     </div>
//   );
// }

// export default ProductCart;*/
// }
