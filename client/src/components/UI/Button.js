import React from 'react'

function Button(props) {
  return (
    <button type={props.type} className={`py-2 w-36 rounded-3xl text-white ${props.className}`}>{props.children}</button>
  )
}

export default Button