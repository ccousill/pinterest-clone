import React, {useEffect} from 'react'
import {Outlet, useLoaderData, useSubmit} from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from '../components/Navbar';
import { getTokenDuration } from '../util/auth';
import { userActions } from '../store/user-slice';
function Root() {
  const token = useLoaderData();
  const submit = useSubmit();
  const dispatch = useDispatch();
  useEffect(() =>{
    if(!token){
      return;
    }

    if(token === 'EXPIRED'){
      dispatch(userActions.logout());
      submit(null,{action:'/logout',method:"post"})
      return
    }
    const tokenDuration = getTokenDuration();
    setTimeout(()=>{
      dispatch(userActions.logout());
      submit(null,{action:'/logout',method:"post"})
    },tokenDuration)

  },[token,submit,dispatch])


  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Root