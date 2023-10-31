import React, { useEffect, useState } from "react";
import UserPinList from "../components/Pins/UserPinList";
import { getUserPins } from "../services/post";
import PostPin from "../components/Pins/PostPin";
function UserPins() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const toggleFormHandler = () => {
    if (!showCart) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async() => {
        const response = await getUserPins();
        console.log(response.data)
    };
    fetch();
    setIsLoading(false);
  }, []);

  return (
    <>
      {showCart && <PostPin onClose={toggleFormHandler} />}
      <button onClick={toggleFormHandler}>Post Pin</button>
      {!isLoading && <UserPinList />}
      {isLoading && <p>loading...</p>}
    </>
  );
}

export default UserPins;
