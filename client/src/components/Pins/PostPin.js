import React,{useState} from "react";
import Modal from "../UI/Modal";
import { postPin } from "../../services/post";
import { useSelector } from "react-redux";
function PostPin(props) {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('')
    const userId = useSelector(state => state.user.user.id)
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("hello")
        const payload = {
            title:title,
            image:image,
            description
        }
        console.log(payload)
        try{
            const response = await postPin(userId,payload)
            console.log(response.data)
        }catch(e){
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
                value={image}
                onChange={(e)=> setImage(e.target.value)}
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
                Post
              </button>
            </form>
        </Modal>
      }
    </>
  );
}

export default PostPin;
