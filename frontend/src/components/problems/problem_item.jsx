import React from "react";
import IDEContainer from "../ide/ide";
// you need to fetch problem data using problem item fetch 

const ProblemItemContainer = (props) => {

    const content = () => {
        return (
            <div className="problem-item-container">
                <div className="problem-item-header">
                    <div className="problem-item-info">
                        <div className="problem-item-title">
                            Problem Title
                        </div>
                        <div className="problem-item-info">
                            Problem Info 
                        </div>
                    </div>
                </div>
                <div className="ide-container">
                    <IDEContainer/>
                </div>
            </div>
        )
    }

    return content()
}

export default ProblemItemContainer