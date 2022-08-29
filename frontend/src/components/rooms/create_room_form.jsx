import React from "react";
import { connect } from "react-redux";
import { createRoom } from "../../actions/room_actions";

const CreateRoomForm = (props) => {
    
    const {roomData} = props

}

const mDTP = (dispatch) => {
    return {
        createRoom: dispatch => createRoom(roomData)
    }
}

export default connect(null, mDTP)(CreateRoomForm)