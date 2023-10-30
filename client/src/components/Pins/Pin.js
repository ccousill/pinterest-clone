import React from 'react'

function Pin({id,img,description}) {
  return (
    <div className='w-full break-inside-avoid-column inline-block relative image-container'>
        <img alt="" className="rounded-xl shadow-lg block w-full h-auto" src={img}/>
        <div className="overlay">
          <div className="options">
            <button className="like-button">Like</button>
          </div>
        </div>
    </div>
  )
}

export default Pin