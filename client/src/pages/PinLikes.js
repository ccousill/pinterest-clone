import React from "react";

import { useSelector } from "react-redux";

import PinLikeList from "../components/Pins/PinLikeList";

function PinLikes() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <>
      {isAuth && <PinLikeList />}
      {!isAuth && <p>loading...</p>}
    </>
  );
}

export default PinLikes;
