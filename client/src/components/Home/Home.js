import React from "react";
import { useNavigate } from "react-router-dom";

function HomeContent() {
  const navigate = useNavigate();
  return (
    <div className="w-1/2 m-auto text-center mt-24 relative overflow-hidden">
      <h1 className=" z-10 font-bold text-5xl">Discover</h1>
      <h1 className={`font-bold text-5xl mt-6`}>Pins</h1>
      
      <button
        className="my-12 bg-red-500 px-6 py-3 w-1/5 rounded-3xl shadow-xl hover:bg-red-400 hover:translate-y-1 transition-all text-white"
        onClick={() => navigate("/pins")}
      >
        Discover Now
      </button>
    </div>
  );
}

export default HomeContent;
