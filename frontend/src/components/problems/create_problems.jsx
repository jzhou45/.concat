import React from "react";
import { connect } from "react-redux";
import { createProblem } from "../../actions/problem_actions";
import { useState } from "react";
import { closeModal } from "../../actions/modal_actions";

const CreateProblems = props => {
    const [state, setState] = useState({
        title: "",
        description: "",
        testCase: "",
        solution: "",
        testCase2: "",
        solution2: "",
        seed: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        const problem = Object.assign({}, state);
        props.createProblem(props.currentRoomId, problem).then(() => {
            props.closeModal();
            props.rerenderProblems();
        });
    };

    const handleUpdate = field => (
        e => setState({
            ...state, [field]: e.currentTarget.value
        })
    );

    return (
        <div className="create-problems-form">
            <div className="create-problem-title">
                <div>
                    Create Problem
                </div>
                <div className="required-note">
                    <div className="asterisk">
                        *
                    </div>
                    <div>
                        is required
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Title * 
                    <input 
                    placeholder="ex: Two Sum"
                    type="text" value={state.title} onChange={handleUpdate("title")}/>
                </label>

                <label>Description *
                    <textarea 
                    placeholder="ex: Given an array of integer nums and a targer, return indices of the two numbers so they add up to the target."
                    value={state.description} onChange={(handleUpdate("description"))}></textarea>
                </label>

                <label>Test Case 1 *
                    <textarea 
                    placeholder="ex: nums = [2, 7, 11, 15], target = 9"
                    value={state.testCase} onChange={handleUpdate("testCase")}></textarea>
                </label>

                <label>Solution 1 *
                    <input type="text" 
                    placeholder="ex: [0, 1]"
                    value={state.solution} onChange={handleUpdate("solution")}/>
                </label>

                <label>Difficulty
                    <div className="difficulty-radio" >
                            <div>
                                <label htmlFor="easy">Easy
                                </label>
                                <input name="difficulty" id="easy" type="radio" value="easy"/>
                            </div>
                            <div>
                                <label htmlFor="medium">Medium
                                </label>
                                <input name="difficulty" id="medium" type="radio" value="medium"/>
                            </div>
                            <div>
                                <label htmlFor="hard">Hard
                                </label>
                                <input name="difficulty" id="hard" type="radio" value="hard"/>
                            </div>
                    </div>
                </label>

                <label> Test Case 2
                    <textarea 
                    placeholder="ex: nums = [3,2,4], target = 6"
                    value={state.testCase2} onChange={handleUpdate("testCase2")}></textarea>
                </label>

                <label>Solution 2
                    <input 
                    placeholder="[1,2]"
                    type="text" value={state.solution2} onChange={handleUpdate("solution2")}/>
                </label>

                <button className="problem button" type="submit">Create Problem</button>
            </form>

        </div>
    );
};

const mSTP = (state) => ({
    currentRoomId: state.ui.modal.props.currentRoom,
    rerenderProblems: state.ui.modal.props.rerenderProblems
});

const mDTP = dispatch => ({
    createProblem: (roomId, problem) => dispatch(createProblem(roomId, problem)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(CreateProblems);