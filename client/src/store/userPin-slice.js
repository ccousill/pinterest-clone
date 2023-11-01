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
        },
        deletePhotos(state,action){
            console.log(action.payload);
            const photoId = action.payload;
            const filterArray = state.photos.filter(obj => obj._id !== photoId);
            console.log(filterArray)
            state.photos = filterArray
        }
    }
})

export const userPinActions = userPinSlice.actions
export default userPinSlice;