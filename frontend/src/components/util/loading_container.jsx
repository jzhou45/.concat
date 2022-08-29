import React from 'react'
import LoadingGif from '../../assets/images/loading-cat.gif'

const LoadingContainer = () => {
    return (
        <div className='loading-container'>
            <img src={LoadingGif} alt="" />
        </div>
    )
}


export default LoadingContainer