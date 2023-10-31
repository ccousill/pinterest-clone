import axios from "axios";

export const postPin = async(id,pinData) => {
    return await axios.post(`http://localhost:4000/api/posts/post/${id}`,pinData,{
        withCredentials: true,
    });
}


export const getUserPins = async() => {
    return await axios.get(`http://localhost:4000/api/posts`,{
        withCredentials: true,
    });
}
