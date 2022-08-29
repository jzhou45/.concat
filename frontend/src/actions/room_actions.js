import * as RoomAPIUtil from "../util/room_api_util";

export const RECEIVE_ROOM= "RECEIVE_ROOM";
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_PET_ERRORS"
export const RECEIVE_USERS = "RECEIVE_USERS"
export const RECEIVE_USER = "RECEIVE_USER"

export const receiveRooms = rooms=> ({
    type: RECEIVE_ROOMS,
    rooms
});

export const receiveRoom = room=> ({
    type: RECEIVE_ROOM,
    room
});

export const receiveRoomErrors = errors => ({
    type: RECEIVE_ROOM_ERRORS,
    errors
});

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

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
        .then( users => dispatch(receiveUsers(users)))
}

export const renameRoom = (roomData) => dispatch => {
    return RoomAPIUtil.renameRoom(roomData)
        .then( room => dispatch(receiveRoom(room)))
}

export const joinRoom = (roomId) => dispatch => {
    return RoomAPIUtil.joinRoom(roomId)
        .then( room => dispatch(receiveRoom(room)))
}

export const leaveRoom = (roomId) => dispatch => {
    return RoomAPIUtil.leaveRoom(roomId)
        .then( user => dispatch(receiveUser(user)))
}

export const createRoom = (roomData) => dispatch => {
    return RoomAPIUtil.createRoom(roomData)
        .then( room => dispatch(receiveRoom(room)))
}



