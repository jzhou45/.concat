import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchCreatedProblems } from '../../actions/problem_actions';
import ProgressTrackerSquare from './progress_tracker_square';

const ProgressTrackerGrid = (props) => {

    const {room, fetchCreatedProblems, problems} = props
    // refactor so it doesnt get the 75 again for each room 

    const [loading, setLoading] = useState(true)
    
    useEffect( () => {
        fetchCreatedProblems(room?.id)
        .finally(() => setLoading(false))
    }, [])

    if (!room.problems?.complete || !room) return null

    const completedProblems = room.problems.complete
    const incompletedProblems = room.problems.incomplete
    const allRoomProblemIds = completedProblems.concat(incompletedProblems)
    const allRoomProblems = allRoomProblemIds.map((problemId) => problems[problemId])

    const content = () => {
        return (
            <div className='progress-tracker-grid'>
                <div className='grid-room-title'>
                    {room.name}
                </div>
                <div className='outer-grid-container'>
                    <div className="grid-container">
                        {   
                            allRoomProblems.map((problem, i) => <ProgressTrackerSquare
                            key={i}
                            problem={problem}
                            room={room}
                            isCompleted={completedProblems.includes(problem._id)}
                            />)
                        }
                    </div>
                </div>
            </div>
        )
    }
    
    return loading ? "" : content()
}

const mSTP = ({problems}) => {
    return {
        problems
    }
}

const mDTP = (dispatch) => {
    return {
        fetchCreatedProblems: (roomId) => dispatch(fetchCreatedProblems(roomId))
    }
}

export default connect(mSTP, mDTP)(ProgressTrackerGrid)