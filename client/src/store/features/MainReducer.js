import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../constants/api";

export const getDataProfile = (token) => async (dispatch) => {
  try {
    const URL = `${api.baseUrl}/${api.endpoints.users}/me`;
    const res = await axios.get(URL, {headers: {Authorization: `Bearer ${token}`}});
  } catch (err) {
    console.log("*** REDUX -> createLogin ***", err);
    await dispatch();
    return false;
  }
};


export const MainSlice = createSlice({
  name: "main",
  initialState: {
    profileData: false,
  },
  reducers: {
    
  },
});


export default MainSlice.reducer;
