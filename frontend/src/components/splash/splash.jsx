import React from 'react'
import { connect } from 'react-redux'
import SplashOneContainer from './splash-first-page'

const SplashContainer = () => {

    const content = () => {
        return (
        <div className='splash-container'>
            <div className='splash-first-page-container'>
                <SplashOneContainer/>
            </div>
        </div>
        )
    }

    return content()
}

export default SplashContainer