import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import themeSlice from "./slices/themeSlice";
import languageSlice from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    cart: cartReducer,
    theme: themeSlice,
    lang: languageSlice,
  },
});

export default store;
