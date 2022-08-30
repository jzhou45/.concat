import * as RoomAPIUtil from "../util/room_api_util";
import { CLEAR_ERRORS } from "./session_actions";

export const RECEIVE_ROOM= "RECEIVE_ROOM";
export const REMOVE_ROOM= "REMOVE_ROOM";
export const RECEIVE_RENAMED_ROOM= "RECEIVE_RENAMED_ROOM";
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS"
export const CLEAR_ROOM_ERRORS = "CLEAR_ROOM_ERRORS"
// export const RECEIVE_USERS = "RECEIVE_USERS"
// export const RECEIVE_USER = "RECEIVE_USER"

export const receiveRooms = rooms=> ({
    type: RECEIVE_ROOMS,
    rooms
});

export const receiveRenamedRoom = room => ({
    type: RECEIVE_RENAMED_ROOM,
    room
})

export const clearRoomErrors = () => ({
    type: CLEAR_ROOM_ERRORS
})


export const receiveRoom = room=> ({
    type: RECEIVE_ROOM,
    room
});

export const removeRoom = roomId=> ({
    type: REMOVE_ROOM,
    roomId
});

export const receiveRoomErrors = errors => ({
    type: RECEIVE_ROOM_ERRORS,
    errors
});

// export const receiveUsers = users => ({
//     type: RECEIVE_USERS,
//     users
// });

// export const receiveUser = user => ({
//     type: RECEIVE_USER,
//     user
// });

export const fetchRooms = () => dispatch => {
    return RoomAPIUtil.fetchRooms()
        .then( rooms => dispatch(receiveRooms(rooms)))
}

export const fetchRoom = (roomId) => dispatch => {
    return RoomAPIUtil.fetchRoom(roomId)
        .then( room => dispatch(receiveRoom(room)))
}

export const deleteRoom = (roomId) => dispatch => {
    return RoomAPIUtil.deleteRoom(roomId)
        .then( () => dispatch(removeRoom(roomId)))
}

export const renameRoom = (roomData) => dispatch => {
    return RoomAPIUtil.renameRoom(roomData)
        .then( room => dispatch(receiveRenamedRoom(room)))
        .catch(err => {dispatch(receiveRoomErrors(err?.response?.data))})
}

export const joinRoom = (roomId) => dispatch => {
    return RoomAPIUtil.joinRoom(roomId)
        .then( room => dispatch(receiveRoom(room)))
}

export const leaveRoom = (roomId) => dispatch => {
    return RoomAPIUtil.leaveRoom(roomId)
        .then( () => dispatch(removeRoom(roomId)))
}

export const createRoom = (roomData) => dispatch => {
    return RoomAPIUtil.createRoom(roomData)
        .then( room => dispatch(receiveRoom(room)))
        .catch(err => {dispatch(receiveRoomErrors(err?.response?.data))})
}



