import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { getProfile } from '../services/user';
import { userActions } from '../store/user-slice';
export const fetchUserData = async (dispatch) => {
  const token = Cookies.get('jwt');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("heres the token")
      console.log(decoded)

      const headers = {
        Authorization: `Bearer ${token}`
      }
      const id = decoded.id._id;
      const response = await getProfile(id,{headers})
      console.log(response.data);
      if(!response.data.user){
        Cookies.remove('jwt');
      }
      dispatch(userActions.setUserState(response.data))
      // Dispatch an action to store the user ID in your Redux state.
    } catch (error) {
        console.log("no token")
      // Handle invalid or expired JWT
    }
  }
};
