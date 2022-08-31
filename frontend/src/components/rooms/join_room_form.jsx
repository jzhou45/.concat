import React, {} from "react";
import { connect } from "react-redux";
import CopyIcon from '../../assets/images/copy-icon.png'

const JoinRoomForm = (props) => {
    
    const {roomId} = props

    const joinRoomLink = `localhost:3000/#/rooms/${roomId}/join`

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
                    <form className="link-form">
                        <input 
                        type="text" 
                        value={joinRoomLink}
                        disabled="disabled"
                        />
                        <button onClick={handleClick}>
                            <img src={CopyIcon} alt="" />
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({errors, ui: {modal}}) => {
    return {
        errors,
        roomId: modal.props.roomId
    }
}

export default connect(mSTP, null)(JoinRoomForm)