import React from "react";
import {signInWithGoogle} from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useSubmit } from "react-router-dom";
import GoogleButton from 'react-google-button'
import * as userService from "../../services/user"
function GoogleSignIn() {
  const dispatch = useDispatch();
  const submit = useSubmit();
  const handleGoogleSignIn = async () => {
    try{
        const result = await signInWithGoogle();
        const userLogin = {
            email: result.user.email
          };
          console.log(userLogin);
        const response = await userService.googleLogin(userLogin);
        console.log(response.data)
        dispatch(userActions.login(response.data));
        submit(null, { action: "/signinAction", method: "post" });
        }catch(e){
            console.log(e)
        }
  };

  return (
    <div className="w-1/2 mx-auto flex justify-center items-center">
      <div>
      <GoogleButton onClick={handleGoogleSignIn}/>
      </div>
    </div>
  );
}

export default GoogleSignIn;
