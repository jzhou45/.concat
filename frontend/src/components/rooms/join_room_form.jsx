import React, {useState} from "react";
import { connect } from "react-redux";
import CopyIcon from '../../assets/images/copy-icon.png'
import { linkPrefix } from "../../util/constants_util";

const JoinRoomForm = (props) => {
    
    const {roomId} = props

    const joinRoomLink = `${linkPrefix}/#/rooms/${roomId}/join`
    const [clicked, setClicked] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(joinRoomLink)
        setClicked(true)
    }

    setTimeout( ()=> {
        if (clicked) {
            setClicked(false)
        }
    }, 700)

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
                <div className={`link-copied ${clicked ? "" : "hide"}`}>
                    Link has been copied!
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