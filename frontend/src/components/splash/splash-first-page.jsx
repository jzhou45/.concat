import React from 'react'
import logo from '../../assets/images/concat_logo.png'
import Chevron from '../../assets/images/chevron-down.png'

const SplashFirstPageContainer = (props) => {

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
            <div onClick={props.handleArrow} className='splash-arrow'>
                <img src={Chevron} alt="" />
            </div>
        </div>
        )
    }

    return content()
}

export default SplashFirstPageContainer