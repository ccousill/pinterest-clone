import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    photos: [],
    isLoading: false
}

const pinSlice = createSlice({
    name:"pin",
    initialState: initialState,
    reducers: {
        setPhotos(state,action){
            state.photos = action.payload
        },
        toggleLoading(state,action){
            state.isLoading = action.payload
        }
    }
})

export const pinActions = pinSlice.actions
export default pinSlice;