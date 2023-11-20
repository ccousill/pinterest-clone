import React from "react";
import HomeContent from "../components/Home/Home";

function Home() {
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
    </div>
  );
}

export default Home;
