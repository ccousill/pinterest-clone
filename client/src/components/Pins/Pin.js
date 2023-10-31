import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { likePhoto, unlikePhoto } from "../../services/user";
function Pin({ id, img, description, page }) {
  const user = useSelector((state) => state.user.user);
  const isLiked = user.likes.some((obj) => obj.photoId === id);
  const [isUnliked, setIsUnliked] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async () => {
    const userId = user.id;
    const payload = {
      userId: userId,
      photoId: id,
      imgURL: img,
      description: description,
    };

    const photoObject = {
      photoId: id,
      imgURL: img,
      description: description,
    };
    try {
      const response = await likePhoto(payload);
      dispatch(userActions.addLike(photoObject));
      console.log(response.data);
    } catch (e) {
      console.log("could not like photo");
    }
  };

  const handleUnlike = async (type) => {
    const userId = user.id;
    const payload = {
      userId: userId,
      photoId: id,
    };
    try {
      const response = await unlikePhoto(payload);
      console.log(payload);
      setIsUnliked(true);

      if(type === "pins"){
        dispatch(userActions.removeLike(payload));
      }else{
        setTimeout(()=>{
          dispatch(userActions.removeLike(payload));
        },500)
      }
      console.log(response.data);
    } catch (e) {
      console.log("could not unlike photo");
    }
  };


  let pageType = (
    <div  className="image-fade-in w-full break-inside-avoid-column inline-block relative image-container">
      
      <img
        alt=""
        className="rounded-xl shadow-xl block w-full h-auto"
        src={img}
      />
      <div className="overlay rounded-xl">
        <div className="options">
          {!isLiked && (
            <button onClick={handleLike} className="bump like-button">
              Like
            </button>
          )}
          {isLiked && (
            <button onClick={() => handleUnlike("pins")} className="bump like-button">
              Unlike
            </button>
          )}
        </div>
      </div>
      {isLiked && <div className="absolute top-0 right-0 bg-red-500 bump text-white px-2 rounded-bl-xl rounded-tr-lg">Liked</div>}
    </div>
  );


  if(page==="likes"){
    pageType = (<div className={`w-full break-inside-avoid-column inline-block relative image-container ${isUnliked ? 'image-fade-out': 'image-fade-in transition-transform duration-300 ease-in-out'}`}>
    <img
      alt=""
      className="rounded-xl shadow-lg block w-full h-auto"
      src={img}
    />
    <div className="overlay">
      <div className="options">
        {!isLiked && (
          <button onClick={handleLike} className="bump like-button">
            Like
          </button>
        )}
        {isLiked && (
          <button onClick={()=>handleUnlike("likes")} className="bump like-button">
            Unlike
          </button>
        )}
      </div>
    </div>
  </div>)
  }
  return (
    <>
    {pageType}
    </>
  );
}

export default Pin;
