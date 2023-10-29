import axios from "axios"
export const getRandomPhotos = async () =>{
    const apiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
    console.log(apiKey)
    return await axios.get('https://api.unsplash.com/photos/random', {params:{
        count: 30,
        client_id: apiKey
    }})
}