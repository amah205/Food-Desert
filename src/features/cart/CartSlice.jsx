import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    // Try to get the cart data from localStorage
    const savedCart = localStorage.getItem("cart");

    // If data exists, parse it from JSON string to JavaScript object
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    // If there's an error (corrupted data, etc), log it
    console.error("error detected", error);
  }
  // If no saved data or error occurred, return default empty state
  return {
    items: [],
    totalQuantity: 0,
  };
};

// CONCEPT 2: Saving to localStorage after every change
// This helper function saves the current state to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("failed to save cart to local storage", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === newItem.name
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity++;
      saveCartToLocalStorage(state);
    },

    incrementQuantity: (state, action) => {
      const itemName = action.payload;
      const item = state.items.find((i) => i.name === itemName);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;

        // Save after every increment
        saveCartToLocalStorage(state);
      }
    },

    decrementQuantity: (state, action) => {
      const itemName = action.payload;
      const item = state.items.find((i) => i.name === itemName);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.name !== itemName);
        } else {
          item.quantity--;
          item.totalPrice -= item.price;
        }
        state.totalQuantity--;

        // Save after every decrement
        saveCartToLocalStorage(state);
      }
    },

    removeFromCart: (state, action) => {
      const itemName = action.payload;
      const item = state.items.find((i) => i.name === itemName);
      if (item) {
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.name !== itemName);
        }
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((i) => i.name !== itemName);

        // Save after every remove
        saveCartToLocalStorage(state);
      }
    },

    //  BONUS: Optional action to clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;

      // Clear localStorage too
      localStorage.removeItem("cart");
    },
  },
});

export const {
  decrementQuantity,
  incrementQuantity,
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlise = createSlice({
//   name: "cart", //name of toy box
//   initialState: {
//     items: [], //empty list of cart  items
//     totalQuantity: 0, //how items total
//   },

//   //   things to do with the cart
//   reducers: {
//     addToCart: (state, action) => {
//       const newItem = action.payload;

//       const existingItem = state.items.find(
//         (item) => item.name === newItem.name
//       );

//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalQuantity += newItem.price;
//       } else {
//         // We don't have it! Add it as new
//         state.items.push({
//           name: newItem.name,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//         });
//       }
//       // Update total count
//       state.totalQuantity = state.totalQuantity + 1;
//     },

//     //INCREMENT FUNCTION
//     incrementQuantity: (state, action) => {
//       const itemName = action.payload;
//       const item = state.items.find((i) => i.name === itemName);

//       if (item) {
//         item.quantity = item.quantity + 1;
//         item.totalPrice = item.totalPrice + item.price;
//         state.totalQuantity = state.totalQuantity + 1;
//       }
//     },

//     // DECREMENT
//     decrementQuantity: (state, action) => {
//       const itemName = action.payload;
//       const item = state.items.find((i) => i.name === itemName);

//       if (item.quantity === 1) {
//         state.items = state.items.filter((i) => i.name !== itemName);
//       } else {
//         item.quantity = item.quantity - 1;
//         item.totalPrice = item.totalPrice - item.price;
//       }
//       state.totalQuantity = state.totalQuantity - 1;
//     },

//     // REMOVE FROM CART
//     removeFromCart: (state, action) => {
//       state.items = [];
//     },
//   },
// });

// export const {
//   decrementQuantity,
//   incrementQuantity,
//   addToCart,
//   removeFromCart,
// } = cartSlise.actions;
// export default cartSlise.reducer;
