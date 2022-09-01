import React, {useState, useEffect} from 'react';
import ProgressIcon from '../../assets/images/cat.jpeg'
import {openModal} from '../../actions/modal_actions'
import { connect } from 'react-redux'
import { fetchProblems } from "../../actions/problem_actions";
import LoadingContainer from '../util/loading_container';
import { abbreviate } from '../util/function_util';

const ProgressTracker = (props) => {

    const {currentUser, openModal, problems, fetchProblems} = props
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        fetchProblems()
            .finally(() => (setLoading(false)))
    }, [])
    
    const handleClick = (e) => {
        e.preventDefault() 
        openModal("progresstracker")
    }

    const content = () => {
        return (
            <div className='progress-tracker-container'>
                <div className='progress-tracker-label'>
                    <div>
                        {`${abbreviate(currentUser.username, 9)}'s progress`}
                    </div>
                </div>
                <div onClick={handleClick} className='progress-tracker-icon'>
                    <img src={ProgressIcon} alt="" />
                </div>
            </div>
        )
    }
    
    return loading ? <LoadingContainer/> : currentUser.username ? content() : ""
}

const mSTP = ({session: {user}}, problems) => {
    return {
        currentUser: user, 
        problems
    }
}

const mDTP = (dispatch) => {
    return {
        openModal: (formType, props) => dispatch(openModal(formType, props)),
        fetchProblems: () => dispatch(fetchProblems())
    }
}

export default connect(mSTP, mDTP)(ProgressTracker)