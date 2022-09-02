import LoggedOutJoin from './logged_out_join'
import LoggedInJoin from './logged_in_join';
import { joinRoom } from '../../actions/room_actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const NewJoinContainer = (props) => {

    const {roomId, currentUser, path} = props

    return currentUser?.id ? <LoggedInJoin path={path}/> : <LoggedOutJoin roomId={roomId} path={path}/>
}

const mSTP = ({session}, props) => {
    const currentRoomId = props.location.pathname.split("/")[2];
    return {
        roomId: currentRoomId,
        currentUser: session.user,
        path: props.location.pathname.split("join")[0]
    }
}

const mDTP = (dispatch) => {
    return {
        joinRoom: (roomId) => dispatch(joinRoom(roomId))
    }
}

export default connect(mSTP, mDTP)(NewJoinContainer)