import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Root from './pages/Root'
import Login from './pages/Login'
import Pins from './pages/Pins'
import Signup from './pages/Signup'
import { checkAuthLoader, tokenLoader, checkSignInState } from './util/auth'
import {action as logoutAction} from './pages/Logout'
import {action as signinAction} from './pages/SigninAction'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    loader: tokenLoader,
    id: 'root',
    children:[
      {index: true, element: <Home/>},
      {path:"login", element: <Login/>, loader: checkSignInState},
      {path:"signup", element: <Signup/>, loader: checkSignInState},
      {path: "pins", element: <Pins/>, loader:checkAuthLoader},
      {path: "logout", action: logoutAction},
      {path: "signinAction", action: signinAction}
      
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App