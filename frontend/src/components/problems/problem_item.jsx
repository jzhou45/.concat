import React, {useEffect, useState} from "react";
import IDEContainer from "../ide/ide";
import { connect } from "react-redux";
import { fetchProblem } from "../../actions/problem_actions";
import LoadingContainer from '../util/loading_container'

const ProblemItemContainer = (props) => {

    const {roomId, problemId, problems, fetchProblem} = props
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        fetchProblem(roomId, problemId).finally(() => setLoading(false))
    }, [])

    const problemItem = problems[problemId]
        
    const content = () => {
        return (
            <div className="problem-item-container">
                <div className="problem-item-header">
                    <div className="problem-item-text">
                        <div className="problem-item-title">
                            {problemItem.title}
                        </div>
                        <div className="problem-item-info">
                            {problemItem.description}
                        </div>
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
                    <IDEContainer/>
                </div>
            </div>
        )
    }

    return loading ? <LoadingContainer/> : content()
}

const mSTP = ({problems}, props) => {
    const url = props.match.url.split('/')
    return {
        roomId: url[2],
        problemId: url[4],
        problems
    }
}

const mDTP = (dispatch) => {
    return {
        fetchProblem: (roomId, problemId) => dispatch(fetchProblem(roomId, problemId))
    }
}

export default connect(mSTP, mDTP)(ProblemItemContainer)