import { connect } from "react-redux";
import { fetchProblems } from "../../actions/problem_actions";
import { useEffect } from "react";
import { fetchRooms } from "../../actions/room_actions";
import { useState } from "react";
import { openModal } from "../../actions/modal_actions";

const Problems = props => {
    const [state, setState] = useState({
        problems: "seed"
    });

    useEffect(() => props.fetchProblems(), []);
    useEffect(() => props.fetchRooms(), []);

    const seededProblems = [];
    const customProblems = [];

    for (let problem of Object.values(props.problems)){
        if (problem.seed){
            seededProblems.push(problem);
        } else{
            customProblems.push(problem);
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
                problems: "custom"
            });
        } else{
            setState({
                problems: "seed"
            });
        };
    };

    return(
        <div className="problems-page">
            <div>
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
                        <div onClick={() => props.openModal("createproblem", {currentRoom: props.currentRoomId})}>
                            <img src="https://icons-for-free.com/iconfiles/png/512/pencil-131965017493514588.png" alt="Edit" className="edit-problems" />
                        </div>
                    </div>

                </div>

                {(state.problems === "seed") ?
                    
                    (<div className="seeded-problems-index">
                        {seededProblems.sort(compareFn).map((problem, i) => (
                            <div className="problems-list" key={i}>
                                <div>
                                    <div>
                                        <input type="checkbox" className="problems-checkbox"/>
                                        <p>{problem.title}</p>
                                    </div>
                                    <div></div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>) :

                    (<div className="custom-problems-index">
                        {customProblems.sort(compareFn).map((problem, i) => (
                            <div className="problems-list" key={i}>
                                <div>
                                    <div>
                                        <input type="checkbox"/>
                                        <p>{problem.title}</p>
                                    </div>
                                    <div></div>
                                </div>
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
    openModal: (modal, props=null) => dispatch(openModal(modal, props))
});

export default connect(mSTP, mDTP)(Problems);