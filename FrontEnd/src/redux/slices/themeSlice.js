import { createSlice } from "@reduxjs/toolkit";

// Function bash njibou l-theme l-lwl mn localStorage awla mn system dyal PC
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("dawn-theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Ila makansh m-sauvi, nchoufou pc wesh fih dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light"; // Default f SSR (Server)
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("dawn-theme", action.payload);
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("dawn-theme", state.mode);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;