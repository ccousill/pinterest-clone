import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeContent() {
  const navigate = useNavigate();
  const username = useSelector(state => state.user.user.username)
  const isAuth = useSelector(state => state.user.isAuth)
  return (
    <div>
    <div className="w-1/2 m-auto text-center mt-24 relative overflow-hidden">
      {!isAuth && <div>
      <h1 className="font-bold text-5xl">Discover</h1>
      <h1 className={`font-bold text-5xl mt-6`}>Pins</h1>
      </div>}
      {isAuth && <div>
      <h1 className="font-bold text-5xl">Welcome,</h1>
      <h1 className="font-bold text-5xl mt-6">{username}</h1>
      </div>}
      
    </div>
    <div className="relative m-auto text-center">
    <button
        className="my-12 bg-red-500 px-6 py-3 lg:w-1/6 md:w-1/5 rounded-3xl shadow-xl hover:bg-red-400 hover:translate-y-1 transition-all text-white"
        onClick={() => navigate("/pins")}
      >
        Discover Now
      </button>
      </div>
    </div>
  );
}

export default HomeContent;
