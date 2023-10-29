import React from 'react'

function Pin({id,img,description}) {
  return (
    <div className='w-full break-inside-avoid-column inline-block'>
        <img className="rounded-xl shadow-lg" src={img}/>
    </div>
  )
}

export default Pin