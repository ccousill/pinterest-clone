import { NavLink, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import Button from "./UI/Button";
function Navbar() {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state)=>state.user.user);
  const handleLogout = async () => {
    dispatch(userActions.logout());
    submit(null, { action: "logout", method: "post" });
  };
  let userName = null

  if(user){
    userName = user.username
  }
  return (
    <header className="bg-gray-800 w-full px-2">
      <nav className="flex flex-row w-full flex-wrap text-xl">
        <div className="flex flex-wrap p-3 flex-row items-center text-white space-x-3 text-center">
          {userName && <h1>Welcome {userName}</h1>}
        </div>

        <div className="flex flex-wrap p-3 flex-row items-center text-white space-x-3 text-center">
          <NavLink to="" className={({isActive}) => isActive ? "bg-black py-3 w-36 rounded-3xl" : "py-3 w-36 rounded-3xl hover:bg-black"}>
            Home
          </NavLink>

          <NavLink to="pins" className={({isActive}) => isActive ? "bg-black py-3 w-36 rounded-3xl" : "py-3 w-36 rounded-3xl hover:bg-black"}>
            Pins
          </NavLink>
        </div>

        <div className="flex flex-wrap flex-grow p-3 flex-row-reverse items-center text-white space-x-3 space-x-reverse text-center">
         

          {!isAuth && (
            <NavLink to="signup" className={({isActive}) => isActive ? "bg-red-600 py-3 w-36 rounded-3xl" : "py-3 w-36 rounded-3xl hover:bg-red-500"}>
              Sign up
            </NavLink>
          )} 
           {!isAuth && (
            <NavLink to="login" className={({isActive}) => isActive ? "bg-red-600 py-3 w-36 rounded-3xl" : "py-3 w-36 rounded-3xl hover:bg-red-500"}>
              Login
            </NavLink>
          )}

          {isAuth && (
            <button onClick={handleLogout}>
              <Button className="bg-red-500 hover:bg-red-400">Logout</Button>
            </button>
          )}
        </div>


      </nav>
    </header>
  );
}

export default Navbar;
