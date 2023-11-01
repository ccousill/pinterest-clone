import React from "react";
import HomeContent from "../components/Home/Home";
// import { getTokenDuration } from "../util/auth";
// import { useRouteLoaderData } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getAuthToken } from "../util/auth";
// import { jwtDecode } from "jwt-decode";
function Home() {
  // const user = useSelector((state) => state.user);
  // const token = useRouteLoaderData("root");
  // const cookie = getAuthToken();
  // let decoded = null;
  // if (cookie) {
  //   decoded = jwtDecode(cookie);
  // }
  // function getUserRedux() {
  //   console.log("User State: ", user);
  //   console.log("User Token: ", token);
  //   console.log("token Duration: ", getTokenDuration());
  //   console.log("user likes", user.user.likes);
  //   console.log("cookie", decoded);
  // }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen">
        <img
          src="/home-image.jpg"
          alt="Home"
          className="w-full h-full absolute top-0 left-0 object-cover opacity-50 z-0"
        />
      </div>
      <HomeContent />
      {/* <div className="flex justify-center w-1/2 mx-auto">
        <button
          className="relative my-24 bg-red-500 px-6 py-3 lg:w-1/5 md:w-1/2 rounded-3xl shadow-xl hover:bg-red-400 hover:translate-y-1 transition-all text-white"
          onClick={getUserRedux}
        >
          get Data
        </button>
        </div> */}
      
    </div>
  );
}

export default Home;
