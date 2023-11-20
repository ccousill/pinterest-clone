import { NavLink, useSubmit, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {signOutOfGoogle} from "../firebase/firebase";
import NavLinkButton from "./UI/NavLinkButton";
import Button from "./UI/Button";

function Navbar() {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state)=>state.user.user);
  const handleLogout = async () => {
    
    try {
      await signOutOfGoogle();
      dispatch(userActions.logout());
      submit(null, { action: "logout", method: "post" });
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
    
  };
  let userName = null

  if(user){
    userName = user.username
  }

  const location = useLocation();
  const path = location.pathname;
  return (
    <header className={`${(path === '/' || path === '/login' || path === '/signup') ? '' : ''}  relative w-full px-2 z-10`}>
      <nav className="flex flex-row w-full flex-wrap text-xl">
        <div className="flex flex-wrap p-3 flex-row items-center text-white space-x-3 text-center">
          {userName && <h1 className="text-black">{userName}</h1>}
        </div>

        <div className="flex flex-wrap p-3 flex-row items-center space-x-3 text-center">
            <NavLinkButton to="/">Home</NavLinkButton>
            <NavLinkButton to="/pins" >Pins</NavLinkButton>
            {isAuth && <NavLinkButton to="/likes" >Likes</NavLinkButton>}
            {isAuth && <NavLinkButton to="/userPins" >User Pins</NavLinkButton>}
            {isAuth && <NavLinkButton to="/myPins" >My Pins</NavLinkButton>}
        </div>

        <div className="flex flex-wrap flex-grow p-3 flex-row-reverse items-center text-white space-x-3 space-x-reverse text-center">
         
        
          {!isAuth && (
            <NavLink to="signup"className={({isActive}) => isActive ? "bg-red-600 py-2 w-36 rounded-3xl font-extrabold  text-white" : "text-black py-2 w-36 rounded-3xl font-extrabold hover:bg-red-500 hover:text-white"}>
              Sign up
            </NavLink>
          )} 
           {!isAuth && (
            <NavLink to="login" className={({isActive}) => isActive ? "bg-red-600 py-2 w-36 rounded-3xl font-extrabold text-white" : "text-black py-2 w-36 rounded-3xl font-extrabold hover:bg-red-500 hover:text-white"}>
              Login
            </NavLink>
          )}

          {isAuth && (
            <div>
              <NavLink to="profile"><FontAwesomeIcon className="mx-12 hover:cursor-pointer text-black" icon={faUser}/> </NavLink>
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-400 font-extrabold">Logout</Button>
              </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
