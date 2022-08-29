import React from "react";
import Plus from '../../assets/images/plus.png'

const RoomItemContainer = (props) => {

    const {roomName, roomPhotoUrl} = props

    const content = () => {
        return (
            <div className="room-container">
                <div className={`room-photo-container ${!roomPhotoUrl ? "create-room" : ""}`}>
                    <img className={roomPhotoUrl ? "" : "plus"} src={roomPhotoUrl ? roomPhotoUrl : Plus} alt="" />
                </div>
                <div className="room-title">
                    <div>{roomName}</div>
                </div>
            </div>
        )
    }

    return content()
}

export default RoomItemContainer