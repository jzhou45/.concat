import React, {useEffect, useState} from "react";
import IDEContainer from "../ide/ide";
import { connect } from "react-redux";
import { fetchProblem } from "../../actions/problem_actions";
import LoadingContainer from '../util/loading_container';
import Arrow from '../../assets/images/left-arrow-icon.png'
import { useHistory } from "react-router-dom";

const ProblemItemContainer = (props) => {

    const {roomId, problemId, problems, fetchProblem} = props;
    const [loading, setLoading] = useState(true);
    const history = useHistory()

    useEffect( () => {
        fetchProblem(roomId, problemId).finally(() => setLoading(false))
    }, []);

    const handleClick = () => {
        history.push(`/rooms/${roomId}`)
    };

    const problemItem = problems[problemId];
        
    const content = () => {
        return (
            <div className="problem-item-container">
                <div className="problem-item-header">
                    <div className="problem-item-text">
                        <div>
                            <div className="problem-item-title">
                                <div>
                                    {problemItem.title}
                                </div>
                                <div className={`${problemItem.difficulty ? "" : "hide"} problem-difficulty`}>
                                    <div>
                                        {problemItem?.difficulty?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <div className="problem-item-info">
                                {problemItem.description}
                            </div>
                        </div>
                        <img src={Arrow} className="back-to-problems" onClick={handleClick} />
                    </div>
                    <div className="problem-testcases">
                        <div className="testcase">
                            <h1>Example 1:</h1>
                            <div className="testcase-content">
                                <div className="testcase-line">
                                    <h2>Input:</h2>
                                    {problemItem.testCase}
                                </div>
                                <div className="testcase-line">
                                    <h2>Output:</h2>
                                    {problemItem.solution}
                                </div>
                            </div>
                        </div>
                        <div className={`testcase ${problemItem.testCase2 ? "" : "hide"}`}>
                            <h1>Example 2:</h1>
                            <div className="testcase-content">
                                <div className="testcase-line">
                                    <h2>Input:</h2>
                                    {problemItem.testCase2}
                                </div>
                                <div className="testcase-line">
                                    <h2>Output:</h2>
                                    {problemItem.solution2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ide-container">
                    <IDEContainer problemId={problemId} roomId={roomId} problem={problemItem} />
                </div>
            </div>
        );
    };

    return loading ? <LoadingContainer/> : content();
};

const mSTP = ({problems}, props) => {
    const url = props.match.url.split('/');
    return {
        roomId: url[2],
        problemId: url[4],
        problems
    };
};

const mDTP = (dispatch) => {
    return {
        fetchProblem: (roomId, problemId) => dispatch(fetchProblem(roomId, problemId))
    };
};

export default connect(mSTP, mDTP)(ProblemItemContainer);