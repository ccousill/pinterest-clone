import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { userActions } from '../../store/user-slice'
import { likePhoto, unlikePhoto } from '../../services/user'
function Pin({id,img,description}) {
    const user = useSelector(state => state.user.user)
    const isLiked = user.likes.some(obj => obj.photoId === id)

    const dispatch = useDispatch();
    const handleLike = async() =>{
        const userId = user.id;
        const payload = {
          userId: userId,
          photoId: id,
          imgURL: img,
          description: description
        }

        const photoObject = {
          photoId: id,
          imgURL: img,
          description: description
        }
        try{
          const response = await likePhoto(payload)
          dispatch(userActions.addLike(photoObject));
          console.log(response.data)
        }catch(e){
          console.log("could not like photo")
        }


    }

    const handleUnlike = async() =>{
        const userId = user.id;

        const payload = {
          userId: userId,
          photoId: id
        }

        try{
          const response = await unlikePhoto(payload)
          console.log(payload)
          dispatch(userActions.removeLike(payload));
          console.log(response.data)
        }catch(e){
          console.log("could not unlike photo")
        }

    }



  return (
    <div className='image-fade-in w-full break-inside-avoid-column inline-block relative image-container'>
        <img alt="" className="rounded-xl shadow-lg block w-full h-auto" src={img}/>
        <div className="overlay">
          <div className="options">
            {!isLiked && <button onClick={handleLike} className="bump like-button">Like</button>}
            {isLiked && <button onClick={handleUnlike} className="bump like-button">Unlike</button>}
          </div>
        </div>
    </div>
  )
}

export default Pin