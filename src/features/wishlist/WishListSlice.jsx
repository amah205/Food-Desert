import { createSlice } from "@reduxjs/toolkit";

//  ============ WISHLIST SLICE ============
const loadWishlistFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("wishlist");
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error("error loading wishlist", error);
  }
  return [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistFromLocalStorage(),
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(product);
      }
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
  },
});
export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
