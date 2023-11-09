import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import MyPinList from '../components/Pins/MyPinList';
import PostPin from '../components/Pins/PostPin';
function MyPins() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const [showModal, setShowModal] = useState(false);
    const toggleFormHandler = () => {
        if (!showModal) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      };
  return (
    <>
    {showModal && (
        <PostPin onClose={toggleFormHandler} setModal={setShowModal} />
      )}
      <div className="mb-6">
        <button onClick={toggleFormHandler} className="bg-red-500 ml-16 mt-12 py-2 px-6 w-28 transition-all rounded-3xl text-white hover:bg-red-400 hover:-translate-y-1">
          Post Pin
        </button>
      </div>
    {isAuth && <MyPinList/>}
    {!isAuth && <p>isLoading</p>}
    </>
  )
}

export default MyPins