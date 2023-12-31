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
import MyPins from './pages/MyPins'
import Profile from './pages/Profile'
import { checkAuthLoader, tokenLoader, checkSignInState, RequireAuth } from './util/auth'
import {action as logoutAction} from './pages/Logout'
import {action as signinAction} from './pages/SigninAction'
import { onAuthStateChanged } from "./firebase/firebase"
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
      {path: "likes", element: <PinLikes/>, loader:checkAuthLoader},
      {path: "userPins", element: <UserPins/>, loader: checkAuthLoader},
      {path: "myPins",element: <MyPins/>,loader:checkAuthLoader},
      {path: "profile",element: <Profile/>, loader:checkAuthLoader}
      
    ]
  }
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData(dispatch)
  },[dispatch])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      console.log("google state change",user)
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <RouterProvider router={router}/>
  )
}

export default App