import {createSlice} from "@reduxjs/toolkit";


let initialState = {user:{},isAuth:false}

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
        removeLike(state,action){
            const {photoId} = action.payload;
            const filterArray = state.user.likes.filter(obj => obj.photoId !== photoId);
            console.log("array filter",filterArray)
            state.user = {...state.user,likes:filterArray}
        },
        logout(state){ 
            state.user = {};
            state.isAuth = false;
        },
        setUserState(state,action){
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
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;