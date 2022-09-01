import React from 'react';
import { connect } from 'react-redux'
import ProgressTrackerGrid from './progress_tracker_grid';

const ProgressTrackerModal = (props) => {

    const {currentUser, rooms} = props
    const userRooms = (Object.keys(rooms)).map((roomId) => rooms[roomId])

    // const allProblems = Object.keys(problems).map( (problemId) => problems[problemId])
    // const defaultProblems = allProblems.filter((problem) => problem.seed === true)

    const content = () => {
        return (
            <div className='progress-tracker-modal'>
                <div className='progress-label'>
                    {`${currentUser.username}'s progress`}
                    <div className='grid-key'>
                        <div className="grid-square"></div>
                        <div>incompleted</div>
                        <div className="grid-square completed easy"></div>
                        <div>easy/unspecified</div>
                        <div className="grid-square completed medium"></div>
                        <div>medium</div>
                        <div className="grid-square completed hard"></div>
                        <div>hard</div>
                    </div>
                </div>
                <div className="progress-grids-container">
                    {userRooms.map((userRoom, i) => <ProgressTrackerGrid 
                        key={i} 
                        room={userRoom}
                        // defaultProblems={defaultProblems}
                        />
                    )}
                </div>
            </div>
        )
    }
    return content()
}

const mSTP = ({session: {user}, rooms, problems}) => {
    return {
        currentUser: user, 
        rooms, 
        // problems
    }
}


export default connect(mSTP, null)(ProgressTrackerModal)