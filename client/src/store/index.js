import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import pinSlice from "./pin-slice";


const store = configureStore({
    reducer: {user: userSlice.reducer, pin: pinSlice.reducer}
})

export default store;