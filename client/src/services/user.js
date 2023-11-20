import axios from "axios";
import { getHeaders } from "../util/auth";
export const signup = async(userData) => {
    return await axios.post('http://localhost:4000/api/users/signup',userData,{
        withCredentials: true,
    });
}

export const login = async(userData) => {
    return await axios.post('http://localhost:4000/api/users/login',userData,{
        withCredentials: true,
    });
}

export const googleLogin = async(userData) => {
    return await axios.post('http://localhost:4000/api/users/googleLogin',userData,{
        withCredentials: true,
    });
}

export const getProfile = async(id,header) =>{
    return await axios.get(`http://localhost:4000/api/users/profile/${id}`, header);
}

export const likePhoto = async(data) =>{
    return await axios.post('http://localhost:4000/api/users/profile/like',data,{
        withCredentials: true,
        headers:getHeaders()
    });
}
export const unlikePhoto = async(data) =>{
    return await axios.post('http://localhost:4000/api/users/profile/unlike',data,{
         withCredentials: true,
         headers:getHeaders()
     });
}

export const deleteAccount = async(id) =>{
    console.log(getHeaders());
    return await axios.delete(`http://localhost:4000/api/users/profile/deleteAccount/${id}`,{
        withCredentials: true,
        headers:getHeaders()
    });
}


