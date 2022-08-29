import { 
    RECEIVE_USERS, 
    RECEIVE_ROOM, 
    RECEIVE_ROOMS,
    RECEIVE_ROOM_ERRORS 
} from '../actions/room_actions';

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

        // case RECEIVE_ROOM:
        //     nextState[action.room.data.id] = action.room.data;

        //     nextState = Object.keys(nextState).sort().reduce(
        //         (obj, key) => { 
        //           obj[key] = nextState[key]; 
        //           return obj;
        //         }, 
        //         {}
        //     );
        //     return nextState;

        default:
            return state;
    }
}

export default roomsReducer;