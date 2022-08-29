import React, {useRef} from "react";
import Plus from '../../assets/images/plus.png'
import closeDropdown from '../util/close_dropdown'

const RoomItemContainer = (props) => {

    const {roomName, roomPhotoUrl, currentUser, solo} = props

    const openRef = useRef(null)
    const [open, setOpen] = closeDropdown(openRef, false)
    const handleClick = () => setOpen(!open)

    const content = () => {
        return (
            <div className="room-container">
                <div onClick={handleClick} className={`room-options-trigger ${roomPhotoUrl? "" : "hide"}`}>
                    <div>
                        ...
                    </div>
                    <div ref={openRef} className={`room-options-menu ${open ? "open" : "hide"}`}>
                        <div>Rename room</div>
                        <div>Leave room</div>
                    </div>
                </div>
                <div className={`room-photo-container ${!roomPhotoUrl ? "create-room" : ""}`}>
                    <img className={roomPhotoUrl? "" : "plus"} src={roomPhotoUrl && !solo ? roomPhotoUrl : solo ? "" : Plus} alt="" />
                    <div className={`default-room ${solo ? "" : "hide"}`}>{currentUser?.toUpperCase()}</div>
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