import {createSlice} from "@reduxjs/toolkit";


let initialState = {photos:[],isLoading:false}

const userPinSlice = createSlice({
    name:'userPin',
    initialState:initialState,
    reducers:{
        setPhotos(state,action){
            state.photos = action.payload
        },
        toggleLoading(state,action){
            state.isLoading = action.payload
        },
        addPhotos(state,action){
            state.photos = [...state.photos, action.payload]
        }
    }
})

export const userPinActions = userPinSlice.actions
export default userPinSlice;