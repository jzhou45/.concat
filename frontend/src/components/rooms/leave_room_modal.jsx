import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { leaveRoom } from "../../actions/room_actions";

const LeaveRoomContainer = (props) => {

    const { leaveRoom, roomId } = props

    const handleClick = (e) => {
        e.preventDefault()
        leaveRoom(roomId)
        props.closeModal()
    }

    const content = () => {
        return (
            <div className="confirmation-modal">
                <div className="confirmation-title">
                    Leave room?
                </div>
                <div className="confirmation-text">
                    <p>
                        If you leave this room, you probably can rejoin again. So go ahead click it.
                    </p>
                </div>
                <div onClick={handleClick} className="leave button">
                    Leave room
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({ ui: { modal } }) => {
    return {
        roomId: modal.props.roomId
    }
}

const mDTP = (dispatch) => {
    return {
        leaveRoom: (roomId) => dispatch(leaveRoom(roomId)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(LeaveRoomContainer)