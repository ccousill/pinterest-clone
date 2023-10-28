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