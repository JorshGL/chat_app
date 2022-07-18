import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../constants/api";

export const createProfile = (body) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.register}`;
    const res = await axios.post(URL, body);
    return res;
  } catch (err) {
    console.log("*** REDUX -> createProfile ***", err);
    await dispatch();
    return false;
  }
};

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    profile: [],
  },
  reducers: {
    SET_PROFILE: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { SET_PROFILE } = RegisterSlice.actions;

export const selectProfile = (state) => state.auth.profile;

export default RegisterSlice.reducer;
