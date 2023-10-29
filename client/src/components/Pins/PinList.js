import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getRandomPhotos } from '../../services/unsplash'
import { pinActions } from '../../store/pin-slice'

import Pin from './Pin'
function PinList() {
    const photos = useSelector(state => state.pin.photos)
    const isLoading = useSelector(state => state.pin.isLoading)
    const dispatch = useDispatch()
    console.log(photos)
    console.log(isLoading)

    const fetchPhotoHandler = async() =>{
        
       const response = await getRandomPhotos();
       dispatch(pinActions.setPhotos(response.data))
       console.log(response.data);
       dispatch(pinActions.toggleLoading(false))
    }

    if(isLoading){
        return <p>LOADING...</p>
    }

    const pinList = photos.map((item)=>{
        return (<Pin key={item.id} id={item.id} description={item.description} img={item.urls.regular} />)
    })

  return (
    <div className="p-1">
        <button onClick={fetchPhotoHandler}>Replace photos</button>
        <ul className="columns-6 gap-2.5">
            {pinList}
        </ul>
    </div>
  )
}

export default PinList