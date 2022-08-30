import React from "react";
import { connect } from "react-redux";
import { deleteRoom } from "../../actions/room_actions";
import { closeModal } from "../../actions/modal_actions";

const DeleteRoomContainer = (props) => {
    
    const {deleteRoom, roomId} = props

    const handleClick = (e) => {
        e.preventDefault()
        deleteRoom(roomId)
        props.closeModal()
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
        roomId: modal.props.roomId
    }
}

const mDTP = (dispatch) => {
    return {
        deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(DeleteRoomContainer)