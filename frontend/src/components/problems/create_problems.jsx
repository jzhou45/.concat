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
        props.createProblem(props.currentRoomId, problem).then(() => props.closeModal())
    };

    const handleUpdate = field => (
        e => setState({
            ...state, [field]: e.currentTarget.value
        })
    );

    return (
        <div className="create-problems-form">
            <form onSubmit={handleSubmit}>
                <label>Title
                    <input type="text" value={state.title} onChange={handleUpdate("title")}/>
                </label>

                <label>Description
                    <textarea value={state.description} onChange={(handleUpdate("description"))}></textarea>
                </label>

                <label>Test Case 1
                    <textarea value={state.testCase} onChange={handleUpdate("testCase")}></textarea>
                </label>

                <label>Solution 1
                    <input type="text" value={state.solution} onChange={handleUpdate("solution")}/>
                </label>

                <label> Test Case 2
                    <textarea value={state.testCase2} onChange={handleUpdate("testCase2")}></textarea>
                </label>

                <label>Solution 2
                    <input type="text" value={state.solution2} onChange={handleUpdate("solution2")}/>
                </label>

                <button type="submit">Create Problem</button>
            </form>
        </div>
    );
};

const mSTP = (state) => ({
    currentRoomId: state.ui.modal.props.currentRoom
});

const mDTP = dispatch => ({
    createProblem: (roomId, problem) => dispatch(createProblem(roomId, problem)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(CreateProblems);