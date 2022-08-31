import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchProblems, fetchCreatedProblems } from "../../actions/problem_actions";
import { fetchRooms } from "../../actions/room_actions";
import { openModal } from "../../actions/modal_actions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Arrow from '../../assets/images/left-arrow-icon.png'
import SearchIcon from '../../assets/images/search-icon.png'
import closeDropdown from "../util/close_dropdown";


const Problems = props => {

    const [state, setState] = useState({
        problems: "seed",
        problems: props.problems
    });

    useEffect(() => {
        props.fetchProblems();
        props.fetchRooms();
        props.fetchCreatedProblems(props.currentRoomId);
    }, []);

    const seededProblems = [];
    const customProblems = [];

    for (let problem of Object.values(props.problems)){
        if (problem.seed){
            seededProblems.push(problem);
        } else{
            customProblems.push(problem);
        };
    };

    const openRef = useRef(null)
    const [open, setOpen] = closeDropdown(openRef, false)
    const handleDropdown = () => {setOpen(!open)}

    const compareFn = (a, b) => {
        if (a < b){
            return -1;
        } else if (a > b){
            return 1;
        } else{
            return 0;
        };
    };

    const seededOrCustomQuestions = questionType => {
        if (questionType === "custom"){
            setState({
                problems: "custom"
            });
        } else{
            setState({
                problems: "seed"
            });
        };
    };

    const history = useHistory();

    const [query, setQuery] = useState('')
    const updateQuery = (e) => {
        setQuery(e.currentTarget.value)
    }

    const [customQuery, setCustomQuery] = useState('')
    const updateCustomQuery = (e) => {
        setCustomQuery(e.currentTarget.value)
    }

    const show = (problem, searchQuery) => {
        return problem?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    }

    const handleClick = () => {
        history.push("/rooms")
    };

    const handleEdit = (problem) => {
        props.openModal("editproblem", {room: props.currentRoom, problem: problem})
    }

    const rerenderProblems = () => {
        props.fetchCreatedProblems(props.currentRoomId).then(problems => {
            setState({
                problems
            });
        });
    };

    return(
        <div className="problems-page">
            <div className="problems-header">
                <img src={Arrow} className="back-to-rooms" onClick={handleClick}>
                </img>
                <h1>{props.currentRoom}</h1>
            </div>
            
            <div className="problems-container">
                <div className="select-problems">
                    <div className="leetcode-75" onClick={() => seededOrCustomQuestions("seed")}>
                        <span>Leetcode 75</span>
                    </div>

                    <div className="your-problems" onClick={() => seededOrCustomQuestions("custom")}>
                        <div></div>
                        <span>Your Problems</span>
                        <div onClick={() => props.openModal("createproblem", {currentRoom: props.currentRoomId, rerenderProblems: rerenderProblems})}>
                            <img src="https://icons-for-free.com/iconfiles/png/512/pencil-131965017493514588.png" alt="Edit" className="edit-problems" />
                        </div>
                    </div>

                </div>

                {(state.problems === "seed") ?
                    
                    (<div className="seeded-problems-index">
                        <div className="problems search-bar">
                            <input onChange={updateQuery} placeholder="Find problem" type="text" />
                            <img className="magnifying-glass" src={SearchIcon} alt="" />
                        </div>
                        {seededProblems.sort(compareFn).map((problem, i) => (
                            <div className={`${show(problem, query) ? "" : "hide"} problems-list`} key={i}>
                                        <div className={`individual-problem`}>
                                            <input type="checkbox" className="problems-checkbox"/>
                                            <Link to={`/rooms/${props.currentRoomId}/problems/${problem._id}`}>
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
                        ))}
                    </div>) :

                    (<div className="custom-problems-index">
                        <div className="problems search-bar">
                            <input onChange={updateCustomQuery} placeholder="Find problem" type="text" />
                            <img className="magnifying-glass" src={SearchIcon} alt="" />
                        </div>
                        {customProblems.map((problem, i) => (
                            <div className={`${show(problem, customQuery) ? "" : "hide"} custom-problems-list`} key={i}>
                                <div className={`individual-problem`}>
                                    <input type="checkbox" className="problems-checkbox"/>
                                    <Link to={`/rooms/${props.currentRoomId}/problems/${problem._id}`}>
                                        <p>{problem.title}</p>
                                    </Link>
                                </div>
                                <div></div>
                                <hr />
                            </div>
                        ))}
                    </div>)
                }       
            </div>
        </div>
    );
};

const mSTP = (state, ownProps) => {
    const currentRoomId = ownProps.location.pathname.split("/")[2];
    return {
        problems: state.problems,
        rooms: state.rooms,
        currentUser: state.session.user.username,
        currentRoom: state.rooms[currentRoomId]?.name,
        currentRoomId: currentRoomId
    };
};

const mDTP = dispatch => ({
    fetchProblems: () => dispatch(fetchProblems()),
    fetchRooms: () => dispatch(fetchRooms()),
    openModal: (modal, props) => dispatch(openModal(modal, props)),
    fetchCreatedProblems: (roomId) => dispatch(fetchCreatedProblems(roomId)),
});

export default connect(mSTP, mDTP)(Problems);