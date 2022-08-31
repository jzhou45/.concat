import React from 'react';
import ProgressIcon from '../../assets/images/loading-cat.gif'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal_actions';

const ProgressTrackerModal = (props) => {

    const {currentUser, rooms, closeModal} = props


    const fetchUserCompletedProblems = () => {
        const userRooms = (Object.keys(rooms)).map((roomId) => rooms[roomId])
        let completedCounter = 0

        userRooms.forEach ((room) => {
            if (room?.problems.complete?.length !== undefined) {
                completedCounter += room?.problems?.complete?.length
            } 
        })


        return completedCounter
    }

    const content = () => {
        return (
            <div className='progress-tracker-modal'>
                <div className='progress-label'>
                    {`${currentUser.username}'s progress`}
                </div>
                <div className="progress-counter">
                    <div>Completed problems: </div>
                    {fetchUserCompletedProblems()}
                </div>
            </div>
        )
    }
    return content()
}

const mSTP = ({session: {user}, rooms}) => {
    return {
        currentUser: user, 
        rooms
    }
}

const mDTP = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(ProgressTrackerModal)