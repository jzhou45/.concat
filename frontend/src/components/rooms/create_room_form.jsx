import React from "react";
import { connect } from "react-redux";
import { createRoom } from "../../actions/room_actions";

const CreateRoomForm = (props) => {
    
    const {createRoom} = props

    const content = () => {
        return (
            <div className="create-room-form">
                
            </div>
        )
    }

}

const mDTP = (dispatch) => {
    return {
        createRoom: roomData => dispatch(createRoom(roomData))
    }
}

export default connect(null, mDTP)(CreateRoomForm)