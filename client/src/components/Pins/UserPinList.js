import React from "react";
import { useSelector } from "react-redux";
import Pin from "./Pin";
function UserPinList() {
  const userPins = useSelector((state) => state.userPin.photos);
  console.log(userPins);

  const pinList = userPins.map((item) => {
    return (
      <Pin
        page="userPins"
        key={item._id}
        id={item._id}
        description={item.description}
        img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
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
