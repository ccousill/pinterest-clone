import React from "react";
import { useSelector } from "react-redux";
import Pin from "./Pin";
function PinLikeList() {
  const likes = useSelector((state) => state.user.user.likes);
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log(isAuth);

  const pinList = likes.map((item) => {
    return (
      <Pin
        key={item.photoId}
        id={item.photoId}
        description={item.description}
        img={item.imgURL}
      />
    );
  });

  return (
    <div>
      {isAuth && (
        <div className="py-2 px-16">
          <ul className="lg:columns-7 columns-4 gap-y-20">{pinList}</ul>
        </div>
      )}
      {!isAuth && <p>loading...</p>}
    </div>
  );
}

export default PinLikeList;
