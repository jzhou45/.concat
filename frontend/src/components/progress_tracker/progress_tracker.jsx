import React from 'react';
import ProgressIcon from '../../assets/images/loading-cat.gif'
import {openModal} from '../../actions/modal_actions'
import { connect } from 'react-redux'

const ProgressTracker = (props) => {

    const {currentUser, openModal} = props

    const handleClick = (e) => {
        e.preventDefault() 
        openModal("progresstracker")
    }

    const content = () => {
        return (
            <div className='progress-tracker-container'>
                <div className='progress-tracker-label'>
                    <div>
                        {`${currentUser.username}'s Progress`}
                    </div>
                </div>
                <div onClick={handleClick} className='progress-tracker-icon'>
                    <img src={ProgressIcon} alt="" />
                </div>
            </div>
        )
    }
    
    return currentUser.username ? content() : ""
}

const mSTP = ({session: {user}}) => {
    return {
        currentUser: user
    }
}

const mDTP = (dispatch) => {
    return {
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(mSTP, mDTP)(ProgressTracker)