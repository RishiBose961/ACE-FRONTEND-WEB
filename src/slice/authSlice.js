/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Handles loading state during initialization
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUserAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("userInfo");
    },
    setUserAction: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setLoadingAction: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  loginUserAction,
  logoutUserAction,
  setUserAction,
  setLoadingAction,
} = authSlice.actions;

export default authSlice.reducer;

export const loadUser = () => (dispatch) => {
  dispatch(setLoadingAction(true));
  const userInfo = loadUserFromStorage();
  if (userInfo) {
    dispatch(setUserAction(userInfo));
  } else {
    dispatch(setLoadingAction(false));
  }
};
