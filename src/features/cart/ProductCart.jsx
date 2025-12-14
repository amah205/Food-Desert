import { useDispatch, useSelector } from "react-redux";

import LevelUpButton from "../../ui/LevelUpButton";
import CartButton from "../../ui/CartButton";
import data from "../../assets/data.json";
import { addToCart, decrementQuantity, incrementQuantity } from "./CartSlice";
import CartPage from "./CartPage";

const getImagePath = (relativePath) =>
  new URL(`../../${relativePath.replace("./", "")}`, import.meta.url).href;

function ProductCart({ onOpenCart }) {
  // calling isAuthentic from AuthSlice
  const { isAuthenticated } = useSelector((state) => state.auth);

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
    if (!isAuthenticated) {
      alert("Please sign in to add items to your cart.");
      return;
    }
    dispatch(
      addToCart({
        name: item.name,
        price: item.price,
      })
    );
    onOpenCart();
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
    <div className="max-w-fit relative top-11 min-h-screen  grid lg:grid-cols-3 rounded-md grid-cols-1 gap-6 bg-gray-300 p-6">
      {data.map((item, index) => {
        // ✅ CHANGE 7: Now checks Redux store instead of local state
        const showCartButton = !isInCart(item.name);
        const quantity = getQuantity(item.name);
        console.log(item);
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

