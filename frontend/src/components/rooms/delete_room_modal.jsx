import React from "react";
import { connect } from "react-redux";
import { deleteRoom } from "../../actions/room_actions";
import { closeModal } from "../../actions/modal_actions";

const DeleteRoomContainer = (props) => {
    
    const {deleteRoom} = props

    const handleClick = (e) => {
        e.preventDefault()
        // deleteRoom(state).then(() => closeModal())
    }

    const content = () => {
        return (
            <div className="confirmation-modal">
                <div className="confirmation-title">
                    Delete room?
                </div>
                <div className="confirmation-text">
                    <p>
                        If you delete a room, there is no way to get it back. But go ahead click it.
                    </p>
                </div>
                <div className="delete button">
                    Delete
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({ui: {modal}}) => {
    return {
        roomId:modal.props.roomId
    }
}

const mDTP = (dispatch) => {
    return {
        deleteRoom: () => dispatch(deleteRoom()),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(null, mDTP)(DeleteRoomContainer)