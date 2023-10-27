import React from "react";
import { useState } from "react";
import axios from 'axios'
import {useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = async(e) =>{
    e.preventDefault()
    console.log(email);
    console.log(password);
    const userLogin = {
        email: email,
        password: password
    }
    try{
    const response = await axios.post('http://localhost:4000/api/users/signup',userLogin,{
        withCredentials: true,
    })
        console.log(response.data)
        dispatch(userActions.login(response.data))
    }catch(e){
        console.log(e)
    }


  }
  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignupForm;
