import { createSlice } from "@reduxjs/toolkit";

export const createSession = () => async (dispatch) => {
  await dispatch(SET_LOGGED(true))
};

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

export const { SET_LOGGED } = MainSlice.actions

export const selectLogged = (state) => state.main.logged

export default MainSlice.reducer