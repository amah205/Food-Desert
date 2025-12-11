import { createSlice } from "@reduxjs/toolkit";

// ============ AUTH SLICE ============
const loadAuthFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      return { user: JSON.parse(savedUser), isAuthenticated: true };
    }
  } catch (error) {
    console.error("Error loading auth", error);
  }
  return { user: null, isAuthenticated: false };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromLocalStorage(),
  reducers: {
    login: (state, action) => {
      const { email, name } = action.payload;
      state.user = { email, name, id: Date.now() };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    signup: (state, action) => {
      const { email, name } = action.payload;
      state.user = { email, name, id: Date.now() };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
