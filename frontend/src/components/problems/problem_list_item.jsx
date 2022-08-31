import React, { useRef } from "react";
import { Link } from "react-router-dom";
import closeDropdown from "../util/close_dropdown";


const ProblemListItem = props => {
    const { problem, currentRoomId, query, openModal, problemsListClassName } = props;

    
    const openRef = useRef(null);
    const [open, setOpen] = closeDropdown(openRef, false);
    const handleDropdown = () => {setOpen(!open)};

    const handleEdit = (problem) => {
        openModal("editproblem", {room: props.currentRoom, problem: problem});
    };

    const show = (problem, searchQuery) => {
        return problem?.title?.toLowerCase().includes(searchQuery?.toLowerCase());
    };


    return(
        <div className={`${show(problem, query) ? "" : "hide"} ${problemsListClassName}`}>
            <div className={`individual-problem`}>
                <input type="checkbox" className="problems-checkbox"/>
                <Link to={`/rooms/${currentRoomId}/problems/${problem._id}`}>
                    <p>{problem.title}</p>
                </Link>
            </div>
            <div onClick={handleDropdown} className={`problem options-trigger`}>
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

export default ProblemListItem;