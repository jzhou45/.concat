import React from "react";
import { connect } from "react-redux";
import { deleteProblem } from "../../actions/problem_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

const DeleteProblemContainer = (props) => {
    
    const {deleteRoom, roomId, problemId} = props

    const handleClick = (e) => {
        e.preventDefault()
        // deleteRoom(roomId, problemId)
        props.closeModal()
    }

    const content = () => {
        return (
            <div className="confirmation-modal">
                <div className="confirmation-title">
                    Delete problem?
                </div>
                <div className="confirmation-text">
                    <p>
                        If you delete a problem, there is no way to get it back. But go ahead click it.
                    </p>
                </div>
                <div onClick={handleClick} className="delete button">
                    Delete
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({ui: {modal}}) => {
    return {
        roomId: modal.props.roomId,
        problemId: modal.props.problemId
    }
}

const mDTP = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        deleteProblem: (roomId, problemId) => dispatch(deleteProblem((roomId, problemId))),
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(mSTP, mDTP)(DeleteProblemContainer)

