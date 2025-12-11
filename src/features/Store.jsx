import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import auth from "../features/auth/AuthSlice";
import wishlist from "../features/wishlist/WishListSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: auth,
    wishlist: wishlist,
  },
});

export default store;
