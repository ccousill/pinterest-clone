import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSubmit } from "react-router-dom";
import * as userService from "../services/user";
import Card from "./UI/Card";
function SignupForm({ props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [isError,setIsError] = useState(false);
  const dispatch = useDispatch();
  const submit = useSubmit();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsError(false);
    try {
      let response = null;
      if(password.length < 8){
        throw new Error('Password is too short');
      }
      const userLogin = {
        email: email,
        password: password,
      };
      if (props === "login") {
        response = await userService.login(userLogin);
      } else {
        response = await userService.signup(userLogin);
        
      }
      dispatch(userActions.login(response.data));
      submit(null, { action: "/signinAction", method: "post" });
    } catch (e) {
      if(props ==="signup"){
        setError("Password must be more than 8 characters");
      }else{
        setError("Email or Password is incorrect");
      }
      setIsError(true);
      console.log(e);
    }
  };
  let title = "Login";
  let buttonText = "Log in";
  if (props === "signup") {
    title = "Sign up";
    buttonText = "Sign up";
  }
  return (

    <Card className="py-6 lg:w-1/3 w-1/2 relative overflow-hidden">
      <h1 className="text-center">{title}</h1>
      <form onSubmit={handleSignup} className="flex flex-col w-1/2 m-auto">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:border-blue-300"
            placeholder="Email"
          />

        
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:border-blue-300"
            placeholder="Password"
          />
        {isError && <p className="text-red-400">{error}</p>}
        <button type="submit" className="py-2 w-full rounded-3xl text-white bg-red-600 mx-auto my-5 hover:bg-red-500">
          {buttonText}
        </button>
      </form>
    </Card>
  );
}

export default SignupForm;
