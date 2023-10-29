import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getRandomPhotos } from "../services/unsplash";
import { pinActions } from "../store/pin-slice";
import PinList from "../components/Pins/PinList";
function Pins() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

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
      dispatch(pinActions.toggleLoading(false))
      console.log(e);
    }
  },[dispatch]);


  return <PinList/>;
}

export default Pins;
