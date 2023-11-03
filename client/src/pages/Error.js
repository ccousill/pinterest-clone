import React from 'react'
import {useRouteError} from 'react-router-dom'
function Error() {
    const error = useRouteError()
    let title = 'an  An error occured';
    let message = 'Something went wrong';
    if(error.status === 500){
        message = JSON.parse(error.data).message
    }
    if(error.status === 404){
        message = "Could not find resources"
        title ="Not Found"
    }
  return (
    <div>
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
  )
}

export default Error