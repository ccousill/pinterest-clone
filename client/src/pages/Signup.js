import React from 'react'
import SignupForm from '../components/SignupForm'
function Signup() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen">
    <img
        src="/home-image.jpg"
        alt="Signup"
        className="w-full h-full absolute top-0 left-0 object-cover opacity-50 z-0"
      />
    <SignupForm props="signup"/>
    </div>
  )
}

export default Signup