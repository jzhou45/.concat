import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../util/loading_container'
import RoomItemContainer from './room_item'
import { fetchRooms } from '../../actions/room_actions'


const RoomsPageContainer = (props) => {

    const currentUser = props.currentUser.username

    const { fetchRooms, rooms} = props

    useEffect( () => {
        fetchRooms().finally(() => setLoading(false))
    }, [])
    
    const [loading, setLoading] = useState(true)

    const userRooms = Object.keys(rooms).map((roomId) => rooms[roomId])
    
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
                            roomName={room.name} 
                            roomPhotoUrl={room.roomPhotoUrl} 
                            solo={room.solo}
                            /> )}
                        {<RoomItemContainer roomName={"Create Room"}/>}
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
        fetchRooms: () => dispatch(fetchRooms())
    }
}

export default connect(mSTP, mDTP)(RoomsPageContainer)
