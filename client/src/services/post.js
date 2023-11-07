import axios from "axios";
import { getHeaders,getAuthToken } from "../util/auth";
export const postPin = async(id,pinData) => {
    return await axios.post(`http://localhost:4000/api/posts/post/${id}`,pinData,{
        withCredentials: true,
        headers:{
            'Content-Type':'multipart/form-data',
            Authorization: `Bearer ${getAuthToken()}`
        }
    });
}

export const getUserPins = async() => {
    return await axios.get(`http://localhost:4000/api/posts`,{
        withCredentials: true,
        headers:getHeaders()
    });
}

export const deletePin = async(userId,photoId) => {
    return await axios.delete(`http://localhost:4000/api/posts/${userId}/pins/${photoId}`,{
        withCredentials: true,
        headers:getHeaders()
    });
}