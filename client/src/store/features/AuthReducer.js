import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../constants/api";
import { createSession } from "./MainReducer";

export const createLogin = (body) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.auth}/login`;
    const res = await axios.post(URL, body);
    await dispatch(createSession)
    return res;
  } catch (err) {
    console.log("*** REDUX -> createLogin ***", err);
    await dispatch();
    return false;
  }
};

export const createProfile = (body) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.auth}/register`;
    const res = await axios.post(URL, body);
    await dispatch(createSession())
    return res;
  } catch (err) {
    console.log("*** REDUX -> createProfile ***", err);
    await dispatch();
    return false;
  }
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    profile: [],
  },
  reducers: {
    SET_PROFILE: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { SET_PROFILE } = AuthSlice.actions

export const selectProfile = (state) => state.auth.profile

export default AuthSlice.reducer