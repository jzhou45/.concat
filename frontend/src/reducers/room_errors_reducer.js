import { RECEIVE_ROOM_ERRORS, CLEAR_ROOM_ERRORS } from "../actions/room_actions";

const _nullErrors = [];

const roomErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ROOM_ERRORS:
            return Object.assign({}, action.errors)
        case CLEAR_ROOM_ERRORS:
            return _nullErrors;
        default: 
            return state 

    }
}

export default roomErrorsReducer