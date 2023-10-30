import React, {useRef, useEffect, useCallback} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getRandomPhotos } from '../../services/unsplash'
import { pinActions } from '../../store/pin-slice'

import Pin from './Pin'
function PinList() {
    const photos = useSelector(state => state.pin.photos)
    const isLoading = useSelector(state => state.pin.isLoading)
    const dispatch = useDispatch()
    const page = useRef(1);

    console.log(photos)
    console.log(isLoading)
    const fetchPhotoHandler = async() =>{
        
       const response = await getRandomPhotos();
       dispatch(pinActions.setPhotos(response.data))
       dispatch(pinActions.toggleLoading(false))
    }

    const handleScroll = useCallback(async() => {
        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            const response = await getRandomPhotos();
            console.log("new photos",response.data)
            dispatch(pinActions.addPhotos(response.data))
            page.current += 1
        }
    },[dispatch])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () =>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[handleScroll])

    if(isLoading){
        return <p>LOADING...</p>
    }

    console.log("all photos:",photos);
    const pinList = photos.map((item)=>{
        return (<Pin key={item.id} id={item.id} description={item.description} img={item.urls.regular} />)
    })

  return (
    <div className="py-2 px-16">
        <button onClick={fetchPhotoHandler}>Replace photos</button>
        <ul className="lg:columns-7 columns-4 gap-y-20">
            {pinList}
        </ul>
    </div>
  )
}

export default PinList