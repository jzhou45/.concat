import { fetchRooms, joinRoom } from '../../actions/room_actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const LoggedInJoinContainer = (props) => {

    const {joinRoom, roomId, currentUser, rooms, fetchRooms, path} = props
    const history = useHistory()

    useEffect(() => {
        if (Object.keys(rooms).length === 0) {
            fetchRooms()
        }
        joinRoom(roomId).finally(() => history.push(`rooms/${roomId}`))
    },[])

}

const mSTP = ({session, rooms}, props) => {
    return {
        roomId: props.path.split("/")[2],
        rooms
    }
}

const mDTP = (dispatch) => {
    return {
        joinRoom: (roomId) => dispatch(joinRoom(roomId)),
        fetchRooms: () => dispatch(fetchRooms())
    }
}

export default connect(mSTP, mDTP)(LoggedInJoinContainer)