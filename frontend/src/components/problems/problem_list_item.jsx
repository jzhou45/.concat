import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import closeDropdown from "../util/close_dropdown";
import { patchComplete, patchIncomplete } from "../../actions/room_actions";
const debounce = require("lodash.debounce");

const ProblemListItem = props => {

    const { problem, seed=false, query, openModal, currentRoom, problemsListClassName,
    patchComplete, patchIncomplete, rerenderRooms, errors } = props;
    
    const openRef = useRef(null);
    const [open, setOpen] = closeDropdown(openRef, false);
    const handleDropdown = () => {setOpen(!open)};

    const handleEdit = (problem) => {
        openModal("editproblem", {room: props.currentRoom, problem: problem});
    };

    const show = (problem, searchQuery) => {
        return problem?.title?.toLowerCase().includes(searchQuery?.toLowerCase());
    };

    const [state, setState] = useState({
        completedQuestions: currentRoom.problems.complete,
        incompleteQuestions: currentRoom.problems.incomplete
    });

    const handleChange = useCallback(debounce(() => {
        if (checked){
            patchIncomplete(currentRoom.id, problem._id).then(() => {
                const newCompletedQuestions = (state.completedQuestions).filter(problemId => problemId !== problem._id);
                const newIncompleteQuestions = state.incompleteQuestions.concat([problem._id]);
                setState({
                    completedQuestions: newCompletedQuestions,
                    incompleteQuestions: newIncompleteQuestions
                });
                rerenderRooms("seed");
            });
            
        } else{
            patchComplete(currentRoom.id, problem._id).then(() => {
                const newCompletedQuestions = (state.completedQuestions).filter(problemId => problemId !== problem._id);
                const newIncompleteQuestions = state.incompleteQuestions.concat([problem._id]);
                setState({
                    completedQuestions: newCompletedQuestions,
                    incompleteQuestions: newIncompleteQuestions
                });
                rerenderRooms("custom")
            });
        }
    }, 500));
    
    const checked = currentRoom.problems.complete?.includes(problem._id)

    return(
        <div className={`${show(problem, query) ? "" : "hide"} ${problemsListClassName}`}>
            <div className={`individual-problem`}>
                <input type="checkbox" className="problems-checkbox" onChange={handleChange} checked={checked} />
                <Link to={`/rooms/${currentRoom.id}/problems/${problem._id}`}>
                    <p>{problem.title}</p>
                </Link>
            </div>
            <div onClick={handleDropdown} className={`${seed ? "hide" : "" } problem options-trigger`}>
                <div>
                    ...
                </div>
                <div ref={openRef} className={`problem options-menu ${open ? "open" : "hide"}`}>
                    <div >
                        <p onClick={() => handleEdit(problem)}>Edit problem</p>
                    </div>
                </div>
            </div>
            <div></div>
            <hr />
        </div>
    );
};

const mSTP = state => ({
    errors: state.errors
});

const mDTP = (dispatch) => {
    return {
        patchComplete: (roomId, problemId) => dispatch(patchComplete(roomId, problemId)),
        patchIncomplete: (roomId, problemId) => dispatch(patchIncomplete(roomId, problemId))
    };
};

export default connect(mSTP, mDTP)(ProblemListItem);