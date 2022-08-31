import React, { useRef } from "react";
import { Link } from "react-router-dom";
import closeDropdown from "../util/close_dropdown";


const ProblemListItem = props => {
    const { problem, currentRoomId } = props;

    const [open, setOpen] = closeDropdown(openRef, false)

    const openRef = useRef(null)

    const [query, setQuery] = useState('')

    const handleDropdown = () => {setOpen(!open)}

    const show = (problem, searchQuery) => {
        return problem?.title?.toLowerCase().includes(searchQuery?.toLowerCase());
    };


    return(
        <div className={`${show(problem, query) ? "" : "hide"} problems-list`} key={i}>
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
                                                    <p onClick={handleEdit(problem)}>Edit problem</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div></div>
                                    <hr />
                            </div>
    )

}

export default ProblemListItem;