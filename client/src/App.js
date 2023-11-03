import React, {useEffect} from 'react'
import { fetchUserData } from './util/user'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Root from './pages/Root'
import Login from './pages/Login'
import Pins from './pages/Pins'
import Signup from './pages/Signup'
import UserPins from './pages/UserPins'
import Error from './pages/Error'
import { checkAuthLoader, tokenLoader, checkSignInState, RequireAuth } from './util/auth'
import {action as logoutAction} from './pages/Logout'
import {action as signinAction} from './pages/SigninAction'
import PinLikes from './pages/PinLikes'
import { useDispatch } from 'react-redux'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    loader: tokenLoader,
    errorElement: <Error/>,
    id: 'root',
    children:[
      {index: true, element: <Home/>},
      {path:"login", element: <Login/>, loader: checkSignInState},
      {path:"signup", element: <Signup/>, loader: checkSignInState},
      //I have different authentication checks for each page to help practice different ways of implemeneting this, 
      //the page below has a wrapper instead of a loader to check for the auth state. this definately
      // isnt best practice but i just wanted to see how it could be done
      {path: "pins", element: <RequireAuth component={<Pins/>} />},
      {path: "logout", action: logoutAction},
      {path: "signinAction", action: signinAction},
      {path: "profile", element: <PinLikes/>, loader:checkAuthLoader},
      {path: "userPins", element: <UserPins/>, loader: checkAuthLoader}
      
    ]
  }
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData(dispatch)
  },[dispatch])

  return (
    <RouterProvider router={router}/>
  )
}

export default App