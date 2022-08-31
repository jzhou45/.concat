import { 
    // RECEIVE_USERS, 
    RECEIVE_ROOM, 
    RECEIVE_ROOMS,
    REMOVE_ROOM,
    RECEIVE_RENAMED_ROOM
} from '../actions/room_actions';
import {RECEIVE_USER_LOGOUT} from '../actions/session_actions'

const roomsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign( {}, state);
    switch(action.type) {
        case RECEIVE_ROOMS:
            const rooms = action.rooms?.data
            rooms.forEach(room => {
                nextState[room.id] = room
            }) 
            return nextState
            case RECEIVE_USER_LOGOUT:
                nextState = {}
            return nextState
        case RECEIVE_ROOM:
            nextState[action.room.data.id] = action.room.data;
            return nextState
        case RECEIVE_RENAMED_ROOM: 
            nextState[action.room.data.id] = action.room.data
            return nextState
        case REMOVE_ROOM: 
            delete nextState[action.roomId];
            return nextState
        default:
            return state;
    }
}

export default roomsReducer;