import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const token = Cookies.get('jwt');
let initialState = {user:{},isAuth:false}

if(token){
    const decodedToken = jwtDecode(token);
    console.log("decoded token",decodedToken)


    initialState = {user:{
        id: decodedToken.id._id,
        username: decodedToken.id.username,
        email: decodedToken.id.email,
        likes: decodedToken.id.likes.length === 0 ? [] : decodedToken.id.likes,
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
                likes: data.user.likes,
                token: data.token
            }
            state.user = userData;
            state.isAuth = true;
        },
        addLike(state,action){
            state.user = {...state.user, likes: [...state.user.likes, action.payload ]}
        },
        logout(state){ 
            state.user = {};
            state.isAuth = false;
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;