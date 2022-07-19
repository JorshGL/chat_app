import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../constants/api";

export const MainSlice = createSlice({
  name: "main",
  initialState: {
    logged: true,
  },
  reducers: {
    SET_LOGGED: (state, action) => {
      state.logged = action.payload;
    },
  },
});

export const { SET_LOGGED } = MainSlice.actions;

export const selectLogged = (state) => state.main.logged;

export default MainSlice.reducer;
