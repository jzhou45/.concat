import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../util/loading_container'
import RoomItemContainer from './room_item'
import { fetchRooms } from '../../actions/room_actions'
import { openModal } from '../../actions/modal_actions'

const RoomsPageContainer = (props) => {

    const currentUser = props.currentUser.username

    const { fetchRooms, rooms, openModal} = props

    useEffect( () => {
        fetchRooms().finally(() => setLoading(false))
    }, [])
    
    const [loading, setLoading] = useState(true)

    const userRooms = Object.keys(rooms).map((roomId) => rooms[roomId])

    const handleCreateClick = (e) => {
        e.preventDefault()
        openModal("createroom")
    }
    
    const content = () => {
        return (
            <div className="rooms-page-container">
                <div className='rooms-header'>
                    <div className="rooms-header-title">
                        {`${currentUser}'s rooms`}
                    </div>
                </div>
                <div className='rooms-container'>
                    <div className='rooms'>
                        {userRooms.map((room, i) => <RoomItemContainer 
                            key={i}
                            currentUser={currentUser}
                            room={room}
                            /> )}
                        <div onClick={handleCreateClick}>
                            {<RoomItemContainer room={"Create Room"}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return loading ? <LoadingContainer/> : content()
}

const mSTP = ({session: {user}, rooms}) => {
    return {
        currentUser: user, 
        rooms
    }
}

const mDTP = (dispatch) => {
    return {
        fetchRooms: () => dispatch(fetchRooms()), 
        openModal: (formType) => dispatch(openModal(formType))
    }
}

export default connect(mSTP, mDTP)(RoomsPageContainer)
