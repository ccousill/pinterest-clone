import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Root from './pages/Root'
import Login from './pages/Login'
import Pins from './pages/Pins'
import Signup from './pages/Signup'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    children:[
      {index: true, element: <Home/>},
      {path:"login", element: <Login/>},
      {path:"signup", element: <Signup/>},
      {path: "pins", element: <Pins/>}
      
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App