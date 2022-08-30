import { joinRoom } from '../../actions/room_actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const LoggedInJoinContainer = (props) => {

    const {joinRoom, roomId, currentUser, path} = props
    const history = useHistory()

    useEffect(() => {
        joinRoom(roomId).then(() => history.push(`rooms/${roomId}`))
    },[])

}

const mSTP = ({session}, props) => {
    return {
        roomId: props.path.split("/")[2],
    }
}

const mDTP = (dispatch) => {
    return {
        joinRoom: (roomId) => dispatch(joinRoom(roomId))
    }
}

export default connect(mSTP, mDTP)(LoggedInJoinContainer)