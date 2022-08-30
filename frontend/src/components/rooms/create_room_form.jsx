import React, {useState} from "react";
import { connect } from "react-redux";
import { createRoom } from "../../actions/room_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

const CreateRoomForm = (props) => {
    
    const {createRoom} = props

    const [state, setState] = useState({
        name: ''
      })

    const update = (field) => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // createRoom(state).then(() => props.closeModal())
        props.openModal("joinroom")
        // have user join the room they just created
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
                    Create board
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                        type="text" 
                        onChange={update("name")}
                        placeholder={"What would you like to name your room?"}
                        />
                        {/* { renderErrors } */}
                        <button type="submit"  className={`${state.name === "" ? "unclickable" : ""} room-create-button`}>
                            <div>Create</div>
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return content()

}

const mSTP = ({errors}) => {
    return {
        errors
    }
}

const mDTP = (dispatch) => {
    return {
        createRoom: roomData => dispatch(createRoom(roomData)),
        closeModal: () => dispatch(closeModal()),
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(null, mDTP)(CreateRoomForm)