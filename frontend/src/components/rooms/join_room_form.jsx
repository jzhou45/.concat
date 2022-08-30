import React, {useState} from "react";
import { connect } from "react-redux";
import { joinRoom } from "../../actions/room_actions";
import { closeModal } from "../../actions/modal_actions";

const JoinRoomForm = (props) => {
    
    const {joinRoom, roomId} = props

    const joinRoomLink = `/api/rooms/${roomId}/join`
    // this link should be at the front of the room (problems index)

    const handleClick = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(joinRoomLink)
    }

    const content = () => {
        return (
            <div className="join room-form">
                <div className="form-title">
                    Join room link
                </div>
                <div>
                    <form>
                        <input 
                        type="text" 
                        value={joinRoomLink}
                        disabled="disabled"
                        />
                        {/* { renderErrors } */}
                        <button onClick={handleClick}>
                            <div>Copy link</div>
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({errors, ui: {modal}}) => {
    console.log(modal)
    // needs roomId passed in through modal props
    return {
        errors,
        roomId: modal.props.roomId
    }
}

const mDTP = (dispatch) => {
    return {
        joinRoom: roomId => dispatch(joinRoom(roomId)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, null)(JoinRoomForm)