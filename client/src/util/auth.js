import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {redirect} from 'react-router-dom'

export const getTokenDuration = () =>{
    const token = Cookies.get('jwt');
    const decodedToken = jwtDecode(token);
    const expiration = decodedToken.exp
    const date = new Date();
    const duration = (expiration * 1000) - date.getTime();
    return duration;
}

export const getAuthToken = () =>{
    const token = Cookies.get('jwt');
    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
        return 'EXPIRED'
    }
    return token; 
}

export function tokenLoader(){
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();
    if(!token){
          return redirect("/login")  
    }
    return null;
}

export function checkSignInState(){
    const token = getAuthToken();
    if(!token){
        return null;
    }
    return redirect('/pins')
}