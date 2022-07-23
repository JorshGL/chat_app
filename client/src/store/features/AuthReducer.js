import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../constants/api";


export const createLogin = (body) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.auth}/login`;
    const res = await axios.post(URL, body).then((res) => dispatch(SET_TOKEN(res.data)));
    await dispatch(SET_LOGGED(true))
    return res
  } catch (err) {
    console.log("*** REDUX -> createLogin ***", err);
    await dispatch();
    return false;
  }
};

export const getLogged = (state) => {
  const selectLogged = (state) => state.auth.logged;
  return selectLogged
}

export const createProfile = (body) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.auth}/register`;
    const res = await axios.post(URL, body);
    const body2 = {
      user: body.user,
      pass: body.pass,
    };
    createLogin(body2);
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
    token: "",
    logged: false,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.token = action.payload;
    },
    SET_LOGGED: (state, action) => {
      state.logged = action.payload;
    },
  },
});

export const { SET_TOKEN, SET_LOGGED } = AuthSlice.actions;

export const selectToken = (state) => state.auth.token;

export default AuthSlice.reducer;
