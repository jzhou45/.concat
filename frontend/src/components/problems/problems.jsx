import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProblems, fetchCreatedProblems } from "../../actions/problem_actions";
import { fetchRooms} from "../../actions/room_actions";
import { openModal } from "../../actions/modal_actions";
import { useHistory } from "react-router-dom";
import Arrow from '../../assets/images/left-arrow-icon.png'
import SearchIcon from '../../assets/images/search-icon.png'
import ProblemListItem from "./problem_list_item";
import CopyIcon from '../../assets/images/copy-icon.png'
import LoadingContainer from '../util/loading_container';

const Problems = props => {
    const {fetchRooms, fetchProblems, fetchCreatedProblems, problems, currentRoom,
        currentRoomId, openModal, rooms} = props;

    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false)

    setTimeout( ()=> {
        if (clicked) {
            setClicked(false)
        }
    }, 700)

    const [state, setState] = useState({
        problemType: "seed",
        problems: problems,
        rooms
    });
    
    useEffect(() => {
        fetchProblems()
        .then( () => fetchRooms())
        .then( () => fetchCreatedProblems(currentRoomId))
        .finally( () => setLoading(false))
    }, []);
    
    const handleCopy = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(joinRoomLink)
        setClicked(true)
    };

    const seededProblems = [];
    const customProblems = [];

    
    for (let problem of Object.values(problems)){
        if (problem.seed){
            seededProblems.push(problem);
        } else{
            customProblems.push(problem);
        };
    };

    const filteredCustomProblems = [];
    for (let problem of customProblems){
        if (problem.room === currentRoomId){
            filteredCustomProblems.push(problem);
        };
    };
    
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
                problemType: "custom"
            });
        } else{
            setState({
                problemType: "seed"
            });
        };
    };

    const history = useHistory();
    const joinRoomLink = `localhost:3000/#/rooms/${currentRoomId}/join`;

    const [query, setQuery] = useState('')
    const updateQuery = (e) => {
        setQuery(e.currentTarget.value)
    };

    const [customQuery, setCustomQuery] = useState('')
    const updateCustomQuery = (e) => {
        setCustomQuery(e.currentTarget.value)
    };

    const handleClick = () => {
        history.push("/rooms")
    };

    const rerenderProblems = () => {
        fetchCreatedProblems(currentRoomId).then(problems => {
            setState({
                problems
            });
        });
    };

    const rerenderRooms = (problemType) => {
        fetchRooms()
        // fetchRooms().then(rooms => setState({
        //     // rooms,
        //     problemType
        // }));
    };

    const content = () => {
        return(
            <div className="problems-page">
                <div className="problems-header">
                    <img src={Arrow} className="back-to-rooms" onClick={handleClick} />
                    <div className="room-info">
                        <h1>{currentRoom?.name}</h1>
                        <div className={`link ${currentRoom?.solo ? "hide" : ""}`}>
                            <form className="link-form">
                                <input 
                                type="text" 
                                value={joinRoomLink}
                                disabled="disabled"
                                />
                                <button onClick={handleCopy}>
                                    <img src={CopyIcon} alt="" />
                                </button>
                            </form>
                        </div>
                        <div className={`link-copied ${clicked ? "" : "hide"}`}>
                            Link has been copied!
                        </div>
                    </div>
                </div>
            
                <div className="problems-container">
                    <div className="select-problems">
                        <div className="leetcode-75" onClick={() => seededOrCustomQuestions("seed")}>
                            <span>Leetcode 75</span>
                        </div>

                        <div className="your-problems" onClick={() => seededOrCustomQuestions("custom")}>
                            <div></div>
                            <span>Your Problems</span>
                            <div onClick={() => openModal("createproblem", {currentRoom: currentRoomId, rerenderProblems: rerenderProblems})}>
                                <img src="https://icons-for-free.com/iconfiles/png/512/pencil-131965017493514588.png" alt="Edit" className="edit-problems" />
                            </div>
                        </div>

                    </div>

                    {(state.problemType === "seed") ?
                    
                        (<div className="seeded-problems-index">
                            <div className="problems search-bar">
                                <input onChange={updateQuery} placeholder="Find problem" type="text" />
                                <img className="magnifying-glass" src={SearchIcon} alt="" />
                            </div>
                            {seededProblems.sort(compareFn).map((problem, i) => (
                                
                                <ProblemListItem 
                                    seed={true}
                                    key={i} 
                                    problem={problem} 
                                    currentRoom={currentRoom} 
                                    query={query} 
                                    problemsListClassName={"problems-list"}
                                    rerenderRooms={rerenderRooms}
                                />
                            ))}
                        </div>) :

                        (<div className="custom-problems-index">
                            <div className="problems search-bar">
                                <input onChange={updateCustomQuery} placeholder="Find problem" type="text" />
                                <img className="magnifying-glass" src={SearchIcon} alt="" />
                            </div>
                            {filteredCustomProblems.map((problem, i) => (
                                <ProblemListItem 
                                    key={i} 
                                    problem={problem} 
                                    currentRoom={currentRoom} 
                                    query={customQuery} 
                                    problemsListClassName={"custom-problems-list"} 
                                    openModal={openModal}
                                    rerenderRooms={rerenderRooms}
                                /> 
                            ))}
                        </div>)
                    }       
                </div>
            </div>
        );
    };

    return loading? <LoadingContainer/> : content();
};

const mSTP = (state, ownProps) => {
    const currentRoomId = ownProps.location.pathname.split("/")[2];
    return {
        problems: state.problems,
        currentUser: state.session.user.username,
        currentRoom: state.rooms[currentRoomId],
        currentRoomId: currentRoomId,
        rooms: state.rooms
    };
};

const mDTP = dispatch => ({
    fetchProblems: () => dispatch(fetchProblems()),
    fetchRooms: () => dispatch(fetchRooms()),
    openModal: (modal, props) => dispatch(openModal(modal, props)),
    fetchCreatedProblems: (roomId) => dispatch(fetchCreatedProblems(roomId))
});

export default connect(mSTP, mDTP)(Problems);