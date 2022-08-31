import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { renameRoom } from "../../actions/room_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import { clearRoomErrors } from "../../actions/room_actions";
import { useDispatch } from "react-redux";

const EditRoomForm = (props) => {
    
    const dispatch = useDispatch() 
    
    const {room, errors} = props
    const [state, setState] = useState({
        name: room.name,
        id: room.id
      })

    useEffect(() => {
        dispatch(clearRoomErrors())
    }, [dispatch])

    const update = (field) => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.renameRoom(state).then((resp) => {
            if (resp !== undefined) {
                props.closeModal()
            }
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        props.openModal("deleteroom", {roomId: room.id})
    }

    const renderErrors = () => {
        return(
          <ul>
            {Object.values(errors).map((error, i) => (
              <li key={`error-${i}`} className="board-errors auth-errors">
                {error}
              </li>
            ))}
          </ul>
        );
    }
    

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
                    <div className="room-errors">
                            {renderErrors()}
                        </div>
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
        errors: errors.room,
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