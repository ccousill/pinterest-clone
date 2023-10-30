import React from 'react'
import { useSelector } from 'react-redux'
import Pin from './Pin';
function PinLikeList() {
    const likes = useSelector(state => state.user.user.likes);
    console.log(likes);

    const pinList = likes.map((item)=>{
        return (<Pin key={item.photoId} id={item.photoId} description={item.description} img={item.imgURL} />)
    })

  return (
    <div className="py-2 px-16">
        <ul className="lg:columns-7 columns-4 gap-y-20">
            {pinList}
        </ul>
    </div>
  )
}

export default PinLikeList