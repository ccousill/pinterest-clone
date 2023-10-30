import React from "react";
import HomeContent from "../components/UI/Home/Home";
import { getTokenDuration } from '../util/auth';
import {  useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthToken } from "../util/auth";
import { jwtDecode } from "jwt-decode";
function Home() {

  const user = useSelector(state => state.user);
  const token = useRouteLoaderData("root");
  const cookie = getAuthToken();
  let decoded = null;
  if(cookie){
    decoded = jwtDecode(cookie);
  }
  function getUserRedux(){
    console.log("User State: ",user);
    console.log("User Token: ",token);
    console.log("token Duration: ", getTokenDuration());
    console.log("user likes",user.user.likes)
    console.log("cookie",decoded)
  }

  return (
    <div>
    <HomeContent/>
    <button onClick={getUserRedux}>get Data</button>
    </div>
  );
}

export default Home;
