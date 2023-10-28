import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSubmit } from "react-router-dom";
import * as userService from "../services/user";
import Card from "./UI/Card";
import Button from "./UI/Button";
function SignupForm({ props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submit = useSubmit();
  console.log(props);

  const handleSignup = async (e) => {
    e.preventDefault();
    const userLogin = {
      email: email,
      password: password,
    };
    try {
      let response = null;
      if (props === "login") {
        response = await userService.login(userLogin);
      } else {
        response = await userService.signup(userLogin);
      }
      console.log(response.data);
      dispatch(userActions.login(response.data));
      submit(null, { action: "/signinAction", method: "post" });
    } catch (e) {
      console.log(e);
    }
  };
  let title = <h1>Login </h1>;
  let buttonText = "Login";
  if (props === "signup") {
    title = <h1>Sign up</h1>;
    buttonText = "Sign up";
  }
  return (
    <Card>
      <h1 className="text-center">{title}</h1>
      <form onSubmit={handleSignup} className="flex flex-col w-1/2 m-auto">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="bg-red-600 mx-auto my-5">{buttonText}</Button>
      </form>
    </Card>
  );
}

export default SignupForm;
