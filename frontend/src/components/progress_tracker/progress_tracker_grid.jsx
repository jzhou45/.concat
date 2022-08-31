import React from 'react';
import ProgressIcon from '../../assets/images/loading-cat.gif'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal_actions';

const ProgressTrackerGraph = (props) => {

    const {currentUser, closeModal} = props

    const handleClick = (e) => {
        e.preventDefault() 
        props.closeModal()
    }

    const content = () => {
        return (
            <div className='progress-tracker-modal'>
                <div className='progress-label'>
                    {`${currentUser.username}'s progress`}
                </div>
            </div>
        )
    }
    return content()
}

const mSTP = ({session: {user}}) => {
    return {
        currentUser: user
    }
}

const mDTP = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(ProgressTrackerGraph)