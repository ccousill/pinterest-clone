import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import pinSlice from "./pin-slice";
import userPinSlice from './userPin-slice'

const store = configureStore({
    reducer: {user: userSlice.reducer, pin: pinSlice.reducer, userPin: userPinSlice.reducer}
})

export default store;