import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthReducer";
import MainReducer from "./features/MainReducer";
import HomeReducer from "./features/MainReducer";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        main: MainReducer,
    }
})