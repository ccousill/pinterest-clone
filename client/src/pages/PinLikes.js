import React from "react";

import { useSelector } from "react-redux";

import PinLikeList from "../components/Pins/PinLikeList";

function PinLikes() {
  const likes = useSelector((state) => state.user.user.likes);
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log("state likes", likes);

  return (
    <>
      {isAuth && <PinLikeList />}
      {!isAuth && <p>loading...</p>}
    </>
  );
}

export default PinLikes;
