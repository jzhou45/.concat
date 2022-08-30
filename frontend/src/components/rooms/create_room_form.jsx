import React, {useState, useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { createRoom } from "../../actions/room_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { clearRoomErrors } from "../../actions/room_actions";

const CreateRoomForm = (props) => {

    const dispatch = useDispatch()

    const {createRoom, error} = props

    useEffect(() => {
        dispatch(clearRoomErrors())
    }, [dispatch])

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
        createRoom(state).then((resp) => {
            if (resp !== undefined) {
                props.openModal("joinroom", {roomId: resp.room.data.id})
            }
        })
        
        // createRoom(state).then((resp) => props.openModal("joinroom", {roomId: resp.room.data.id}))
        // if (!error) {
        //     props.openModal("joinroom")
        // }
    }

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
                        <div className="room-errors">
                            {error}
                        </div>
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
        error: errors.room.name
    }
}

const mDTP = (dispatch) => {
    return {
        createRoom: roomData => dispatch(createRoom(roomData)),
        closeModal: () => dispatch(closeModal()),
        openModal: (formType, props) => dispatch(openModal(formType, props))
    }
}

export default connect(mSTP, mDTP)(CreateRoomForm)