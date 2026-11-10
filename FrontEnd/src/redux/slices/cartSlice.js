import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const initialState = {
  items: getInitialCart(), 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (i) => i.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
