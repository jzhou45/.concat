import React, {useRef} from "react";
import Plus from '../../assets/images/plus.png'
import closeDropdown from '../util/close_dropdown'
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { abbreviate } from "../util/function_util";

const RoomItemContainer = (props) => {


    const {openModal, room, query, currentUser} = props

    const roomName = room?.name ?? room;
    const roomPhotoUrl = room?.roomPhotoUrl;
    const solo = room?.solo;
    
    const show = room === "Create Room" || room?.name.toLowerCase().includes(query?.toLowerCase()) 

    const openRef = useRef(null)
    const [open, setOpen] = closeDropdown(openRef, false)
    const handleClick = () => {setOpen(!open)}

    const handleRename = (e) => {
        e.preventDefault() 
        openModal("editroom", {room: room})
    }

    const handleLeave = (e) => {
        e.preventDefault()
        openModal("leaveroom", {roomId: room.id})
    }

    const content = () => {
        return (
            <div className={`${show ? "" : "hide"} room-container`}>
                <div onClick={handleClick} className={`room-options-trigger ${roomPhotoUrl? "" : "hide"}`}>
                    <div className={`${solo ? "hide" : ""}`}>
                        ...
                    </div>
                    <div ref={openRef} className={`room-options-menu ${open ? "open" : "hide"}`}>
                        <div onClick={handleRename}>
                            <p>Edit room</p>
                        </div>
                        <div onClick={handleLeave}>
                            <p>Leave room</p>
                        </div>
                    </div>
                </div>
                <Link to={`${roomPhotoUrl ? `/rooms/${room.id}` : "/rooms" }`}>
                    <div className={`room-photo-container ${!roomPhotoUrl ? "create-room" : ""}`}>
                        <img className={roomPhotoUrl? "" : "plus"} src={roomPhotoUrl && !solo ? roomPhotoUrl : solo ? "" : Plus} alt="" />
                        <div className={`default-room ${solo ? "" : "hide"}`}>{abbreviate(currentUser?.toUpperCase(), 14)}</div>
                    </div>
                </Link>
                <div className="room-title">
                    <div>{roomName}</div>
                </div>
            </div>
        )
    }

    return content()
}

const mDTP = (dispatch) => {
    return {
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(null, mDTP)(RoomItemContainer)