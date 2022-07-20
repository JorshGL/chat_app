import { createSlice } from "@reduxjs/toolkit";


export const MainSlice = createSlice({
  name: "main",
  initialState: {
    logged: false,
  },
  reducers: {
    SET_LOGGED: (state, action) => {
      state.logged = action.payload;
    },
  },
});

export const selectLogged = (state) => state.main.logged;

export const { SET_LOGGED } = MainSlice.actions;

export default MainSlice.reducer;
