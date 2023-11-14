import React from "react";
import {signInWithGoogle} from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useSubmit } from "react-router-dom";
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
    <div className="items-center w-1/2 mx-auto">
      <button
        className="py-2 w-full rounded-3xl text-white bg-red-600 my-5 hover:bg-red-500"
        onClick={handleGoogleSignIn}
      >
        Sign in With Google
      </button>

    </div>
  );
}

export default GoogleSignIn;
