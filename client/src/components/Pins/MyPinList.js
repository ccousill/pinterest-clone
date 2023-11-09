import React from 'react'
import { useSelector } from 'react-redux'
import Pin from './Pin';
function MyPinList() {
    const userPins = useSelector(state => state.user.user.posts);
    console.log(userPins);
    const pinList = userPins.map((item) => {
        return (
          <Pin
            key={item._id}
            id={item._id}
            description={item.description}
            img={item.compressedImgURL}
            page="userPins"
          />
        );
      });

  return (
    <div className="py-2 px-16">
        {/* <button onClick={fetchPhotoHandler}>Replace photos</button> */}
        <ul className="lg:columns-7 columns-4 gap-y-20">
            {pinList}
        </ul>
    </div>
  )
}

export default MyPinList