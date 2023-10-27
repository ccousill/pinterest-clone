import React from 'react'
import { useSelector } from 'react-redux'
function Pins() {
    const user = useSelector(state => state.user)
    console.log(user);
  return (
    <div>Pins</div>
  )
}

export default Pins