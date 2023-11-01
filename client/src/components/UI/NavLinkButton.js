import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavLinkButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
  return (
    <NavLink to={props.to} exact={props.exact} className={`${isActive ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"} py-2 w-36 rounded-3xl font-extrabold ${props.className}`}>{props.children}</NavLink>
  )
}

export default NavLinkButton