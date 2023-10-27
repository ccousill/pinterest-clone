import {createSlice} from "@reduxjs/toolkit";
const initialState = {user:{},isAuth:false}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login(state,action){
            const data = action.payload
            const userData = {
                id: data.user._id,
                username: data.user.username,
                email: data.user.email,
                token: data.token
            }
            state.user = userData;
            state.isAuth = true;
            
        },
        logout(state,action){
            
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;