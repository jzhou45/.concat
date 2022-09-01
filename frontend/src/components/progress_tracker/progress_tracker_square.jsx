import React from "react";
import { abbreviate } from "../util/function_util";

const ProgressTrackerSquare = (props) => {

    const {problem, isCompleted} = props

    const difficulty = problem?.difficulty?.toLowerCase()

    return (
        <div className="progress-tracker-square">
            <div 
                className={`grid-square ${difficulty === "hard"
                    ? "hard" : difficulty === "medium"
                    ? "medium" : "easy"}
                    ${isCompleted ? "completed" : "incompleted"}`}
                    >
            </div>
            <div className={`grid-square-label`}>
                {`${abbreviate(problem.title, 8)}`}
            </div>
        </div>
    )
}

export default ProgressTrackerSquare