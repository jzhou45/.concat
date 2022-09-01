import * as RoomAPIUtil from "../util/room_api_util";

export const RECEIVE_ROOM= "RECEIVE_ROOM";
export const REMOVE_ROOM= "REMOVE_ROOM";
export const RECEIVE_RENAMED_ROOM= "RECEIVE_RENAMED_ROOM";
export const RECEIVE_CHECKED = "RECEIVE_CHECKED";
export const RECEIVE_UNCHECKED = "RECEIVE_UNCHECKED";
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS"
export const CLEAR_ROOM_ERRORS = "CLEAR_ROOM_ERRORS";

export const receiveRooms = rooms=> ({
    type: RECEIVE_ROOMS,
    rooms
});

export const receiveRenamedRoom = room => ({
    type: RECEIVE_RENAMED_ROOM,
    room
});

export const clearRoomErrors = () => ({
    type: CLEAR_ROOM_ERRORS
});


export const receiveRoom = room => ({
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

export const receiveChecked = room => ({
    type: RECEIVE_CHECKED,
    room
});

export const receiveUnchecked = room => ({
    type: RECEIVE_UNCHECKED,
    room
});

export const fetchRooms = () => dispatch => {
    return RoomAPIUtil.fetchRooms()
        .then( rooms => dispatch(receiveRooms(rooms)));
};

export const fetchRoom = (roomId) => dispatch => {
    return RoomAPIUtil.fetchRoom(roomId)
        .then( room => dispatch(receiveRoom(room)));
};

export const deleteRoom = (roomId) => dispatch => {
    return RoomAPIUtil.deleteRoom(roomId)
        .then( () => dispatch(removeRoom(roomId)));
};

export const renameRoom = (roomData) => dispatch => {
    return RoomAPIUtil.renameRoom(roomData)
        .then( room => dispatch(receiveRenamedRoom(room)))
        .catch(err => {dispatch(receiveRoomErrors(err?.response?.data))});
};

export const joinRoom = (roomId) => dispatch => {
    return RoomAPIUtil.joinRoom(roomId)
        .then( room => dispatch(receiveRoom(room)));
};

export const leaveRoom = (roomId) => dispatch => {
    return RoomAPIUtil.leaveRoom(roomId)
        .then( () => dispatch(removeRoom(roomId)));
};

export const createRoom = (roomData) => dispatch => {
    return RoomAPIUtil.createRoom(roomData)
        .then( room => dispatch(receiveRoom(room)))
        .catch(err => {dispatch(receiveRoomErrors(err?.response?.data))});
};

export const patchComplete = (roomId, problemId) => dispatch => {
    return RoomAPIUtil.patchComplete(roomId, problemId)
    .then(room => dispatch(receiveChecked(room)))
};

export const patchIncomplete = (roomId, problemId) => dispatch => (
    RoomAPIUtil.patchIncomplete(roomId, problemId)
    .then(room => dispatch(receiveUnchecked(room)))
);



