import React from 'react'
import { connect } from 'react-redux'
import logo from '../../assets/images/concat_logo.png'

const SplashFirstPageContainer = () => {

    const content = () => {
        return (
        <div className='splash-first-page'>
            <div className='splash-title-logo'>
                <img src={logo} alt="" />
            </div>
            <div className="splash-title-container">
                <div className='splash-title-con'>.con</div>
                <div className='splash-title-cat'>cat</div>
            </div>
        </div>
        )
    }

    return content()
}

export default SplashFirstPageContainer