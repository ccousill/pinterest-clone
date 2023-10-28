import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const token = Cookies.get('jwt');
let initialState = {user:{},isAuth:false}

if(token){
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)

    initialState = {user:{
        id: decodedToken.id._id,
        username: decodedToken.id.username,
        email: decodedToken.id.email,
        token: token
    }, isAuth: true}
}

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
        logout(state){ 
            state.user = {};
            state.isAuth = false;
        }
        
    }
})

export const userActions = userSlice.actions
export default userSlice;