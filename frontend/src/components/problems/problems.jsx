import { connect } from "react-redux";
import { fetchProblems } from "../../actions/problem_actions";
import { useEffect } from "react";
import { fetchRooms } from "../../actions/room_actions";


const Problems = props => {
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

    return(
        <div className="problems-page">
            <div>
                <h1>{props.currentRoom}</h1>
            </div>
            <div className="problems-container">
                <div className="leetcode-75">
                    <span>Leetcode 75</span>
                </div>
                <div className="seeded-problems-index">
                    {seededProblems.sort(compareFn).map((problem, i) => (
                        <div className="problems-list" key={i}>
                            <div>
                                <input type="checkbox"/>
                                <p>{problem.title}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
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
        currentRoom: state.rooms[currentRoomId]?.name
    }
};

const mDTP = dispatch => ({
    fetchProblems: () => dispatch(fetchProblems()),
    fetchRooms: () => dispatch(fetchRooms())
});

export default connect(mSTP, mDTP)(Problems);