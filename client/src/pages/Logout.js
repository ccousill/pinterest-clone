import Cookies from 'js-cookie'
import { redirect } from 'react-router-dom';
export function action(){
    Cookies.remove('jwt');
    return redirect('/')
}

