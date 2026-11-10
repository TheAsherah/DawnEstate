import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => ({
  loggedIn:
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? true
      : false,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  adminId:
    typeof window !== "undefined" ? localStorage.getItem("adminId") : null,
  staff: typeof window !== "undefined" ? localStorage.getItem("staff") : null,
});

const initialState = getInitialState();

export const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("accessTokenExpiration", expirationTime);
        localStorage.setItem("accessToken", action.payload);
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.accessToken = null;
      state.adminId = null;
      state.staff = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpiration");
        localStorage.removeItem("adminId");
      }
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminId", action.payload);
      }
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminId", action.payload);
      }
    },
  },
});

export const { login, logout, setAdminId, setStaff } = adminSlice.actions;

export default adminSlice.reducer;
