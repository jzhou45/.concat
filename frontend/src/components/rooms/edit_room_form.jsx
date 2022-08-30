import React, {useState} from "react";
import { connect } from "react-redux";
import { renameRoom } from "../../actions/room_actions";
import { closeModal, openModal } from "../../actions/modal_actions";

const EditRoomForm = (props) => {
    
    const {room} = props

    const [state, setState] = useState({
        name: room.name,
        id: room.id
      })

    const update = (field) => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.renameRoom(state).then(() => props.closeModal())
    }

    const handleDelete = (e) => {
        e.preventDefault()
        props.openModal("deleteroom", {roomId: room.id})
    }

    // const renderErrors = () => {
    //     return(
    //       <ul>
    //         {errors.map((error, i) => (
    //           <li key={`error-${i}`} className="board-errors auth-errors">
    //             {error}
    //           </li>
    //         ))}
    //       </ul>
    //     );
    // }

    const content = () => {
        return (
            <div className="room-form">
                <div className="form-title">
                    Edit room
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                        type="text" 
                        onChange={update("name")}
                        value={state.name}
                        />
                        {/* { renderErrors } */}
                        <div className="form-button-div">
                            <button type="submit"  className={`${state.name != "" ? "clickable" : ""} room-create-button`}>
                                <div>Submit</div>
                            </button>
                            <button onClick={handleDelete} className="delete-room">
                                <div>Delete</div>
                            </button>
                        </div>
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
        room: modal.props.room
    }
}

const mDTP = (dispatch) => {
    return {
        renameRoom: roomData => dispatch(renameRoom(roomData)),
        closeModal: () => dispatch(closeModal()), 
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(mSTP, mDTP)(EditRoomForm)