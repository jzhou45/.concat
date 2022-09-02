import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {editProblem } from "../../actions/problem_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import { useDispatch } from "react-redux";
import { clearProblemErrors } from "../../actions/problem_actions";

const EditProblemForm = (props) => {
    
    const dispatch = useDispatch();

    const {room, problem} = props;

    const [state, setState] = useState({
        title: problem.title,
        description: problem.description,
        testCase: problem.testCase,
        solution: problem.solution,
        testCase2: problem.testCase2,
        solution2: problem.solution2,
        difficulty: problem.difficulty,
        seed: false
    });

    useEffect(() => {
        dispatch(clearProblemErrors())
    }, [dispatch]);

    const handleUpdate = (field) => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        props.editProblem(room.id, problem._id, state).then((resp) => {
            if (resp.type !== "RECEIVE_PROBLEM_ERRORS") {
                props.closeModal();
            };
        });
    };

    const handleDelete = (e) => {
        e.preventDefault()
        props.openModal("deleteproblem", {roomId: room.id, problemId: problem._id})
    };

    const content = () => {
        return (
            <div className="create-problems-form">
                <div className="create-problem-title">
                    <div>
                        Edit Problem
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
                        placeholder={state.title}
                        type="text" value={state.title} onChange={handleUpdate("title")}/>
                        {(props.errors.title) ? <p className="problems-errors">{props.errors.title}</p> :null }
                    </label>
    
                    <label>Description *
                        <textarea 
                        placeholder={state.description}
                        value={state.description} onChange={(handleUpdate("description"))}></textarea>
                        {(props.errors.description) ? <p className="problems-errors">{props.errors.description}</p> :null }
                    </label>
    
                    <label>Test Case 1 *
                        <textarea 
                        placeholder={state.testCase}
                        value={state.testCase} onChange={handleUpdate("testCase")}></textarea>
                        {(props.errors.testCase) ? <p className="problems-errors">{props.errors.testCase}</p> :null }
                    </label>
    
                    <label>Solution 1 *
                        <input type="text" 
                        placeholder={state.solution}
                        value={state.solution} onChange={handleUpdate("solution")}/>
                        {(props.errors.solution) ? <p className="problems-errors">{props.errors.solution}</p> :null }
                    </label>
    
                    <label>Difficulty
                        <div className="difficulty-radio" >
                                <div>
                                    <label htmlFor="easy">Easy
                                    </label>
                                    <input 
                                        onChange={handleUpdate("difficulty")} 
                                        name="difficulty" 
                                        id="easy" 
                                        type="radio" 
                                        value="easy"
                                        checked={state.difficulty === "easy"}
                                        />
                                </div>
                                <div>
                                    <label htmlFor="medium">Medium
                                    </label>
                                    <input  onChange={handleUpdate("difficulty")} name="difficulty" id="medium" type="radio" value="medium" checked={state.difficulty === "medium"}/>
                                </div>
                                <div>
                                    <label htmlFor="hard">Hard
                                    </label>
                                    <input  onChange={handleUpdate("difficulty")} name="difficulty" id="hard" type="radio" value="hard" checked={state.difficulty === "hard"}/>
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
                    <button type="button" onClick={handleDelete} className="delete-problem button">Delete Problem </button>
                    <button className="problem button" type="submit">Edit Problem</button>
                </form>
            </div>
        );
    };

    return content();

};

const mSTP = ({errors, ui: {modal}}) => {
    return {
        errors: errors.problems,
        room: modal.props.room, 
        problem: modal.props.problem
    };
};

const mDTP = (dispatch) => {
    return {
        editProblem: (roomId, problemId, problemData) => dispatch(editProblem(roomId, problemId, problemData)),
        closeModal: () => dispatch(closeModal()), 
        openModal: (formType, props) => dispatch(openModal(formType, props))
    };
};

export default connect(mSTP, mDTP)(EditProblemForm);