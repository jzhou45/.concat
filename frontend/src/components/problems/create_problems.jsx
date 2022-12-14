import React, {useEffect, useState} from "react";
import { connect, useDispatch } from "react-redux";
import { createProblem, clearProblemErrors } from "../../actions/problem_actions";
import { closeModal } from "../../actions/modal_actions";
import { createDocument } from "../../actions/document_actions";

const CreateProblems = props => {
    const {errors, createProblem, currentRoomId, closeModal, rerenderProblems, createDocument} = props;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearProblemErrors())
    }, [dispatch])

    const [state, setState] = useState({
        title: "",
        description: "",
        testCase: "",
        solution: "",
        testCase2: "",
        solution2: "",
        difficulty: "",
        seed: false
    });


    const handleSubmit = e => {
        e.preventDefault();
        const problem = Object.assign({}, state);
        createProblem(currentRoomId, problem).then((resp) => {

            if (resp.type !== "RECEIVE_PROBLEM_ERRORS") {
                closeModal();
                rerenderProblems();
            };

            // createDocument(currentRoomId, resp.problem.data._id, {body: "", problem: resp.problem.data._id, room: currentRoomId})

        });
        // createDocument(currentRoomId, document.problemId, document.body);
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
                    {(errors.title) ? <p className="problems-errors">{errors.title}</p> : null}
                </label>

                <label>Description *
                    <textarea 
                    placeholder="ex: Given an array of integer nums and a targer, return indices of the two numbers so they add up to the target."
                    value={state.description} onChange={(handleUpdate("description"))}></textarea>
                    {(errors.description) ? <p className="problems-errors">{errors.description}</p> : null}
                </label>

                <label>Test Case 1 *
                    <textarea 
                    placeholder="ex: nums = [2, 7, 11, 15], target = 9"
                    value={state.testCase} onChange={handleUpdate("testCase")}></textarea>
                    {(errors.testCase) ? <p className="problems-errors">{errors.testCase}</p> : null}
                </label>

                <label>Solution 1 *
                    <input type="text" 
                    placeholder="ex: [0, 1]"
                    value={state.solution} onChange={handleUpdate("solution")}/>
                    {(errors.solution) ? <p className="problems-errors">{errors.solution}</p> : null}
                </label>

                <label>Difficulty
                    <div className="difficulty-radio" >
                            <div>
                                <label htmlFor="easy">Easy
                                </label>
                                <input onClick={handleUpdate("difficulty")} name="difficulty" id="easy" type="radio" value="easy"/>
                            </div>
                            <div>
                                <label htmlFor="medium">Medium
                                </label>
                                <input  onClick={handleUpdate("difficulty")} name="difficulty" id="medium" type="radio" value="medium"/>
                            </div>
                            <div>
                                <label htmlFor="hard">Hard
                                </label>
                                <input  onClick={handleUpdate("difficulty")} name="difficulty" id="hard" type="radio" value="hard"/>
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
                    placeholder="ex: [1,2]"
                    type="text" value={state.solution2} onChange={handleUpdate("solution2")}/>
                </label>

                <button className="problem button" type="submit">Create Problem</button>
            </form>

        </div>
    );
};

const mSTP = (state) => ({
    currentRoomId: state.ui.modal.props.currentRoom,
    rerenderProblems: state.ui.modal.props.rerenderProblems,
    errors: state.errors.problems
});

const mDTP = dispatch => ({
    createProblem: (roomId, problem) => dispatch(createProblem(roomId, problem)),
    closeModal: () => dispatch(closeModal()),
    createDocument: (roomId, problemId, documentData) => dispatch(createDocument(roomId, problemId, documentData))
});

export default connect(mSTP, mDTP)(CreateProblems);