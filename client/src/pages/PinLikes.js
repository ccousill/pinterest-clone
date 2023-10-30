import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { getProfile } from '../services/user';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PinLikeList from '../components/Pins/PinLikeList';

function PinLikes() {
    const token = Cookies.get('jwt');
    const navigate = useNavigate();
    const id = useSelector(state => state.user.user.id)
    const likes = useSelector(state => state.user.user.likes)
    
    
    useEffect(()=>{
        
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const fetch = async() =>{
            try{
            const response = await getProfile(id,{headers})
            console.log(response.data)
            }catch(e){
                navigate('/')
            }
        }
        fetch();
    },[id,token,navigate])

    console.log("state likes",likes);

  return (
    <PinLikeList/>
  )
}

export default PinLikes