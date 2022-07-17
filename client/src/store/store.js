import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthReducer";
import RegisterReducer from "./features/RegisterReducer";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        register: RegisterReducer,
    }
})