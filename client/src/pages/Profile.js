import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteAccount } from "../services/user";
import { useSubmit } from "react-router-dom";
import { userActions } from "../store/user-slice";
function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const submit = useSubmit();
  const handleDeleteAccount = async() => {
    console.log(user);
    try{
        const response = await deleteAccount(user.id);
        console.log(response);
        dispatch(userActions.logout());
        submit(null, { action: "/logout", method: "post" });
    }catch(e){
        console.log(e);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen">
        <img
          src="/home-image.jpg"
          alt="Home"
          className="w-full h-full absolute top-0 left-0 object-cover opacity-50 z-0"
        />
      </div>
      <div className="relative">
        <button
          onClick={handleDeleteAccount}
          className=" bg-red-500 ml-16 mt-12 py-2 px-6 w-28 transition-all rounded-3xl text-white hover:bg-red-400 hover:-translate-y-1"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
