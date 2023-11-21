import React from "react";
import { useSelector } from "react-redux";
import Pin from "./Pin";
function UserPinList() {
  const userPins = useSelector((state) => state.userPin.photos);
  const pinList = userPins.map((item) => {
    console.log(item)
    return (
      <Pin
        page="userPins"
        key={item._id}
        id={item._id}
        description={item.description}
        img={item.compressedImgURL}
        userId={item.userId}
      />
    );
  });

  return (
    <>
      <div className="py-2 px-16">
        <ul className="lg:columns-7 columns-4 gap-y-20">{pinList}</ul>
      </div>
    </>
  );
}

export default UserPinList;
