import React,{useState} from "react";
import Modal from "../UI/Modal";
import { postPin } from "../../services/post";
import { useSelector, useDispatch } from "react-redux";
import { userPinActions } from "../../store/userPin-slice";
import { userActions } from "../../store/user-slice";
function PostPin(props) {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('')
    const [buttonText,setButtonText] = useState('Post');
    const userId = useSelector(state => state.user.user.id)
    const dispatch = useDispatch();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setButtonText('Uploading...');
        const formData = new FormData();
        formData.append('title',title);
        formData.append('image',image);
        formData.append('description',description);

        const payload = {
            title:title,
            image:image,
            description
        }

        console.log(payload)
        try{
            const response = await postPin(userId,formData);
            console.log(response.data)
            dispatch(userPinActions.addPhotos(response.data.post))
            dispatch(userActions.addPost(response.data.post._id))
            props.setModal(false);
            setButtonText('Post');
        }catch(e){
            setButtonText('Post');
            console.log("could not post data")
        }
        
    }

  return (
    <>
      {
        <Modal onClose={props.onClose}>
            <form
              className="flex flex-col w-1/2 mx-auto my-8"
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                value={title}
                className="rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:border-blue-300"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="image">Image: </label>
              <input
                type="file"
                name="image"
                className="rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:border-blue-300"
                placeholder="image"
                onChange={(e)=> setImage(e.target.files[0])}
              />
              <label htmlFor="image">Description: </label>
              <input
                type="text"
                name="description"
                className="rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:border-blue-300"
                placeholder="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="py-2 w-full rounded-3xl text-white bg-red-600 mx-auto my-5 hover:bg-red-500"
              >
                {buttonText}
              </button>
            </form>
        </Modal>
      }
    </>
  );
}

export default PostPin;
