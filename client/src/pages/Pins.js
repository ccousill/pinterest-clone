import React, { useEffect } from "react";
import {useDispatch,useSelector } from "react-redux";
import { getRandomPhotos } from "../services/unsplash";
import { pinActions } from "../store/pin-slice";
import PinList from "../components/Pins/PinList";
function Pins() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    dispatch(pinActions.toggleLoading(true));
    try {
      const fetch = async () => {      
       const response = await getRandomPhotos();
       dispatch(pinActions.setPhotos(response.data))
       dispatch(pinActions.toggleLoading(false))
      };
      fetch();
    } catch (e) {
      dispatch(pinActions.toggleLoading(false));
      console.log(e);
    }
  },[dispatch]);


  return <>
    {isAuth && <PinList/>}
    {!isAuth && <p>loading...</p>}
  </>
  
  
}

export default Pins;
