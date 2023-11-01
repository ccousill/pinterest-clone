import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { userPinActions } from "../store/userPin-slice";
import UserPinList from "../components/Pins/UserPinList";
import { getUserPins } from "../services/post";
import PostPin from "../components/Pins/PostPin";
function UserPins() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(state=>state.user.isAuth)
  const toggleFormHandler = () => {
    if (!showModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async() => {
        const response = await getUserPins();
        dispatch(userPinActions.setPhotos(response.data));
        console.log(response.data)
    };
    fetch();
    setIsLoading(false);
  }, [dispatch]);

  return (
    <>
      {showModal && <PostPin onClose={toggleFormHandler} setModal={setShowModal}/>}
      <button onClick={toggleFormHandler}>Post Pin</button>
      {!isLoading && isAuth && <UserPinList />}
      {(isLoading || !isAuth) && <p>loading...</p>}
    </>
  );
}

export default UserPins;
