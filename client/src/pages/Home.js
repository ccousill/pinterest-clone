import React from "react";
import HomeContent from "../components/UI/Home/Home";
// import { getTokenDuration } from '../util/auth';
// import {  useRouteLoaderData } from "react-router-dom";
// import { useSelector } from "react-redux";
function Home() {
  // const user = useSelector(state => state.user);
  // const token = useRouteLoaderData("root");

  // function getUserRedux(){
  //   console.log("User State: ",user);
  //   console.log("User Token: ",token);
  //   console.log("token Duration: ", getTokenDuration());
  // }



  return (
    <HomeContent/>
  );
}

export default Home;
