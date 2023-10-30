import axios from "axios";

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

export const getProfile = async(id,header) =>{
    return await axios.get(`http://localhost:4000/api/users/profile/${id}`, header);
}

export const likePhoto = async(data) =>{
    return await axios.post('http://localhost:4000/api/users/profile/like',data,{
        withCredentials: true
    });
}
